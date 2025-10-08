#!/usr/bin/env node

/**
 * Domain verification script for clofr.online
 * Run this to check if your domain is properly configured
 */

const https = require('https');
const http = require('http');

const domain = 'clofr.online';

console.log('🔍 Checking domain configuration for clofr.online...\n');

function checkDomain(protocol = 'https') {
  return new Promise((resolve, reject) => {
    const url = `${protocol}://${domain}`;
    const client = protocol === 'https' ? https : http;
    
    const req = client.get(url, (res) => {
      console.log(`✅ ${protocol.toUpperCase()}: ${domain} is accessible`);
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   Headers: ${JSON.stringify(res.headers, null, 2)}`);
      resolve(res);
    });
    
    req.on('error', (err) => {
      console.log(`❌ ${protocol.toUpperCase()}: ${domain} is not accessible`);
      console.log(`   Error: ${err.message}`);
      reject(err);
    });
    
    req.setTimeout(5000, () => {
      console.log(`⏰ ${protocol.toUpperCase()}: Timeout for ${domain}`);
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function main() {
  try {
    console.log('Checking HTTPS...');
    await checkDomain('https');
  } catch (error) {
    console.log('\nChecking HTTP...');
    try {
      await checkDomain('http');
    } catch (httpError) {
      console.log('\n❌ Domain is not accessible. Please check your DNS and Netlify configuration.');
    }
  }
  
  console.log('\n📋 Next steps:');
  console.log('1. Verify domain in Netlify dashboard');
  console.log('2. Set clofr.online as primary domain');
  console.log('3. Enable Force HTTPS');
  console.log('4. Check DNS settings with your domain provider');
}

main().catch(console.error);
