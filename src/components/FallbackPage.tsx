import React from 'react';
import { Link } from 'react-router-dom';

const FallbackPage: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{title}</h1>
      <p style={{ marginBottom: '2rem' }}>
        We're sorry, but the content for this page could not be loaded.
        This could be due to Vercel deployment restrictions on HTML files.
      </p>
      
      <div style={{ 
        background: '#f9fafb', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb',
        maxWidth: '500px',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Alternative Options:</h2>
        <ul style={{ textAlign: 'left', lineHeight: '1.6' }}>
          <li>Return to the <Link to="/" style={{ color: '#4f46e5', fontWeight: 'bold' }}>Home page</Link></li>
          <li>Try clearing your browser cache and refreshing</li>
          <li>Consider visiting the <Link to="/test" style={{ color: '#4f46e5', fontWeight: 'bold' }}>Test page</Link> which uses standard React components</li>
        </ul>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { name: "Home", path: "/" },
          { name: "Test Page", path: "/test" },
          { name: "Contact", path: "/contact" }
        ].map((item) => (
          <Link 
            key={item.name} 
            to={item.path} 
            style={{ 
              background: '#4f46e5', 
              color: 'white', 
              padding: '0.5rem 1rem', 
              borderRadius: '0.25rem',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FallbackPage; 