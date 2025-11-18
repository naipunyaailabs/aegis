const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express app
const app = express();

// Define paths
const DIST_DIR = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 8080;
const BACKEND_PORT = 8000;
const BACKEND_HOST = 'localhost';

// Check if dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  console.error('Error: dist directory not found. Please build your React app first with "npm run build"');
  process.exit(1);
}

// Serve static files from dist directory
app.use(express.static(DIST_DIR));

// API routes - proxy to FastAPI backend
app.use('/api', createProxyMiddleware({
  target: `http://${BACKEND_HOST}:${BACKEND_PORT}`,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // remove /api prefix when forwarding to backend
  },
  logLevel: 'debug'
}));

// Direct proxy for specific backend endpoints (without /api prefix)
const backendEndpoints = [
  '/bse-alerts',
  '/sebi-analysis-data',
  '/rbi-analysis-data',
  '/visits',
  '/health'
];

backendEndpoints.forEach(endpoint => {
  app.use(endpoint, createProxyMiddleware({
    target: `http://${BACKEND_HOST}:${BACKEND_PORT}`,
    changeOrigin: true,
    logLevel: 'debug'
  }));
});

// Handle SPA routing - serve index.html for all routes
app.use((req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`HTTP Server running on port ${PORT}`);
  console.log(`Frontend served at http://localhost:${PORT}`);
  console.log(`API proxying to FastAPI backend at http://${BACKEND_HOST}:${BACKEND_PORT}`);
});