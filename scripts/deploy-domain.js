#!/usr/bin/env node

/**
 * Deployment script for clofr.online
 * This script helps ensure proper deployment with domain configuration
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Deploying CloFr to clofr.online...\n');

// Check if we're in the right directory
if (!fs.existsSync('netlify.toml')) {
  console.error('❌ netlify.toml not found. Please run this from the project root.');
  process.exit(1);
}

// Check if dist directory exists
if (!fs.existsSync('dist')) {
  console.log('📦 Building project...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build completed successfully\n');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Verify netlify.toml configuration
console.log('🔍 Verifying netlify.toml configuration...');
const netlifyConfig = fs.readFileSync('netlify.toml', 'utf8');

if (netlifyConfig.includes('publish = "dist/spa"')) {
  console.log('✅ Publish directory configured correctly');
} else {
  console.log('⚠️  Publish directory might not be configured correctly');
}

if (netlifyConfig.includes('from = "/*"')) {
  console.log('✅ SPA redirects configured');
} else {
  console.log('⚠️  SPA redirects might not be configured');
}

console.log('\n📋 Manual steps to complete:');
console.log('1. Go to Netlify dashboard');
console.log('2. Navigate to your site → Domain settings');
console.log('3. Add clofr.online as custom domain');
console.log('4. Set clofr.online as primary domain');
console.log('5. Enable Force HTTPS');
console.log('6. Verify DNS settings with your domain provider');

console.log('\n🌐 Domain should be accessible at: https://clofr.online');
console.log('🔒 Make sure HTTPS is enabled and working');

console.log('\n✅ Deployment configuration ready!');
