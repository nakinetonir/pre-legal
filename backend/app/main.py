from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from . import auth, chat, db, documents


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

app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(documents.router)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


# Serves the Next.js static export (frontend/out) once it has been built by
# the start scripts / Docker image. Declared last so the API routes above
# take priority over the catch-all static mount.
_FRONTEND_DIST = Path(__file__).resolve().parent.parent.parent / "frontend" / "out"
if _FRONTEND_DIST.exists():
    app.mount("/", StaticFiles(directory=_FRONTEND_DIST, html=True), name="frontend")
