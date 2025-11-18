@echo off
REM Script to generate self-signed SSL certificates

echo Generating self-signed SSL certificates...

REM Check if Node.js is available
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

REM Run the certificate generation script
node generate-certificates.js

pause