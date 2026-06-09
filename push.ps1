# 推送到 GitHub
# 右键 → 使用 PowerShell 运行

$git = "$env:TEMP\portable-git\cmd\git.exe"
$repoDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Set-Location $repoDir

Write-Host ""
Write-Host "正在推送到 GitHub..." -ForegroundColor Yellow

& $git add -A
$changes = & $git status --porcelain
if ($changes) {
    & $git commit -m "Update website content"
}

& $git push -u origin main 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  推送成功！" -ForegroundColor Green
    Write-Host "  https://github.com/kgg66023-crypto/xixi.git" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "推送失败，请检查网络或 Token 是否过期。" -ForegroundColor Red
}

Write-Host ""
Read-Host "按回车退出"
