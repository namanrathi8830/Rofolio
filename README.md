# 🚀 Rofolio - Modern Portfolio Website

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/EmailJS-2563EB?style=for-the-badge" alt="EmailJS" />
</div>

<div align="center">
  <h3>✨ A stunning, modern portfolio website with advanced animations and interactivity ✨</h3>
  <p><strong>Live Demo:</strong> <a href="https://rofolio.site">rofolio.site</a></p>
</div>

![Rofolio Portfolio Screenshot](https://via.placeholder.com/1200x600/1a2e2e/FFFFFF?text=Rofolio+Portfolio)

## 🌟 Features

- 🎨 **Modern Design** - Beautiful, responsive interface with sleek animations
- 🌙 **Dark Theme** - Elegant dark mode for a premium feel
- 📱 **Fully Responsive** - Perfect display on all devices (mobile, tablet, desktop)
- 📧 **Contact Form** - Integrated EmailJS for hassle-free messaging
- 🗺️ **Google Maps Integration** - Custom styled dark map showing location
- 📄 **CV Download** - Direct resume/CV download functionality
- 🔗 **Social Media Links** - Stylish, animated social media connections
- 📊 **Projects Showcase** - Elegant display of portfolio projects
- 🎬 **Smooth Animations** - Subtle, professional animations and transitions
- 🔥 **3D Effects** - Modern 3D hover effects and interactions

## 🚀 Quick Start

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/namanrathi8830/Rofolio.git
   cd Rofolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your EmailJS credentials:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. Add your CV/Resume to the public assets folder:
   ```
   public/assets/Naman_Rathi_CV.pdf
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` folder.

## 🌐 Deployment

This project is optimized for deployment on Vercel:

1. Push your code to a GitHub repository
2. Sign up on [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Configure settings and deploy
5. Connect your custom domain (rofolio.site)

## 📂 Project Structure

```
Rofolio/
├── public/              # Static assets
│   └── assets/          # CV and other resources
├── src/                 # Source code
│   ├── components/      # React components
│   │   ├── About.tsx    
│   │   ├── Contact.tsx  
│   │   ├── Home.tsx     
│   │   ├── Projects.tsx 
│   │   └── ...
│   ├── lib/             # Utility libraries
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## 🎨 Customization

To customize this portfolio for your own use:

1. Update personal information in the component files
2. Replace the Google Maps location in `Contact.tsx`
3. Add your own CV/Resume to the assets folder
4. Modify the projects section with your own work
5. Customize colors in the CSS/Tailwind configuration

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Naman Rathi - [LinkedIn](https://www.linkedin.com/in/naman-rathi-269503214) - 1rn22cd049.namanmangilalrathi@gmail.com

---

<div align="center">
  <p>⭐ If you found this project helpful, please consider giving it a star! ⭐</p>
  <p>Built with ❤️ by Naman Rathi</p>
</div>
