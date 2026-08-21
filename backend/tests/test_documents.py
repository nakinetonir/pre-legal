import pytest
from fastapi.testclient import TestClient

from app import db
from app.main import app

client = TestClient(app)


@pytest.fixture(autouse=True)
def _fresh_database():
    db.reset_database()


def _signup(email: str = "jane@example.com") -> None:
    client.post("/api/auth/signup", json={"email": email, "password": "hunter22"})


def test_documents_require_auth():
    response = client.get("/api/documents")
    assert response.status_code == 401


def test_create_and_list_document():
    _signup()
    create = client.post(
        "/api/documents",
        json={"documentType": "Mutual-NDA", "title": "Acme NDA", "values": {"purpose": "test"}},
    )
    assert create.status_code == 201
    body = create.json()
    assert body["documentType"] == "Mutual-NDA"
    assert body["values"] == {"purpose": "test"}

    listed = client.get("/api/documents")
    assert listed.status_code == 200
    assert [d["id"] for d in listed.json()] == [body["id"]]


def test_get_update_and_delete_document():
    _signup()
    created = client.post(
        "/api/documents",
        json={"documentType": "CSA", "title": "Draft CSA", "values": {}},
    ).json()
    doc_id = created["id"]

    got = client.get(f"/api/documents/{doc_id}")
    assert got.status_code == 200

    updated = client.put(
        f"/api/documents/{doc_id}",
        json={"documentType": "CSA", "title": "Final CSA", "values": {"provider": {"name": "Acme"}}},
    )
    assert updated.status_code == 200
    assert updated.json()["title"] == "Final CSA"

    deleted = client.delete(f"/api/documents/{doc_id}")
    assert deleted.status_code == 204
    assert client.get(f"/api/documents/{doc_id}").status_code == 404


def test_documents_are_isolated_per_user():
    _signup("owner@example.com")
    created = client.post(
        "/api/documents",
        json={"documentType": "Mutual-NDA", "title": "Owner doc", "values": {}},
    ).json()

    _signup("other@example.com")
    assert client.get(f"/api/documents/{created['id']}").status_code == 404
    assert client.get("/api/documents").json() == []
