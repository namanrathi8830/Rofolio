import React, { useState, useRef, useEffect } from 'react';

const Testimonials: React.FC = () => {
  const [timestamp, setTimestamp] = useState(Date.now());
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Define a direct URL to the Framer testimonials page
  const directFramerUrl = "https://rofolio.framer.website/testimonials";
  
  useEffect(() => {
    const handleLoad = () => {
      console.log("Testimonials iframe loaded");
      
      // Remove Framer badges when the iframe loads
      try {
        const iframeWindow = iframeRef.current?.contentWindow;
        if (iframeWindow && iframeWindow.document) {
          // Function to remove badges
          const removeBadges = () => {
            try {
              // Try to find and remove badge containers
              const badgeContainers = iframeWindow.document.querySelectorAll('[id*="framer-badge"], [class*="framer-badge"], #__framer-badge-container');
              
              badgeContainers.forEach(badge => {
                if (badge && badge.parentNode) {
                  badge.parentNode.removeChild(badge);
                  console.log("Removed a Framer badge");
                }
              });
              
              // Also apply CSS to hide any badges that might be added dynamically
              const style = iframeWindow.document.createElement('style');
              style.textContent = `
                #__framer-badge-container, 
                [id*="framer-badge"], 
                [class*="framer-badge"],
                [data-framer-badge-container] {
                  display: none !important;
                  opacity: 0 !important;
                  visibility: hidden !important;
                  pointer-events: none !important;
                }
              `;
              iframeWindow.document.head.appendChild(style);
            } catch (e) {
              console.error("Error removing badges:", e);
            }
          };
          
          // Remove badges immediately
          removeBadges();
          
          // Also set up an observer to remove badges that might be added dynamically
          const observer = new MutationObserver(() => {
            removeBadges();
          });
          
          // Start observing
          observer.observe(iframeWindow.document.body, {
            childList: true,
            subtree: true
          });
          
          // Clean up function
          return () => {
            observer.disconnect();
          };
        }
      } catch (e) {
        console.error("Error accessing iframe content:", e);
      }
    };
    
    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', handleLoad);
      
      return () => {
        iframeRef.current?.removeEventListener('load', handleLoad);
      };
    }
  }, [timestamp]);
  
  // Function to force a refresh of the iframe
  const refreshIframe = () => {
    setTimestamp(Date.now());
    if (iframeRef.current) {
      iframeRef.current.src = `${directFramerUrl}?t=${Date.now()}`;
      console.log("Refreshed iframe with URL:", iframeRef.current.src);
    }
  };
  
  // Build the source URL with a timestamp to prevent caching
  const iframeSrc = `${directFramerUrl}?t=${timestamp}`;
  
  return (
    <div className="testimonials-container" style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <iframe 
        ref={iframeRef}
        src={iframeSrc}
        title="Testimonials"
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

export default Testimonials; 