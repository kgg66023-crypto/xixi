$git = "$env:TEMP\portable-git\cmd\git.exe"
$repoDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Set-Location $repoDir

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow

& $git add -A
$changes = & $git status --porcelain
if ($changes) {
    & $git commit -m "Update website content"
}

& $git push -u origin main 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Push successful!" -ForegroundColor Green
    Write-Host "  https://github.com/kgg66023-crypto/xixi.git" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Push failed. Check network or token." -ForegroundColor Red
}

Write-Host ""
Read-Host "Press Enter to exit"
