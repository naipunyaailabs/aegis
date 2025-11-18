#!/bin/bash

# Script to start the SSL server for the React build using your provided SSL certificates with reverse proxy to FastAPI backend

echo "Setting up SSL server for React build using your provided SSL certificates with reverse proxy to FastAPI backend..."

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "Error: dist directory not found. Please build your React app first with \"npm run build\""
    read -p "Press enter to continue..."
    exit 1
fi

# Check if ssl directory exists
if [ ! -d "ssl" ]; then
    echo "Error: ssl directory not found. Please create an ssl directory with your certificate files:"
    echo " - ssl/cert.pem (SSL certificate)"
    echo " - ssl/key.pem (Private key)"
    read -p "Press enter to continue..."
    exit 1
fi

# Check if certificate files exist
if [ ! -f "ssl/cert.pem" ]; then
    echo "Error: ssl/cert.pem not found"
    read -p "Press enter to continue..."
    exit 1
fi

if [ ! -f "ssl/key.pem" ]; then
    echo "Error: ssl/key.pem not found"
    read -p "Press enter to continue..."
    exit 1
fi

# Install server dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing server dependencies..."
    npm install
fi

# Start the SSL server
echo "Starting SSL server on port 443..."
echo "Frontend will be served at https://localhost (port 443)"
echo "API requests will be proxied to FastAPI backend at http://localhost"
echo "Note: Port 443 requires sudo privileges on Linux/Mac"
node server.js