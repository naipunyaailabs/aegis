const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create ssl directory if it doesn't exist
const sslDir = path.join(__dirname, 'ssl');
if (!fs.existsSync(sslDir)) {
  fs.mkdirSync(sslDir);
}

try {
  // Try to use OpenSSL if available
  execSync('openssl version', { stdio: 'ignore' });
  
  console.log('Generating self-signed SSL certificates with OpenSSL...');
  
  // Generate private key and certificate
  execSync(
    `openssl req -x509 -newkey rsa:4096 -keyout ${path.join(sslDir, 'key.pem')} -out ${path.join(sslDir, 'cert.pem')} -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"`,
    { stdio: 'inherit' }
  );
  
  console.log('SSL certificates generated successfully with OpenSSL!');
  console.log(`Certificate: ${path.join(sslDir, 'cert.pem')}`);
  console.log(`Private Key: ${path.join(sslDir, 'key.pem')}`);
  
} catch (error) {
  console.log('OpenSSL not available. Please install OpenSSL to generate proper SSL certificates.');
  console.log('You can download OpenSSL from https://slproweb.com/products/Win32OpenSSL.html');
  console.log('Or use your own SSL certificates in the ssl directory:');
  console.log(' - ssl/cert.pem (SSL certificate)');
  console.log(' - ssl/key.pem (Private key)');
}