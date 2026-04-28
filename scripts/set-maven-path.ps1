$mavenBin = 'C:\Users\bhuva_5m1lgux\Downloads\apache-maven-3.9.14-bin\bin'
$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if (-not $userPath) { $userPath = '' }
if ($userPath -notlike "*${mavenBin}*") {
    $newPath = ($userPath + ';' + $mavenBin).Trim(';')
    [Environment]::SetEnvironmentVariable('Path', $newPath, 'User')
    Write-Host "Added Maven to user PATH: $mavenBin"
} else {
    Write-Host "Maven path already exists in user PATH."
}
Write-Host "Current user PATH entries:"
$userPath = [Environment]::GetEnvironmentVariable('Path','User')
$userPath.Split(';') | ForEach-Object { Write-Host $_ }
