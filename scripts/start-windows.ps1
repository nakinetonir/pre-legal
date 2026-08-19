# Builds the frontend static export and starts the FastAPI backend serving
# both the API and the built app on http://localhost:8000.
$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")

if (Test-Path ".server.pid") {
    $existingId = Get-Content ".server.pid"
    if (Get-Process -Id $existingId -ErrorAction SilentlyContinue) {
        Write-Host "El servidor ya está en marcha (PID $existingId). Usa scripts\stop-windows.ps1 primero."
        exit 1
    }
}

Write-Host "==> Instalando dependencias del frontend..."
Push-Location frontend
npm install
Write-Host "==> Generando el export estático del frontend..."
npm run build
Pop-Location

Write-Host "==> Instalando dependencias del backend (uv)..."
Push-Location backend
uv sync
Pop-Location

New-Item -ItemType Directory -Force -Path logs | Out-Null
Write-Host "==> Arrancando el backend en http://localhost:8000 ..."
$process = Start-Process -FilePath "uv" `
    -ArgumentList "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000" `
    -WorkingDirectory "backend" `
    -RedirectStandardOutput "logs\server.log" `
    -RedirectStandardError "logs\server.err.log" `
    -PassThru -WindowStyle Hidden

$process.Id | Out-File -FilePath ".server.pid" -Encoding ascii
Write-Host "Servidor iniciado. PID: $($process.Id)"
Write-Host "Logs: logs\server.log"
