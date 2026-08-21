import pytest
from fastapi.testclient import TestClient

from app import chat
from app.main import app

client = TestClient(app)


def test_greeting_lists_available_document_types():
    response = client.get("/api/chat/greeting")
    assert response.status_code == 200
    reply = response.json()["reply"]
    assert "Mutual Non-Disclosure Agreement" in reply
    assert "Cloud Service Agreement" in reply


def _fake_response(result):
    class FakeChoice:
        class message:  # noqa: N801 - mimics litellm's response shape
            content = result.model_dump_json()

    class FakeResponse:
        choices = [FakeChoice()]

    return FakeResponse()


def _fake_turn_result(model, fields: dict, reply: str = "Got it.", ready: bool = False):
    return _fake_response(model(reply=reply, fields=model.model_fields["fields"].annotation(**fields), readyToGenerate=ready))


def test_message_routes_to_document_type(monkeypatch):
    fake = _fake_response(chat.RouterResult(reply="Sure, an NDA it is.", documentType="Mutual-NDA"))
    monkeypatch.setattr(chat, "completion", lambda **kwargs: fake)

    response = client.post(
        "/api/chat/message",
        json={
            "messages": [{"role": "user", "content": "I need an NDA"}],
            "values": {},
            "locale": "en",
        },
    )

    assert response.status_code == 200
    body = response.json()
    assert body["documentType"] == "Mutual-NDA"
    assert body["fields"] == {}
    assert body["readyToGenerate"] is False


def test_message_router_suggests_closest_match_for_unsupported_request(monkeypatch):
    fake = _fake_response(
        chat.RouterResult(
            reply="I can't draft a lease, but a Software License Agreement is close - want that?",
            documentType=None,
        )
    )
    monkeypatch.setattr(chat, "completion", lambda **kwargs: fake)

    response = client.post(
        "/api/chat/message",
        json={
            "messages": [{"role": "user", "content": "I need a rental lease"}],
            "values": {},
            "locale": "en",
        },
    )

    assert response.status_code == 200
    assert response.json()["documentType"] is None


def test_message_extracts_nda_fields(monkeypatch):
    fake = _fake_turn_result(
        chat.NdaTurnResult, {"partyA": {"name": "Acme, Inc."}, "governingLawCountry": "ES"}
    )
    monkeypatch.setattr(chat, "completion", lambda **kwargs: fake)

    response = client.post(
        "/api/chat/message",
        json={
            "messages": [{"role": "user", "content": "Acme Inc, based in Spain"}],
            "values": {},
            "locale": "en",
            "documentType": "Mutual-NDA",
        },
    )

    assert response.status_code == 200
    body = response.json()
    assert body["reply"] == "Got it."
    assert body["fields"]["partyA"]["name"] == "Acme, Inc."
    assert body["fields"]["governingLawCountry"] == "ES"
    assert body["readyToGenerate"] is False


def test_message_extracts_csa_fields(monkeypatch):
    fake = _fake_turn_result(
        chat.CsaTurnResult,
        {"provider": {"name": "Cloudy Inc."}, "subscriptionPeriodYears": 2},
    )
    monkeypatch.setattr(chat, "completion", lambda **kwargs: fake)

    response = client.post(
        "/api/chat/message",
        json={
            "messages": [{"role": "user", "content": "Cloudy Inc, 2 year subscription"}],
            "values": {},
            "locale": "en",
            "documentType": "CSA",
        },
    )

    assert response.status_code == 200
    body = response.json()
    assert body["fields"]["provider"]["name"] == "Cloudy Inc."
    assert body["fields"]["subscriptionPeriodYears"] == 2


def test_message_extracts_generic_fields(monkeypatch):
    fake = _fake_turn_result(chat.GenericTurnResult, {"purpose": "Joint marketing program"})
    monkeypatch.setattr(chat, "completion", lambda **kwargs: fake)

    response = client.post(
        "/api/chat/message",
        json={
            "messages": [{"role": "user", "content": "It's for a joint marketing program"}],
            "values": {},
            "locale": "en",
            "documentType": "Partnership-Agreement",
        },
    )

    assert response.status_code == 200
    assert response.json()["fields"]["purpose"] == "Joint marketing program"


def test_message_drops_malformed_effective_date(monkeypatch):
    fake = _fake_turn_result(chat.NdaTurnResult, {"effectiveDate": "next Monday"})
    monkeypatch.setattr(chat, "completion", lambda **kwargs: fake)

    response = client.post(
        "/api/chat/message",
        json={"messages": [], "values": {}, "locale": "en", "documentType": "Mutual-NDA"},
    )

    assert "effectiveDate" not in response.json()["fields"]


def test_message_returns_502_when_llm_call_fails(monkeypatch):
    def raise_error(**kwargs):
        raise RuntimeError("network down")

    monkeypatch.setattr(chat, "completion", raise_error)

    response = client.post(
        "/api/chat/message",
        json={"messages": [], "values": {}, "locale": "en", "documentType": "Mutual-NDA"},
    )

    assert response.status_code == 502


def test_message_returns_502_when_router_llm_call_fails(monkeypatch):
    def raise_error(**kwargs):
        raise RuntimeError("network down")

    monkeypatch.setattr(chat, "completion", raise_error)

    response = client.post(
        "/api/chat/message",
        json={"messages": [], "values": {}, "locale": "en"},
    )

    assert response.status_code == 502
