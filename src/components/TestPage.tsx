import React from 'react';
import { Link } from 'react-router-dom';

const TestPage: React.FC = () => {
  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Test Page</h1>
      <p>This is a test page to verify routing is working correctly.</p>
      
      <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Navigation Links</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ marginBottom: '0.5rem' }}>
          <Link to="/" style={{ color: '#4f46e5', textDecoration: 'underline' }}>Home</Link>
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <Link to="/about" style={{ color: '#4f46e5', textDecoration: 'underline' }}>About</Link>
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <Link to="/skills" style={{ color: '#4f46e5', textDecoration: 'underline' }}>Skills</Link>
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <Link to="/projects" style={{ color: '#4f46e5', textDecoration: 'underline' }}>Projects</Link>
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <Link to="/contact" style={{ color: '#4f46e5', textDecoration: 'underline' }}>Contact</Link>
        </li>
      </ul>

      <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Direct Links (anchor tags)</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ marginBottom: '0.5rem' }}>
          <a href="/" style={{ color: '#0ea5e9', textDecoration: 'underline' }}>Home</a>
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <a href="/about" style={{ color: '#0ea5e9', textDecoration: 'underline' }}>About</a>
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <a href="/skills" style={{ color: '#0ea5e9', textDecoration: 'underline' }}>Skills</a>
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <a href="/projects" style={{ color: '#0ea5e9', textDecoration: 'underline' }}>Projects</a>
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <a href="/contact" style={{ color: '#0ea5e9', textDecoration: 'underline' }}>Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default TestPage; 