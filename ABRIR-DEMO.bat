@echo off
rem Abre a demonstracao do site MoviCorpo (precisa do Node.js instalado).
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js nao encontrado. Instale em https://nodejs.org e rode este arquivo de novo.
  pause
  exit /b 1
)
start "" http://localhost:5174
node servir.js
