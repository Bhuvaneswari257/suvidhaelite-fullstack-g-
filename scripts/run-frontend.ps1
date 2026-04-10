$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot
npm run dev -- --host 127.0.0.1 --port 5173
