#!/bin/bash

# Script to start the simple HTTP server for the React build

echo "Setting up simple HTTP server for React build..."

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "Error: dist directory not found. Please build your React app first with \"npm run build\""
    read -p "Press enter to continue..."
    exit 1
fi

# Install server dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing server dependencies..."
    npm install
fi

# Start the simple HTTP server
echo "Starting simple HTTP server..."
npm run serve:simple