import re
import secrets
from datetime import datetime, timedelta, timezone

import bcrypt
import jwt
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from pydantic import BaseModel, field_validator

from . import db

SESSION_COOKIE = "prelegal_session"

# Generated once per process instead of persisted: the database itself is
# recreated from scratch on every boot (AG-62), so tokens signed by a
# previous run are already meaningless - no need to keep the secret around.
_JWT_SECRET = secrets.token_urlsafe(32)
_JWT_ALGORITHM = "HS256"
_TOKEN_TTL = timedelta(days=1)

_EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

router = APIRouter(prefix="/api/auth", tags=["auth"])


class SignUpPayload(BaseModel):
    email: str
    password: str

    @field_validator("email")
    @classmethod
    def _valid_email(cls, value: str) -> str:
        normalized = value.strip().lower()
        if not _EMAIL_RE.match(normalized):
            raise ValueError("Invalid email address")
        return normalized

    @field_validator("password")
    @classmethod
    def _valid_password(cls, value: str) -> str:
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters")
        return value


class SignInPayload(BaseModel):
    email: str
    password: str


class UserOut(BaseModel):
    id: int
    email: str


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(password: str, password_hash: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), password_hash.encode("utf-8"))


def create_access_token(user_id: int) -> str:
    payload = {"sub": str(user_id), "exp": datetime.now(timezone.utc) + _TOKEN_TTL}
    return jwt.encode(payload, _JWT_SECRET, algorithm=_JWT_ALGORITHM)


def decode_access_token(token: str) -> int | None:
    try:
        payload = jwt.decode(token, _JWT_SECRET, algorithms=[_JWT_ALGORITHM])
        return int(payload["sub"])
    except (jwt.PyJWTError, KeyError, ValueError):
        return None


def get_current_user_id(request: Request) -> int:
    token = request.cookies.get(SESSION_COOKIE)
    user_id = decode_access_token(token) if token else None
    if user_id is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user_id


def _set_session_cookie(response: Response, user_id: int) -> None:
    response.set_cookie(
        SESSION_COOKIE,
        create_access_token(user_id),
        httponly=True,
        samesite="lax",
        max_age=int(_TOKEN_TTL.total_seconds()),
    )


@router.post("/signup", status_code=201)
def sign_up(payload: SignUpPayload, response: Response) -> UserOut:
    conn = db.get_connection()
    try:
        existing = conn.execute(
            "SELECT id FROM users WHERE email = ?", (payload.email,)
        ).fetchone()
        if existing:
            raise HTTPException(status_code=409, detail="Email already registered")

        password_hash = hash_password(payload.password)
        cur = conn.execute(
            "INSERT INTO users (email, password_hash) VALUES (?, ?)",
            (payload.email, password_hash),
        )
        conn.commit()
        user_id = cur.lastrowid
    finally:
        conn.close()

    _set_session_cookie(response, user_id)
    return UserOut(id=user_id, email=payload.email)


@router.post("/signin")
def sign_in(payload: SignInPayload, response: Response) -> UserOut:
    email = payload.email.strip().lower()
    conn = db.get_connection()
    try:
        row = conn.execute(
            "SELECT id, email, password_hash FROM users WHERE email = ?", (email,)
        ).fetchone()
    finally:
        conn.close()

    if row is None or not verify_password(payload.password, row["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    _set_session_cookie(response, row["id"])
    return UserOut(id=row["id"], email=row["email"])


@router.post("/signout")
def sign_out(response: Response) -> dict:
    response.delete_cookie(SESSION_COOKIE)
    return {"ok": True}


@router.get("/me")
def me(user_id: int = Depends(get_current_user_id)) -> UserOut:
    conn = db.get_connection()
    try:
        row = conn.execute(
            "SELECT id, email FROM users WHERE id = ?", (user_id,)
        ).fetchone()
    finally:
        conn.close()

    if row is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return UserOut(id=row["id"], email=row["email"])
