$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")

if (Test-Path ".server.pid") {
    $processId = Get-Content ".server.pid"
    $existing = Get-Process -Id $processId -ErrorAction SilentlyContinue
    if ($existing) {
        # /T kills the whole process tree: "uv" spawns the actual uvicorn
        # process as a child, so killing only the tracked PID isn't enough.
        taskkill /PID $processId /T /F | Out-Null
        Write-Host "Servidor (PID $processId) detenido."
    } else {
        Write-Host "El proceso $processId ya no estaba en ejecución."
    }
    Remove-Item ".server.pid"
} else {
    Write-Host "No se encontró .server.pid; ¿el servidor está en marcha?"
}
