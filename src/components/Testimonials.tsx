import React from 'react';

const Testimonials: React.FC = () => {
  // Get the path to the HTML file
  const htmlPath = new URL('./Testimonials.HTML', import.meta.url).href;
  
  return (
    <div className="testimonials-container" style={{ width: '100%', height: '100vh' }}>
      <iframe 
        src={htmlPath}
        title="Testimonials"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          overflow: 'hidden'
        }}
      />
    </div>
  );
};

export default Testimonials; 