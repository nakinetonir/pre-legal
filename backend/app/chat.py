import json
import re
from pathlib import Path
from typing import Literal, NamedTuple

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from litellm import completion
from pydantic import BaseModel

load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env")

MODEL = "openrouter/openai/gpt-oss-120b"
EXTRA_BODY = {"provider": {"order": ["cerebras"]}}

# Same closed list as frontend/lib/nda/countries.ts - keep both in sync.
CountryCode = Literal["ES", "FR", "DE", "IT", "PT", "NL", "IE", "BE", "GB", "US", "MX"]

# Same ids as the "file" stems in catalog.json and frontend/lib/documents/types.ts.
DocumentTypeId = Literal[
    "Mutual-NDA",
    "CSA",
    "Design-Partner-Agreement",
    "SLA",
    "PSA",
    "DPA",
    "Software-License-Agreement",
    "Partnership-Agreement",
    "Pilot-Agreement",
    "BAA",
    "AI-Addendum",
]

_CATALOG_PATH = Path(__file__).resolve().parent.parent.parent / "catalog.json"
_catalog_data = json.loads(_CATALOG_PATH.read_text())
CATALOG: dict[str, dict[str, str]] = {
    Path(template["file"]).stem: {
        "name": template["name"],
        "description": template["description"],
    }
    for template in _catalog_data["templates"]
}

router = APIRouter(prefix="/api/chat", tags=["chat"])


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]
    values: dict
    locale: str
    documentType: DocumentTypeId | None = None


class PartyFields(BaseModel):
    name: str | None = None
    address: str | None = None
    signatoryName: str | None = None
    signatoryTitle: str | None = None
    signatoryEmail: str | None = None


class NdaChatFields(BaseModel):
    partyA: PartyFields = PartyFields()
    partyB: PartyFields = PartyFields()
    effectiveDate: str | None = None
    purpose: str | None = None
    mndaTermYears: int | None = None
    confidentialityYears: int | None = None
    confidentialityIndefinite: bool | None = None
    governingLawCountry: CountryCode | None = None
    jurisdiction: str | None = None


class CsaChatFields(BaseModel):
    provider: PartyFields = PartyFields()
    customer: PartyFields = PartyFields()
    effectiveDate: str | None = None
    subscriptionPeriodYears: int | None = None
    paymentProcess: str | None = None
    generalCapAmount: str | None = None
    governingLawCountry: CountryCode | None = None
    jurisdiction: str | None = None


class PilotChatFields(BaseModel):
    provider: PartyFields = PartyFields()
    customer: PartyFields = PartyFields()
    effectiveDate: str | None = None
    pilotPeriodMonths: int | None = None
    evaluationPurpose: str | None = None
    generalCapAmount: str | None = None
    governingLawCountry: CountryCode | None = None
    jurisdiction: str | None = None


class GenericChatFields(BaseModel):
    partyA: PartyFields = PartyFields()
    partyB: PartyFields = PartyFields()
    effectiveDate: str | None = None
    purpose: str | None = None
    governingLawCountry: CountryCode | None = None
    jurisdiction: str | None = None


class NdaTurnResult(BaseModel):
    reply: str
    fields: NdaChatFields
    readyToGenerate: bool


class CsaTurnResult(BaseModel):
    reply: str
    fields: CsaChatFields
    readyToGenerate: bool


class PilotTurnResult(BaseModel):
    reply: str
    fields: PilotChatFields
    readyToGenerate: bool


class GenericTurnResult(BaseModel):
    reply: str
    fields: GenericChatFields
    readyToGenerate: bool


class RouterResult(BaseModel):
    reply: str
    documentType: DocumentTypeId | None = None


class ChatResponse(BaseModel):
    reply: str
    fields: dict
    readyToGenerate: bool
    documentType: DocumentTypeId | None = None


class DocumentConfig(NamedTuple):
    turn_result_model: type[BaseModel]
    required_fields: str


_PARTY_FIELDS_TEXT = (
    "legal name, notice address, signatory name, signatory title, signatory email"
)

_NDA_REQUIRED_FIELDS = (
    f"- partyA and partyB, each with: {_PARTY_FIELDS_TEXT}\n"
    "- effectiveDate (as YYYY-MM-DD)\n"
    "- purpose (why the parties are sharing confidential information)\n"
    "- mndaTermYears (integer, 1-10)\n"
    "- confidentialityYears (integer, 1-15) OR confidentialityIndefinite=true\n"
    "- governingLawCountry, one of: ES, FR, DE, IT, PT, NL, IE, BE, GB, US, MX\n"
    "- jurisdiction (the courts, as free text, e.g. a city)"
)

_CSA_REQUIRED_FIELDS = (
    f"- provider and customer, each with: {_PARTY_FIELDS_TEXT}\n"
    "- effectiveDate (as YYYY-MM-DD)\n"
    "- subscriptionPeriodYears (integer, 1-5)\n"
    "- paymentProcess (free text describing the invoicing/payment cadence and currency)\n"
    "- generalCapAmount (free text describing the liability cap, e.g. 'Fees paid in the "
    "12 months before the claim')\n"
    "- governingLawCountry, one of: ES, FR, DE, IT, PT, NL, IE, BE, GB, US, MX\n"
    "- jurisdiction (the chosen courts, as free text, e.g. a city)"
)

_PILOT_REQUIRED_FIELDS = (
    f"- provider and customer, each with: {_PARTY_FIELDS_TEXT}\n"
    "- effectiveDate (as YYYY-MM-DD)\n"
    "- pilotPeriodMonths (integer, 1-12)\n"
    "- evaluationPurpose (free text: what the customer will evaluate during the pilot)\n"
    "- generalCapAmount (free text describing the liability cap)\n"
    "- governingLawCountry, one of: ES, FR, DE, IT, PT, NL, IE, BE, GB, US, MX\n"
    "- jurisdiction (the chosen courts, as free text, e.g. a city)"
)

_GENERIC_REQUIRED_FIELDS = (
    f"- partyA and partyB, each with: {_PARTY_FIELDS_TEXT}\n"
    "- effectiveDate (as YYYY-MM-DD)\n"
    "- purpose (free text summarizing the key business terms of this agreement)\n"
    "- governingLawCountry, one of: ES, FR, DE, IT, PT, NL, IE, BE, GB, US, MX\n"
    "- jurisdiction (the courts, as free text, e.g. a city)"
)

_GENERIC_CONFIG = DocumentConfig(GenericTurnResult, _GENERIC_REQUIRED_FIELDS)

DOCUMENT_CONFIGS: dict[str, DocumentConfig] = {
    "Mutual-NDA": DocumentConfig(NdaTurnResult, _NDA_REQUIRED_FIELDS),
    "CSA": DocumentConfig(CsaTurnResult, _CSA_REQUIRED_FIELDS),
    "Pilot-Agreement": DocumentConfig(PilotTurnResult, _PILOT_REQUIRED_FIELDS),
}
# Every catalog entry not given a dedicated config above (8 of the 11 types)
# falls back to the shared generic schema.
for _doc_id in CATALOG:
    DOCUMENT_CONFIGS.setdefault(_doc_id, _GENERIC_CONFIG)


def _greeting() -> str:
    names = ", ".join(info["name"] for info in CATALOG.values())
    return (
        "Hi! I can help you draft any of these Common Paper standard agreements: "
        f"{names}. Which one do you need, and what's the situation you're drafting it for?"
    )


GREETING = _greeting()


def _router_prompt(locale: str) -> str:
    catalog_lines = "\n".join(
        f"- {doc_id}: {info['name']} - {info['description']}"
        for doc_id, info in CATALOG.items()
    )
    return (
        "You are a friendly legal assistant that helps a user draft one of the legal "
        "documents below, through free-form conversation instead of a fixed form.\n\n"
        f"Available document types (id: name - description):\n{catalog_lines}\n\n"
        "Figure out, from the conversation so far, which single document type (by id) "
        "the user needs. If it isn't clear yet, ask a short clarifying question and leave "
        "documentType null. If the user asks for something that isn't in the list above, "
        "explain that it isn't supported and suggest the closest available document type "
        "instead, leaving documentType null unless they confirm they want that suggested "
        "document. Once you are confident which document type they want, set documentType "
        "to its id and reply with a short confirmation that invites them to start giving "
        "the first details.\n\n"
        f"Respond in the language identified by locale code '{locale}'."
    )


def _system_prompt(document_type: DocumentTypeId, locale: str, known_values: dict) -> str:
    config = DOCUMENT_CONFIGS[document_type]
    doc_name = CATALOG[document_type]["name"]
    return (
        f"You are a friendly legal assistant helping a user fill in a {doc_name} "
        "(Common Paper standard) through free-form conversation, instead of a fixed "
        "form.\n\n"
        f"Required fields you must gather:\n{config.required_fields}\n\n"
        f"Respond in the language identified by locale code '{locale}'. "
        "As soon as you learn the governing law country, switch to the language "
        "naturally spoken there.\n\n"
        "Ask only about a couple of missing fields per turn, conversationally - do not "
        "dump the whole list of questions at once. Always return your best complete "
        "understanding of every field gathered so far in 'fields', not just what changed "
        "in this turn. Set readyToGenerate to true only once every required field above "
        "is known.\n\n"
        f"Fields already known (JSON, may be partial): {json.dumps(known_values)}"
    )


def _call_llm(messages: list[dict], response_format: type[BaseModel]) -> str:
    try:
        response = completion(
            model=MODEL,
            messages=messages,
            response_format=response_format,
            reasoning_effort="low",
            extra_body=EXTRA_BODY,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=502, detail="The AI assistant is unavailable right now."
        ) from exc
    return response.choices[0].message.content


def _run_router_turn(request: ChatRequest) -> RouterResult:
    messages = [{"role": "system", "content": _router_prompt(request.locale)}]
    messages += [{"role": m.role, "content": m.content} for m in request.messages]
    content = _call_llm(messages, RouterResult)
    return RouterResult.model_validate_json(content)


def _run_chat_turn(request: ChatRequest, config: DocumentConfig) -> BaseModel:
    messages = [
        {
            "role": "system",
            "content": _system_prompt(request.documentType, request.locale, request.values),
        }
    ]
    messages += [{"role": m.role, "content": m.content} for m in request.messages]
    content = _call_llm(messages, config.turn_result_model)
    return config.turn_result_model.model_validate_json(content)


_ISO_DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


def _clean_effective_date(fields: dict) -> None:
    if "effectiveDate" not in fields:
        return
    value = fields["effectiveDate"]
    if value and _ISO_DATE_RE.match(value):
        return
    fields.pop("effectiveDate")


@router.get("/greeting")
def greeting() -> dict[str, str]:
    return {"reply": GREETING}


@router.post("/message")
def message(request: ChatRequest) -> ChatResponse:
    if request.documentType is None:
        result = _run_router_turn(request)
        return ChatResponse(
            reply=result.reply,
            fields={},
            readyToGenerate=False,
            documentType=result.documentType,
        )

    config = DOCUMENT_CONFIGS[request.documentType]
    result = _run_chat_turn(request, config)
    fields = result.fields.model_dump(exclude_none=True)
    _clean_effective_date(fields)

    return ChatResponse(
        reply=result.reply,
        fields=fields,
        readyToGenerate=result.readyToGenerate,
        documentType=request.documentType,
    )
