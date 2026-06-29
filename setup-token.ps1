$git = "$env:TEMP\portable-git\cmd\git.exe"
$repoDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GitHub Token Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Paste your GitHub Personal Access Token, then press Enter:" -ForegroundColor Yellow
Write-Host "(Token will not display on screen, this is normal)" -ForegroundColor Gray
Write-Host ""

$token = Read-Host "Token"

if ([string]::IsNullOrWhiteSpace($token)) {
    Write-Host ""
    Write-Host "ERROR: Token cannot be empty!" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Set-Location $repoDir

Write-Host ""
Write-Host "Configuring..." -ForegroundColor Yellow

& $git config --global http.proxy http://127.0.0.1:7890
& $git config --global https.proxy http://127.0.0.1:7890
& $git remote set-url origin "https://kgg66023-crypto:${token}@github.com/kgg66023-crypto/xixi.git"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Done! Use push.vbs to push code later" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to exit"
