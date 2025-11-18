@echo off
REM Script to build React app and serve it with SSL

echo Building React app and serving with SSL...

REM Build the React app
echo Building React app...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo Build successful!
) else (
    echo Build failed. Please check the error messages above.
    pause
    exit /b 1
)

REM Start the SSL server
echo Starting SSL server...
npm run serve:ssl

pause