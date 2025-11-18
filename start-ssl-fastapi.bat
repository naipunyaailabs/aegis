@echo off
echo Starting FastAPI server with SSL (serving React app directly)...
echo Make sure you have built the React app with "npm run build" first.
echo.

cd backend
python fastapi_server.py

echo.
echo Server stopped.
pause