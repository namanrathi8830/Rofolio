# Rofolio - Naman Rathi's Portfolio

Modern portfolio website built with React, Vite, and Spline 3D.

## Features

- Interactive 3D robot assistant on the home page using Spline
- Voice control functionality
- Responsive design for all device sizes
- Direct rendering of HTML content in component iframes
- Contact form with EmailJS integration

## Deployment Fixes

The following fixes were implemented to resolve deployment issues on Netlify:

1. **Fixed case-sensitivity issues in import paths**
   - Updated import statements to match exact filename case
   - Fixed `Blog.tsx` import that incorrectly included the file extension

2. **Created serverless functions for OpenAI API calls**
   - Added Netlify function to handle API calls securely
   - Updated client code to use serverless function in production
   - Protected API keys from exposure in client-side code

3. **Error handling for Spline component**
   - Added ErrorBoundary component to catch runtime errors
   - Implemented fallback UI when 3D scene fails to load
   - Added proper error states and recovery options

4. **Improved routing and redirects**
   - Added Netlify `_redirects` file for SPA routing
   - Added custom 404 page with navigation helpers
   - Implemented fallback routing for client-side routing

5. **Enhanced build configuration**
   - Updated Vite config to properly handle HTML assets
   - Fixed rollupOptions for proper code splitting
   - Added sourcemaps for better debugging
   - Configured proper CommonJS handling

6. **Improved initial loading experience**
   - Added loading animation in index.html
   - Pre-styled loader to prevent flash of unstyled content
   - Added favicon and proper meta tags

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory with these variables:

```
VITE_OPENAI_API_KEY=your_openai_key_for_dev_only
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

For production deployment on Netlify, add these environment variables in the Netlify dashboard under Site settings > Build & deploy > Environment.

## Deploying to Netlify

1. Connect your GitHub repository to Netlify
2. Set the build command to `npm run build`
3. Set the publish directory to `dist`
4. Add your environment variables in the Netlify dashboard
5. Deploy!

## Troubleshooting Deployment

If you encounter issues with the deployment:

1. Check browser console for errors
2. Verify that environment variables are correctly set
3. Check Netlify build logs for compile errors
4. Test with `netlify dev` locally to simulate the Netlify environment

## License

MIT
