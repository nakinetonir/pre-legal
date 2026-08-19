# pre-legal

SaaS para generar documentos legales a partir de las plantillas en `templates/`.

## Estructura

- `frontend/` — Next.js (export estático).
- `backend/` — FastAPI (uv), sirve la API y el `frontend/out` estático. Usa SQLite temporal: se recrea desde cero en cada arranque.
- `scripts/` — arrancar/parar el servidor local.

## Arrancar en local

```bash
# Linux
scripts/start-linux.sh
scripts/stop-linux.sh

# macOS
scripts/start-mac.sh
scripts/stop-mac.sh

# Windows (PowerShell)
scripts/start-windows.ps1
scripts/stop-windows.ps1
```

Compila el frontend a estático y arranca el backend en `http://localhost:8000`, que sirve tanto la API (`/api/...`) como la app.

Para desarrollar con recarga en caliente del frontend, en una terminal aparte:

```bash
cd frontend && npm run dev   # http://localhost:3000, llama al backend en :8000
```

## Docker

```bash
docker build -t pre-legal .
docker run -p 8000:8000 pre-legal
```