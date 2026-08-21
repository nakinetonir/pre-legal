import json

import pytest
from fastapi.testclient import TestClient

from app import chat
from app.main import app

client = TestClient(app)


def test_greeting_returns_static_message():
    response = client.get("/api/chat/greeting")
    assert response.status_code == 200
    assert "Mutual NDA" in response.json()["reply"]


def _fake_completion(fields: dict, reply: str = "Got it.", ready: bool = False):
    result = chat.ChatTurnResult(
        reply=reply,
        fields=chat.NdaChatFields(**fields),
        readyToGenerate=ready,
    )

    class FakeChoice:
        class message:  # noqa: N801 - mimics litellm's response shape
            content = result.model_dump_json()

    class FakeResponse:
        choices = [FakeChoice()]

    return FakeResponse()


def test_message_extracts_fields(monkeypatch):
    fake = _fake_completion(
        {"partyA": {"name": "Acme, Inc."}, "governingLawCountry": "ES"}
    )
    monkeypatch.setattr(chat, "completion", lambda **kwargs: fake)

    response = client.post(
        "/api/chat/message",
        json={
            "messages": [{"role": "user", "content": "Acme Inc, based in Spain"}],
            "values": {},
            "locale": "en",
        },
    )

    assert response.status_code == 200
    body = response.json()
    assert body["reply"] == "Got it."
    assert body["fields"]["partyA"]["name"] == "Acme, Inc."
    assert body["fields"]["governingLawCountry"] == "ES"
    assert body["readyToGenerate"] is False


def test_message_drops_malformed_effective_date(monkeypatch):
    fake = _fake_completion({"effectiveDate": "next Monday"})
    monkeypatch.setattr(chat, "completion", lambda **kwargs: fake)

    response = client.post(
        "/api/chat/message",
        json={"messages": [], "values": {}, "locale": "en"},
    )

    assert "effectiveDate" not in response.json()["fields"]


def test_message_returns_502_when_llm_call_fails(monkeypatch):
    def raise_error(**kwargs):
        raise RuntimeError("network down")

    monkeypatch.setattr(chat, "completion", raise_error)

    response = client.post(
        "/api/chat/message",
        json={"messages": [], "values": {}, "locale": "en"},
    )

    assert response.status_code == 502
