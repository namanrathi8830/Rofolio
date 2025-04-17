import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
  },
  plugins: [
    react(),
    tempo(),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
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
