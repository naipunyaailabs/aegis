@echo off
REM Script to start the SSL server for the React build using your provided SSL certificates with reverse proxy to FastAPI backend

echo Setting up SSL server for React build using your provided SSL certificates with reverse proxy to FastAPI backend...

REM Check if dist directory exists
if not exist dist (
    echo Error: dist directory not found. Please build your React app first with "npm run build"
    pause
    exit /b 1
)

REM Check if ssl directory exists
if not exist ssl (
    echo Error: ssl directory not found. Please create an ssl directory with your certificate files:
    echo  - ssl/cert.pem (SSL certificate)
    echo  - ssl/key.pem (Private key)
    pause
    exit /b 1
)

REM Check if certificate files exist
if not exist ssl\cert.pem (
    echo Error: ssl/cert.pem not found
    pause
    exit /b 1
)

if not exist ssl\key.pem (
    echo Error: ssl/key.pem not found
    pause
    exit /b 1
)

REM Install server dependencies if needed
if not exist node_modules (
    echo Installing server dependencies...
    npm install
)

REM Start the SSL server
echo Starting SSL server on port 443...
echo Frontend will be served at https://localhost (port 443)
echo API requests will be proxied to FastAPI backend at http://localhost
echo Note: Port 443 requires administrator privileges on Windows
node server.js

pause