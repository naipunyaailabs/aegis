/*
 * This server.js file is kept for development purposes only.
 * In production, the FastAPI server serves the React app directly with SSL.
 * 
 * To use this server (development only):
 * 1. Build the React app: npm run build
 * 2. Run this server: node server.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const DIST_DIR = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 443;
const BACKEND_PORT = 8000;
const CHATBOT_PORT = 8080; // New chatbot app port
const BACKEND_HOST = 'localhost';

// Ensure dist exists
if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ dist directory not found. Run "npm run build" first.');
  process.exit(1);
}

// Serve React static files
app.use(express.static(DIST_DIR));

// Proxy /chatbot requests → Chatbot React app
app.use('/chatbot', createProxyMiddleware({
  target: `http://${BACKEND_HOST}:${CHATBOT_PORT}`,
  changeOrigin: true,
  pathRewrite: { '^/chatbot': '' },   // strip /chatbot prefix
  logLevel: 'debug'
}));

// Proxy API requests → FastAPI backend
app.use('/api', createProxyMiddleware({
  target: `http://${BACKEND_HOST}:${BACKEND_PORT}`,
  changeOrigin: true,
  pathRewrite: { '^/api': '' },   // strip /api prefix
  logLevel: 'debug'
}));

// SPA fallback (always last)
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

// SSL certs
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
};

// Start HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`✅ HTTPS Server running on https://localhost:${PORT}`);
  console.log(`Frontend: https://yourdomain/`);
  console.log(`Chatbot App Proxy → React App: http://${BACKEND_HOST}:${CHATBOT_PORT}/chatbot`);
  console.log(`API Proxy → FastAPI: http://${BACKEND_HOST}:${BACKEND_PORT}`);
  console.log(`\n⚠️  This server is for development only. In production, use: npm run backend:fastapi`);
});