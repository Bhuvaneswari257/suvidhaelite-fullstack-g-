$projectRoot = Split-Path -Parent $PSScriptRoot
$backendDir = Join-Path $projectRoot 'spring-boot-backend'

$mavenCommand = $null

try {
    $mavenInPath = Get-Command mvn.cmd -ErrorAction Stop
    $mavenCommand = $mavenInPath.Source
} catch {
    $wrapperRoot = Join-Path $env:USERPROFILE '.m2\wrapper\dists'
    if (Test-Path $wrapperRoot) {
        $mavenCommand = Get-ChildItem -Path $wrapperRoot -Recurse -Filter mvn.cmd -ErrorAction SilentlyContinue |
            Select-Object -First 1 -ExpandProperty FullName
    }
}

if (-not $mavenCommand) {
    Write-Error "Maven was not found. Install Maven or add it to PATH, then run again."
    exit 1
}

Set-Location $backendDir
& $mavenCommand spring-boot:run
