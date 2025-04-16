import React from 'react';

const Blog: React.FC = () => {
  // Get the path to the HTML file
  const htmlPath = new URL('./Blog.HTML', import.meta.url).href;
  
  return (
    <div className="blog-container" style={{ width: '100%', height: '100vh' }}>
      <iframe 
        src={htmlPath}
        title="Blog"
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

export default Blog; 