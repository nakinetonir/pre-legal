import secrets
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from . import chat, db

SESSION_COOKIE = "prelegal_session"

# In-memory session store. The database (and every session) resets on
# restart, matching AG-62's "temporary database" requirement. Real,
# persistent auth (JWT, hashed passwords) is scoped to a later ticket.
_sessions: dict[str, int] = {}


@asynccontextmanager
async def lifespan(_: FastAPI):
    db.reset_database()
    yield


app = FastAPI(title="Pre-Legal API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)


class SignInPayload(BaseModel):
    name: str


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


def _upsert_user(name: str) -> int:
    conn = db.get_connection()
    try:
        row = conn.execute("SELECT id FROM users WHERE name = ?", (name,)).fetchone()
        if row:
            return row["id"]
        cur = conn.execute("INSERT INTO users (name) VALUES (?)", (name,))
        conn.commit()
        return cur.lastrowid
    finally:
        conn.close()


@app.post("/api/auth/signup")
@app.post("/api/auth/signin")
def sign_in(payload: SignInPayload, response: Response) -> dict:
    """Fake login (AG-62): any name signs the user in, creating it if needed.

    There is no password and no real verification - only a technical base for
    a login screen that lets the user straight into the app. Real auth lands
    in a later ticket.
    """
    name = payload.name.strip() or "Invitado"
    user_id = _upsert_user(name)

    token = secrets.token_urlsafe(24)
    _sessions[token] = user_id
    response.set_cookie(
        SESSION_COOKIE,
        token,
        httponly=True,
        samesite="lax",
        max_age=60 * 60 * 24,
    )
    return {"id": user_id, "name": name}


@app.post("/api/auth/signout")
def sign_out(request: Request, response: Response) -> dict:
    token = request.cookies.get(SESSION_COOKIE)
    if token:
        _sessions.pop(token, None)
    response.delete_cookie(SESSION_COOKIE)
    return {"ok": True}


@app.get("/api/auth/me")
def me(request: Request) -> dict:
    token = request.cookies.get(SESSION_COOKIE)
    user_id = _sessions.get(token) if token else None
    if user_id is None:
        raise HTTPException(status_code=401, detail="Not authenticated")

    conn = db.get_connection()
    try:
        row = conn.execute(
            "SELECT id, name FROM users WHERE id = ?", (user_id,)
        ).fetchone()
    finally:
        conn.close()

    if row is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return {"id": row["id"], "name": row["name"]}


# Serves the Next.js static export (frontend/out) once it has been built by
# the start scripts / Docker image. Declared last so the API routes above
# take priority over the catch-all static mount.
_FRONTEND_DIST = Path(__file__).resolve().parent.parent.parent / "frontend" / "out"
if _FRONTEND_DIST.exists():
    app.mount("/", StaticFiles(directory=_FRONTEND_DIST, html=True), name="frontend")
