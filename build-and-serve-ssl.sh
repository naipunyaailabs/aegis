#!/bin/bash

# Script to build React app and serve it with SSL

echo "Building React app and serving with SSL..."

# Build the React app
echo "Building React app..."
npm run build

if [ $? -eq 0 ]; then
    echo "Build successful!"
else
    echo "Build failed. Please check the error messages above."
    read -p "Press enter to continue..."
    exit 1
fi

# Start the SSL server
echo "Starting SSL server..."
npm run serve:ssl