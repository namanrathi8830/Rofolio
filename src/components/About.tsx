import React, { useEffect, useState, useRef } from 'react';

const About: React.FC = () => {
  const [timestamp, setTimestamp] = useState(Date.now());
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Direct URL to the about page on Framer
  const directFramerUrl = "https://rofolio.framer.website/about";
  
  // Force a refresh when the component mounts
  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  // Function to force a refresh of the iframe
  const refreshIframe = () => {
    if (iframeRef.current) {
      try {
        // Force a reload with a new timestamp to break the cache
        iframeRef.current.src = `${directFramerUrl}?t=${Date.now()}`;
        console.log("Refreshed iframe with URL:", iframeRef.current.src);
      } catch (error) {
        console.error("Error refreshing iframe:", error);
      }
    }
  };
  
  return (
    <div className="about-container" style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <iframe 
        ref={iframeRef}
        src={`${directFramerUrl}?t=${timestamp}`}
        title="About"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          overflow: 'hidden'
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
      <button 
        onClick={refreshIframe}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1000,
          padding: '5px 10px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          opacity: 0.3,
          transition: 'opacity 0.3s'
        }}
        onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
        onMouseOut={(e) => e.currentTarget.style.opacity = '0.3'}
      >
        Refresh
      </button>
    </div>
  );
};

export default About; 