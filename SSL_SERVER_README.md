# SSL Server for React Build

This guide explains how to serve your React build with SSL using a simple Node.js server and your provided SSL certificates.

## Prerequisites

1. Node.js 14+
2. npm 6+

## Setup Instructions

### 1. Build Your React App

First, make sure you have built your React application:

```bash
npm run build
```

This will create a `dist` directory with your built React app.

### 2. Place Your SSL Certificates

Place your SSL certificates in the `ssl` directory:
- `ssl/cert.pem` (Your SSL certificate)
- `ssl/key.pem` (Your private key)

### 3. Install Server Dependencies

The server requires Express.js. You can install it by:

```bash
npm install
```

Or use the start script which will automatically install dependencies.

### 4. Start the SSL Server

**On Windows:**
```cmd
start-ssl-server.bat
```

**On Linux/Mac:**
```bash
chmod +x start-ssl-server.sh
./start-ssl-server.sh
```

Alternatively, you can start the server directly:
```bash
node server.js
```

**Note for Port 443**: Port 443 requires administrator privileges. On Windows, right-click the Command Prompt or PowerShell and select "Run as administrator". On Linux/Mac, use `sudo`:

```bash
sudo node server.js
```

## Accessing Your Application

Once the server is running, you can access your application at:
- HTTPS: https://localhost (port 443)
- If port 443 is unavailable: https://localhost:8443

## Configuration

### Port Configuration

By default, the server runs on port 443. If you need to change it, you can set the PORT environment variable:

```bash
PORT=8443 node server.js
```

Or on Windows:
```cmd
set PORT=8443 && node server.js
```

### Directory Structure

The server expects the following directory structure:
```
project-root/
├── dist/              # Built React app
├── ssl/               # SSL certificates
│   ├── cert.pem       # SSL certificate
│   └── key.pem        # Private key
├── server.js          # Server script
└── package.json       # Server dependencies
```

## Troubleshooting

### SSL Certificate Errors

If you see SSL certificate warnings in your browser:
1. This is normal if your certificates are not from a trusted Certificate Authority
2. You can proceed by clicking "Advanced" and "Proceed to localhost"
3. For production, use certificates from a trusted Certificate Authority

### Port Already in Use

If you get an error that port 443 is already in use:
1. Use a different port by setting the PORT environment variable
2. Or stop the process using port 443

### Administrator Privileges Required

If you get a permission error when starting the server on port 443:
1. On Windows: Run Command Prompt or PowerShell as Administrator
2. On Linux/Mac: Use `sudo node server.js`

### Missing Dependencies

If you get errors about missing modules:
1. Run `npm install` to install dependencies
2. Make sure you're in the project root directory

### SSL Certificate/Key Mismatch

If you get an "key values mismatch" error:
1. Your certificate and key don't match
2. Verify that you're using the correct certificate/key pair
3. Check that the files are not corrupted

## Production Deployment

For production deployment:
1. Use SSL certificates from a trusted Certificate Authority
2. Set up proper firewall rules
3. Use process managers like PM2 for production deployment