#!/bin/bash

# Script to generate self-signed SSL certificates

echo "Generating self-signed SSL certificates..."

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed or not in PATH"
    read -p "Press enter to continue..."
    exit 1
fi

# Run the certificate generation script
node generate-certificates.js

read -p "Press enter to continue..."