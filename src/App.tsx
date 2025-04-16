import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";
// Uncomment the CustomCursor import since we'll have an OpenAI API key configured
import CustomCursor from "./components/CustomCursor";
import FallbackPage from "./components/FallbackPage";

// Lazy load components for better performance
const Home = lazy(() => import("./components/home"));
const RoboFallback = lazy(() => import("./components/RoboFallback"));
const Contact = lazy(() => import("./components/Contact"));
const TestPage = lazy(() => import("./components/TestPage"));

// For now, we're using fallback components for pages that rely on HTML files
// because they're not being correctly processed in the Vercel deployment
// const AboutMe = lazy(() => import("./components/AboutMe"));
// const SkillsAndServices = lazy(() => import("./components/SkillsAndServices"));
// const Projects = lazy(() => import("./components/Projects"));
// const Portfolio = lazy(() => import("./components/Portfolio"));
// const Blog = lazy(() => import("./components/Blog.tsx"));
// const Testimonials = lazy(() => import("./components/Testimonials"));

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
          <Route path="/about" element={<FallbackPage title="About Me" />} />
          <Route path="/skills" element={<FallbackPage title="Skills & Services" />} />
          <Route path="/projects" element={<FallbackPage title="Projects" />} />
          <Route path="/portfolio" element={<FallbackPage title="Portfolio" />} />
          <Route path="/blog" element={<FallbackPage title="Blog" />} />
          <Route path="/testimonials" element={<FallbackPage title="Testimonials" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/fallback" element={<RoboFallback />} />
          <Route path="/test" element={<TestPage />} />
          {/* Catch-all route for 404 errors */}
          <Route path="*" element={<FallbackPage title="Page Not Found" />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
