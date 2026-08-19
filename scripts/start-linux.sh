#!/usr/bin/env bash
# Builds the frontend static export and starts the FastAPI backend serving
# both the API and the built app on http://localhost:8000.
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ -f .server.pid ]] && kill -0 "$(cat .server.pid)" 2>/dev/null; then
  echo "El servidor ya está en marcha (PID $(cat .server.pid)). Usa scripts/stop-linux.sh primero."
  exit 1
fi

echo "==> Instalando dependencias del frontend..."
(cd frontend && npm install)

echo "==> Generando el export estático del frontend..."
(cd frontend && npm run build)

echo "==> Instalando dependencias del backend (uv)..."
(cd backend && uv sync)

mkdir -p logs
echo "==> Arrancando el backend en http://localhost:8000 ..."
(
  cd backend
  nohup uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 \
    > ../logs/server.log 2>&1 &
  echo $! > ../.server.pid
)

sleep 1
echo "Servidor iniciado. PID: $(cat .server.pid)"
echo "Logs: logs/server.log"
