const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
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
  
} catch (error) {
  console.log('OpenSSL not available, generating certificates with Node.js crypto...');
  
  // Fallback to Node.js crypto
  try {
    const { generateKeyPairSync, createSign } = require('crypto');
    
    // Generate RSA key pair
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    });
    
    // Save private key
    fs.writeFileSync(path.join(sslDir, 'key.pem'), privateKey);
    
    // For a proper certificate, we'd need to create a CSR and sign it
    // But for simplicity, we'll just save the public key as the certificate
    // Note: This won't work for HTTPS as it's not a proper X.509 certificate
    fs.writeFileSync(path.join(sslDir, 'cert.pem'), publicKey);
    
    console.log('Key pair generated with Node.js crypto.');
    console.log('Note: This is not a proper SSL certificate and won\'t work for HTTPS.');
    console.log('Please install OpenSSL or use proper SSL certificates for production.');
    
  } catch (cryptoError) {
    console.error('Error generating certificates with Node.js crypto:');
    console.error(cryptoError.message);
    console.error('Please install OpenSSL or manually create your SSL certificates.');
  }
}