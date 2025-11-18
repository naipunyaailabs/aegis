@echo off
REM Script to start the simple HTTP server for the React build with reverse proxy to FastAPI backend

echo Setting up simple HTTP server for React build with reverse proxy to FastAPI backend...

REM Check if dist directory exists
if not exist dist (
    echo Error: dist directory not found. Please build your React app first with "npm run build"
    pause
    exit /b 1
)

REM Install server dependencies if needed
if not exist node_modules (
    echo Installing server dependencies...
    npm install
)

REM Start the simple HTTP server
echo Starting simple HTTP server on port 8080...
echo Frontend will be served at http://localhost:8080
echo API requests will be proxied to FastAPI backend at http://localhost
node simple-server.js

pause