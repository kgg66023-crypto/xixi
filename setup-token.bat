@echo off
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "setup-token.ps1"
