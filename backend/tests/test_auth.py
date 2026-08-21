import pytest
from fastapi.testclient import TestClient

from app import db
from app.main import app

client = TestClient(app)


@pytest.fixture(autouse=True)
def _fresh_database():
    db.reset_database()


def test_signup_creates_user_and_sets_cookie():
    response = client.post(
        "/api/auth/signup", json={"email": "Jane@Example.com", "password": "hunter22"}
    )
    assert response.status_code == 201
    body = response.json()
    assert body["email"] == "jane@example.com"
    assert "prelegal_session" in response.cookies


def test_signup_rejects_duplicate_email():
    client.post("/api/auth/signup", json={"email": "jane@example.com", "password": "hunter22"})
    response = client.post(
        "/api/auth/signup", json={"email": "jane@example.com", "password": "otherpass"}
    )
    assert response.status_code == 409


def test_signup_rejects_short_password():
    response = client.post(
        "/api/auth/signup", json={"email": "jane@example.com", "password": "short"}
    )
    assert response.status_code == 422


def test_signup_rejects_invalid_email():
    response = client.post(
        "/api/auth/signup", json={"email": "not-an-email", "password": "hunter22"}
    )
    assert response.status_code == 422


def test_signin_with_correct_credentials():
    client.post("/api/auth/signup", json={"email": "jane@example.com", "password": "hunter22"})
    response = client.post(
        "/api/auth/signin", json={"email": "jane@example.com", "password": "hunter22"}
    )
    assert response.status_code == 200
    assert response.json()["email"] == "jane@example.com"


def test_signin_with_wrong_password():
    client.post("/api/auth/signup", json={"email": "jane@example.com", "password": "hunter22"})
    response = client.post(
        "/api/auth/signin", json={"email": "jane@example.com", "password": "wrongpass"}
    )
    assert response.status_code == 401


def test_signin_with_unknown_email():
    response = client.post(
        "/api/auth/signin", json={"email": "ghost@example.com", "password": "hunter22"}
    )
    assert response.status_code == 401


def test_me_requires_session():
    response = client.get("/api/auth/me")
    assert response.status_code == 401


def test_me_returns_current_user_after_signin():
    client.post("/api/auth/signup", json={"email": "jane@example.com", "password": "hunter22"})
    response = client.get("/api/auth/me")
    assert response.status_code == 200
    assert response.json()["email"] == "jane@example.com"


def test_signout_clears_session():
    client.post("/api/auth/signup", json={"email": "jane@example.com", "password": "hunter22"})
    client.post("/api/auth/signout")
    response = client.get("/api/auth/me")
    assert response.status_code == 401
