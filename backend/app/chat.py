import json
import re
from pathlib import Path
from typing import Literal

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from litellm import completion
from pydantic import BaseModel

load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env")

MODEL = "openrouter/openai/gpt-oss-120b"
EXTRA_BODY = {"provider": {"order": ["cerebras"]}}

# Same closed list as frontend/lib/nda/countries.ts - keep both in sync.
CountryCode = Literal["ES", "FR", "DE", "IT", "PT", "NL", "IE", "BE", "GB", "US", "MX"]

GREETING = (
    "Hi! I'll help you put together a Mutual NDA (Common Paper standard). "
    "Let's start with the basics: what are the legal names of the two "
    "companies entering into this agreement, and what's the purpose of "
    "sharing confidential information between them?"
)

router = APIRouter(prefix="/api/chat", tags=["chat"])


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]
    values: dict
    locale: str


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


class ChatTurnResult(BaseModel):
    reply: str
    fields: NdaChatFields
    readyToGenerate: bool


class ChatResponse(BaseModel):
    reply: str
    fields: dict
    readyToGenerate: bool


def _system_prompt(locale: str, known_values: dict) -> str:
    return (
        "You are a friendly legal assistant helping a user fill in a "
        "Mutual Non-Disclosure Agreement (Common Paper standard) through "
        "free-form conversation, instead of a fixed form.\n\n"
        "Required fields you must gather:\n"
        "- partyA and partyB, each with: legal name, notice address, "
        "signatory name, signatory title, signatory email\n"
        "- effectiveDate (as YYYY-MM-DD)\n"
        "- purpose (why the parties are sharing confidential information)\n"
        "- mndaTermYears (integer, 1-10)\n"
        "- confidentialityYears (integer, 1-15) OR confidentialityIndefinite=true\n"
        "- governingLawCountry, one of: ES, FR, DE, IT, PT, NL, IE, BE, GB, US, MX\n"
        "- jurisdiction (the courts, as free text, e.g. a city)\n\n"
        f"Respond in the language identified by locale code '{locale}'. "
        "As soon as you learn the governing law country, switch to the "
        "language naturally spoken there.\n\n"
        "Ask only about a couple of missing fields per turn, conversationally "
        "- do not dump the whole list of questions at once. Always return "
        "your best complete understanding of every field gathered so far in "
        "'fields', not just what changed in this turn. Set readyToGenerate "
        "to true only once every required field above is known.\n\n"
        f"Fields already known (JSON, may be partial): {json.dumps(known_values)}"
    )


def _run_chat_turn(request: ChatRequest) -> ChatTurnResult:
    messages = [{"role": "system", "content": _system_prompt(request.locale, request.values)}]
    messages += [{"role": m.role, "content": m.content} for m in request.messages]

    try:
        response = completion(
            model=MODEL,
            messages=messages,
            response_format=ChatTurnResult,
            reasoning_effort="low",
            extra_body=EXTRA_BODY,
        )
    except Exception as exc:
        raise HTTPException(status_code=502, detail="The AI assistant is unavailable right now.") from exc

    return ChatTurnResult.model_validate_json(response.choices[0].message.content)


_ISO_DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


def _clean_effective_date(value: str | None) -> str | None:
    if value and _ISO_DATE_RE.match(value):
        return value
    return None


@router.get("/greeting")
def greeting() -> dict[str, str]:
    return {"reply": GREETING}


@router.post("/message")
def message(request: ChatRequest) -> ChatResponse:
    result = _run_chat_turn(request)
    fields = result.fields.model_dump(exclude_none=True)
    if "effectiveDate" in fields:
        cleaned = _clean_effective_date(fields["effectiveDate"])
        if cleaned is None:
            fields.pop("effectiveDate")
        else:
            fields["effectiveDate"] = cleaned

    return ChatResponse(reply=result.reply, fields=fields, readyToGenerate=result.readyToGenerate)
