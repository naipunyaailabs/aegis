import https from 'https';
import fs from 'fs';
import path from 'path';
import express from 'express';

// Create Express app
const app = express();

// Define paths
const DIST_DIR = path.join(process.cwd(), 'dist');
const PORT = process.env.PORT || 443;
const FALLBACK_PORT = 8443;

// Check if dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  console.error('Error: dist directory not found. Please build your React app first with "npm run build"');
  process.exit(1);
}

// Serve static files from dist directory
app.use(express.static(DIST_DIR));

// Handle SPA routing - serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

// SSL certificate paths
const sslOptions = {
  key: fs.readFileSync(path.join(process.cwd(), 'ssl', 'key.pem'), 'utf8'),
  cert: fs.readFileSync(path.join(process.cwd(), 'ssl', 'cert.pem'), 'utf8')
};

// Function to start server with error handling
function startServer(port) {
  const server = https.createServer(sslOptions, app);
  
  server.listen(port, () => {
    console.log(`HTTPS Server running on port ${port}`);
    console.log(`Access your app at https://localhost:${port}`);
  });
  
  server.on('error', (err) => {
    if (err.code === 'EACCES' && port === 443) {
      console.log('Port 443 requires administrator privileges. Trying fallback port...');
      startServer(FALLBACK_PORT);
    } else {
      console.error(`Error starting server on port ${port}:`, err.message);
    }
  });
  
  return server;
}

// Start the server
startServer(PORT);