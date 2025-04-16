import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";
// Uncomment the CustomCursor import since we'll have an OpenAI API key configured
import CustomCursor from "./components/CustomCursor";

// Lazy load components for better performance
const Home = lazy(() => import("./components/home"));
const RoboFallback = lazy(() => import("./components/RoboFallback"));
const AboutMe = lazy(() => import("./components/AboutMe"));
const SkillsAndServices = lazy(() => import("./components/SkillsAndServices"));
const Projects = lazy(() => import("./components/Projects"));
const Portfolio = lazy(() => import("./components/Portfolio"));
const Blog = lazy(() => import("./components/Blog.tsx"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Contact = lazy(() => import("./components/Contact"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center bg-white">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
          <p className="ml-4 text-lg font-medium text-primary">
            Loading Rofolio...
          </p>
        </div>
      }
    >
      <>
        {/* Uncomment CustomCursor since we now have a valid OpenAI API key */}
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/skills" element={<SkillsAndServices />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/fallback" element={<RoboFallback />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
