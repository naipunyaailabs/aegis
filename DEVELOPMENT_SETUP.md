# Development Setup

This guide explains how to run your application in a development environment.

## Prerequisites

1. Python 3.7+
2. Node.js 14+
3. npm 6+
4. Docker and Docker Compose (optional)

## Running the Application

### Option 1: Using Docker Compose (Recommended)

The easiest way to start both the backend and frontend is to use Docker Compose:

```bash
# Start services
docker-compose up --build

# Or use the provided script
start-services.bat
```

This will start:
- Backend API on http://localhost
- Frontend development server on http://localhost:5173

To stop the services:
```bash
# Press Ctrl+C in the terminal, or run:
docker-compose down

# Or use the provided script
stop-services.bat
```

### Option 2: Using the Python Script

You can also use the provided Python script to start both backend and frontend:

```bash
python start-dev.py
```

This script will:
1. Start the FastAPI backend on port 8000
2. Check if you have a built React app in the `dist` directory
3. If a built app exists, start a simple HTTP server on port 8001
4. If no built app exists, start the React development server on port 5173

### Option 3: Using Batch File (Windows)

On Windows, you can also use the batch file:

```cmd
start-dev.bat
```

### Option 4: Manual Start

You can also start the services manually:

1. **Start the backend:**
   ```bash
   cd backend
   python fastapi_server.py
   ```

2. **Start the frontend (development mode):**
   ```bash
   npm run dev
   ```

3. **Or serve the built app with simple HTTP server:**
   ```bash
   npm run build
   npm run serve:simple
   ```

### Option 5: Serve Built App with SSL (Reverse Proxy)

To serve your built React app with SSL using your provided certificates and acting as a reverse proxy to the FastAPI backend:

1. **Build your React app:**
   ```bash
   npm run build
   ```

2. **Place your SSL certificates in the ssl directory:**
   - `ssl/cert.pem` (Your SSL certificate)
   - `ssl/key.pem` (Your private key)

3. **Start the SSL server (requires administrator privileges):**
   ```bash
   # On Windows - Run as Administrator
   start-ssl-server.bat
   
   # On Linux/Mac
   sudo ./start-ssl-server.sh
   ```

4. **Access your app:**
   - https://localhost (port 443)

### Option 6: Serve Built App with Simple HTTP Server (Reverse Proxy)

To serve your built React app with a simple HTTP server (no SSL) acting as a reverse proxy:

1. **Build your React app:**
   ```bash
   npm run build
   ```

2. **Start the simple HTTP server:**
   ```bash
   # On Windows
   start-simple-server.bat
   
   # On Linux/Mac
   ./start-simple-server.sh
   ```

3. **Access your app:**
   - http://localhost:8080

## Accessing the Application

Once the servers are running, you can access:

- Backend API: http://localhost
- Frontend (development): http://localhost:5173
- Frontend (built, HTTP server): http://localhost:8080
- Frontend (built, simple HTTP): http://localhost:8001
- Frontend (built, HTTPS with your certificates): https://localhost (port 443)

## Stopping the Servers

To stop the servers:
- If using Docker Compose: Press Ctrl+C or run `docker-compose down`
- If using `start-dev.py`: Press Ctrl+C
- If using manual start: Press Ctrl+C in each terminal
- If using `start-dev.bat`: Press any key when prompted
- If using SSL server: Press Ctrl+C
- If using simple HTTP server: Press Ctrl+C

## Troubleshooting

### Docker Issues

If you encounter Docker issues:
1. Make sure Docker Desktop is running
2. Check that ports 8000 and 5173 are not in use
3. Try restarting Docker Desktop

### Port Conflicts

If ports are already in use:
1. Stop the services: Press Ctrl+C
2. Change the port numbers in the scripts or docker-compose.yml
3. Restart the services

### Missing Dependencies

If you get errors about missing dependencies:
1. Install Python dependencies: `pip install -r backend/requirements.txt`
2. Install Node dependencies: `npm install`

## Building for Production

When you're ready to build for production:
```bash
npm run build
```

This will create a `dist` directory with the built React app that can be served by the simple HTTP server or the SSL server.