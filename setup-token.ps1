# GitHub Token 设置工具
# 右键 → 使用 PowerShell 运行

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GitHub Token 设置工具" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "请粘贴你的 GitHub Personal Access Token，然后按回车：" -ForegroundColor Yellow
Write-Host "(粘贴后屏幕上不会显示，这是正常的)" -ForegroundColor Gray
Write-Host ""

$token = Read-Host "Token"

if ([string]::IsNullOrWhiteSpace($token)) {
    Write-Host ""
    Write-Host "错误：Token 不能为空！" -ForegroundColor Red
    Read-Host "按回车退出"
    exit 1
}

$git = "$env:TEMP\portable-git\cmd\git.exe"
$repoDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Set-Location $repoDir

Write-Host ""
Write-Host "正在配置..." -ForegroundColor Yellow

& $git config --global http.proxy http://127.0.0.1:7890
& $git config --global https.proxy http://127.0.0.1:7890
& $git remote set-url origin "https://kgg66023-crypto:${token}@github.com/kgg66023-crypto/xixi.git"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  配置完成！" -ForegroundColor Green
Write-Host "  以后推送代码双击 push.bat 即可" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Read-Host "按回车退出"
