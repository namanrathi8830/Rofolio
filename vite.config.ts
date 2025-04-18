import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "development" ? "/" : process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
  },
  plugins: [
    react(),
    tempo(),
    basicSsl()
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@model": "/Users/namanrathi946/Rofolio/node_modules/tempo-model/dist",
    },
  },
  server: {
    host: '0.0.0.0',
    https: {
      // You can also provide specific keys/certs if needed
    },
  },
  assetsInclude: ['**/*.HTML'],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        aboutMe: path.resolve(__dirname, 'src/components/AboutMe.HTML'),
        blog: path.resolve(__dirname, 'src/components/Blog.HTML'),
        testimonials: path.resolve(__dirname, 'src/components/Testimonials.HTML'),
        skillsAndServices: path.resolve(__dirname, 'src/components/SkillsAndServices.HTML'),
        projects: path.resolve(__dirname, 'src/components/Projects.HTML'),
      },
    },
  },
});
