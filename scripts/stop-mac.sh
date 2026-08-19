#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ -f .server.pid ]]; then
  PID=$(cat .server.pid)
  if kill -0 "$PID" 2>/dev/null; then
    # "uv run" spawns the actual uvicorn process as a child, so the tracked
    # PID alone isn't always enough to stop the server.
    pkill -P "$PID" 2>/dev/null || true
    kill "$PID" 2>/dev/null || true
    echo "Servidor (PID $PID) detenido."
  else
    echo "El proceso $PID ya no estaba en ejecución."
  fi
  rm -f .server.pid
else
  echo "No se encontró .server.pid; ¿el servidor está en marcha?"
fi
