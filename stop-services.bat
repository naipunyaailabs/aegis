@echo off
REM Script to stop Docker Compose services

echo Stopping services...

docker-compose down

echo Services stopped.