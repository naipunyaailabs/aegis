# Deployment Guide

This guide explains how to deploy the application with the React frontend served directly by the FastAPI backend.

## Prerequisites

- Node.js and npm installed
- Python 3.8+ installed
- SSL certificates (optional but recommended)

## Deployment Steps

### 1. Build the React Application

First, you need to build the React application:

```bash
npm run build
```

This will create a `dist` folder containing the production build of your React app.

### 2. Install Python Dependencies

Make sure all Python dependencies are installed:

```bash
cd backend
pip install -r requirements.txt
```

Or use the npm script:

```bash
npm run backend:install-deps
```

### 3. Run the FastAPI Server

Start the FastAPI server which will serve both the React frontend and the API:

```bash
npm run serve:ssl
```

Or directly:

```bash
cd backend
python fastapi_server.py
```

### 4. Access the Application

- With SSL: https://localhost (port 443)
- Without SSL: 

## How It Works

The FastAPI server is configured to:

1. Serve the React application on the root path `/` 
2. Serve API endpoints on their respective paths (`/bse-alerts`, `/sebi-analysis-data`, etc.)
3. Handle SPA routing by returning `index.html` for any unmatched routes
4. Automatically detect and use SSL certificates if they exist in the `ssl` directory

**Important**: The root endpoint (`/`) is intentionally not defined in the FastAPI server to allow the React app to be served from the root path. All API endpoints are available at their respective paths.

## SSL Configuration

To enable SSL, place your certificates in the `ssl` directory:

- `ssl/cert.pem` - Your SSL certificate
- `ssl/key.pem` - Your private key

If these files are present, the server will automatically start on port 443 with SSL enabled.

## Environment Variables

The application uses the following environment variables (set in a `.env` file in the root directory):

```env
# SharePoint Configuration (if using SharePoint integration)
SHAREPOINT_TENANT_ID="your-tenant-id"
SHAREPOINT_CLIENT_ID="your-client-id"
SHAREPOINT_CLIENT_SECRET="your-client-secret"
SHAREPOINT_SITE_URL="https://your-domain.sharepoint.com/sites/yoursite"
```

## Troubleshooting

### Common Issues

1. **"dist directory not found" error**:
   - Make sure you've run `npm run build` first
   - Check that the `dist` folder exists in the root directory

2. **SSL Certificate Issues**:
   - Ensure both `ssl/cert.pem` and `ssl/key.pem` exist
   - Verify that the certificate files are valid
   - On some systems, you may need to run with administrator privileges for port 443

3. **API Endpoints Not Working**:
   - Check that the FastAPI server is running
   - Verify that the database files exist in `backend/public/`
   - Check the server logs for error messages

4. **CORS Issues**:
   - The FastAPI server is configured to allow all origins when serving the React app from the same origin
   - If you're experiencing CORS issues, check the `allow_origins` configuration in `backend/fastapi_server.py`

5. **Seeing API Information Instead of React App**:
   - This means the root endpoint was defined in the FastAPI server, preventing static file serving
   - The root endpoint (`/`) should not be defined to allow React app serving
   - Restart the server after ensuring the root endpoint is removed

### Checking Server Status

You can verify that the server is running correctly by accessing:

- API Documentation: https://localhost/api/docs (or /api/docs)
- Health Check: https://localhost/health (or /health)

## Development vs Production

### Development

For development, you can run the frontend and backend separately:

```bash
# Terminal 1: Run the FastAPI backend
npm run backend:fastapi

# Terminal 2: Run the React development server
npm run dev
```

### Production

For production, build the React app and serve everything through FastAPI:

```bash
npm run build
npm run serve:ssl
```