#!/usr/bin/env python3
"""
Simple HTTP server to serve the built React app
"""

import http.server
import socketserver
import os
import sys

# Set the port
PORT = 8001

# Change to the dist directory where the built React app is located
dist_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dist')
if not os.path.exists(dist_dir):
    print(f"Error: dist directory not found at {dist_dir}")
    print("Please build your React app first with 'npm run build'")
    sys.exit(1)

os.chdir(dist_dir)

# Create the server
Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving React app at http://localhost:{PORT}")
    print("Press Ctrl+C to stop the server")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")