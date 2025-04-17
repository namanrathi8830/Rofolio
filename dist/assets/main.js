// Main entry point for the Rofolio app
(function() {
  console.log('Initializing Rofolio application...');

  // Create the script element for React
  const loadReact = () => {
    const reactScript = document.createElement('script');
    reactScript.src = 'https://unpkg.com/react@18/umd/react.production.min.js';
    reactScript.crossOrigin = 'anonymous';
    document.body.appendChild(reactScript);

    const reactDomScript = document.createElement('script');
    reactDomScript.src = 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js';
    reactDomScript.crossOrigin = 'anonymous';
    document.body.appendChild(reactDomScript);

    // Load our app after React is loaded
    reactDomScript.onload = loadApp;
  };

  // Load the actual application
  const loadApp = () => {
    // Create a simple React app
    const appDiv = document.getElementById('root');
    appDiv.innerHTML = '';

    // Create basic React components
    const container = document.createElement('div');
    container.className = 'container';
    container.style.maxWidth = '1200px';
    container.style.margin = '0 auto';
    container.style.padding = '20px';
    container.style.fontFamily = '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    
    const header = document.createElement('header');
    header.style.textAlign = 'center';
    header.style.marginBottom = '40px';

    const heading = document.createElement('h1');
    heading.textContent = "Naman Rathi's Portfolio";
    heading.style.fontSize = '36px';
    heading.style.color = '#4f46e5';
    heading.style.margin = '20px 0';

    const subheading = document.createElement('p');
    subheading.textContent = 'Full Stack Developer & Data Scientist';
    subheading.style.fontSize = '18px';
    subheading.style.color = '#6b7280';

    const main = document.createElement('main');
    main.style.display = 'grid';
    main.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    main.style.gap = '20px';
    
    // Add sections
    const sections = [
      { title: 'About Me', path: '/about', description: 'Learn more about my background and skills' },
      { title: 'Skills', path: '/skills', description: 'Explore my technical expertise and capabilities' },
      { title: 'Projects', path: '/projects', description: 'View my portfolio of work and case studies' },
      { title: 'Contact', path: '/contact', description: 'Get in touch with me for opportunities' }
    ];

    // Build the UI
    header.appendChild(heading);
    header.appendChild(subheading);
    container.appendChild(header);

    sections.forEach(section => {
      const card = document.createElement('div');
      card.style.padding = '20px';
      card.style.borderRadius = '8px';
      card.style.backgroundColor = '#f9fafb';
      card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      card.style.transition = 'transform 0.2s, box-shadow 0.2s';
      card.style.cursor = 'pointer';
      
      card.onmouseover = () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
      };
      
      card.onmouseout = () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      };
      
      card.onclick = () => {
        window.location.href = section.path;
      };

      const title = document.createElement('h2');
      title.textContent = section.title;
      title.style.fontSize = '24px';
      title.style.color = '#111827';
      title.style.marginBottom = '10px';

      const description = document.createElement('p');
      description.textContent = section.description;
      description.style.fontSize = '16px';
      description.style.color = '#6b7280';

      card.appendChild(title);
      card.appendChild(description);
      main.appendChild(card);
    });

    container.appendChild(main);
    appDiv.appendChild(container);

    // Add message about loading the full version
    const message = document.createElement('div');
    message.style.margin = '40px auto';
    message.style.padding = '15px';
    message.style.maxWidth = '600px';
    message.style.textAlign = 'center';
    message.style.backgroundColor = '#f0f9ff';
    message.style.borderRadius = '8px';
    message.style.border = '1px solid #93c5fd';

    const messageText = document.createElement('p');
    messageText.innerHTML = 'You\'re viewing a fallback version of the portfolio. The full interactive version is loading or couldn\'t be loaded. <button id="reload-btn">Reload Full Version</button>';
    messageText.style.margin = '0';
    messageText.style.color = '#1e40af';

    message.appendChild(messageText);
    container.appendChild(message);

    document.getElementById('reload-btn').addEventListener('click', () => {
      window.location.reload();
    });
    document.getElementById('reload-btn').style.backgroundColor = '#4f46e5';
    document.getElementById('reload-btn').style.color = 'white';
    document.getElementById('reload-btn').style.border = 'none';
    document.getElementById('reload-btn').style.padding = '8px 16px';
    document.getElementById('reload-btn').style.borderRadius = '4px';
    document.getElementById('reload-btn').style.cursor = 'pointer';
    document.getElementById('reload-btn').style.marginLeft = '10px';
  };

  // Start loading React
  loadReact();
})(); 