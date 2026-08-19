# --- Stage 1: build the frontend static export ---
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# --- Stage 2: backend runtime, serving the API and the built frontend ---
FROM python:3.12-slim AS backend
RUN pip install --no-cache-dir uv

WORKDIR /app/backend
COPY backend/pyproject.toml backend/uv.lock ./
RUN uv sync --no-dev --no-install-project

COPY backend/ ./
COPY --from=frontend-build /app/frontend/out /app/frontend/out

# The SQLite database is temporary by design: backend/app/db.py recreates it
# from scratch on every startup, so no volume is declared here.
EXPOSE 8000
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
