@echo off
REM Script to start backend and frontend services with Docker Compose

echo Starting backend and frontend services...

REM Build and start the services
docker-compose up --build

echo Services stopped.