@echo off
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "push.ps1"
