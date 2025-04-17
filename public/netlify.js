// This file helps with Netlify deployment issues
console.log('Initializing Rofolio app...');

// Force redirect to index.html if we're on any path
if (window.location.pathname !== '/' && !window.location.pathname.includes('.')) {
  window.location.href = '/';
} 