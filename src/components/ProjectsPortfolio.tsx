import { useState } from "react";
import { cn } from "../lib/utils";
import { ExternalLink, Github, ChevronRight, Filter } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: "web" | "mobile" | "ai" | "other";
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

const ProjectsPortfolio = () => {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "web" | "mobile" | "ai" | "other"
  >("all");
  const [sortBy, setSortBy] = useState<"featured" | "newest">("featured");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with product management, cart functionality, payment processing, and order tracking.",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      category: "web",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: 2,
      title: "AI Content Generator",
      description:
        "An AI-powered application that generates blog posts, social media content, and marketing copy based on user prompts.",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      technologies: ["React", "OpenAI API", "Node.js", "Express"],
      category: "ai",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: 3,
      title: "Fitness Tracking App",
      description:
        "A mobile application for tracking workouts, nutrition, and fitness progress with personalized recommendations.",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
      technologies: ["React Native", "Firebase", "Redux", "Chart.js"],
      category: "mobile",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false,
    },
    {
      id: 4,
      title: "Task Management Dashboard",
      description:
        "A comprehensive project management tool with task tracking, team collaboration, and progress visualization.",
      image:
        "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80",
      technologies: [
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Socket.io",
      ],
      category: "web",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: 5,
      title: "Real-time Chat Application",
      description:
        "A real-time messaging platform with private chats, group conversations, file sharing, and end-to-end encryption.",
      image:
        "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&q=80",
      technologies: ["React", "Firebase", "WebSockets", "Redux"],
      category: "web",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false,
    },
    {
      id: 6,
      title: "Smart Home Control System",
      description:
        "An IoT solution for controlling and monitoring smart home devices with voice commands and automation rules.",
      image:
        "https://images.unsplash.com/photo-1558002038-1055e2dae1d7?w=800&q=80",
      technologies: ["React", "Node.js", "MQTT", "Raspberry Pi", "AWS IoT"],
      category: "other",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
    },
  ];

  // Filter and sort projects
  const filteredProjects = projects
    .filter(
      (project) => activeFilter === "all" || project.category === activeFilter,
    )
    .sort((a, b) => {
      if (sortBy === "featured") {
        return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
      } else {
        // 'newest'
        return b.id - a.id;
      }
    });

  return (
    <section
      id="projects"
      className="w-full min-h-screen bg-background py-20 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Projects & Portfolio
        </h2>

        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeFilter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card hover:bg-card/80",
              )}
            >
              All Projects
            </button>
            <button
              onClick={() => setActiveFilter("web")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeFilter === "web"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card hover:bg-card/80",
              )}
            >
              Web Development
            </button>
            <button
              onClick={() => setActiveFilter("mobile")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeFilter === "mobile"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card hover:bg-card/80",
              )}
            >
              Mobile Apps
            </button>
            <button
              onClick={() => setActiveFilter("ai")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeFilter === "ai"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card hover:bg-card/80",
              )}
            >
              AI Projects
            </button>
            <button
              onClick={() => setActiveFilter("other")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeFilter === "other"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card hover:bg-card/80",
              )}
            >
              Other
            </button>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2 bg-card rounded-lg px-3 py-2">
            <Filter className="w-4 h-4" />
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "featured" | "newest")
              }
              className="bg-transparent border-none outline-none text-sm"
            >
              <option value="featured">Featured First</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {project.featured && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="bg-muted text-xs px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="bg-muted text-xs px-2 py-1 rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-sm font-medium text-primary flex items-center gap-1 hover:underline"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="flex gap-2">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">
                  {selectedProject.title}
                </h3>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-muted text-xs px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-muted-foreground mb-6">
                  {selectedProject.description}
                </p>

                {/* Project Details */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-3">Project Details</h4>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam in dui mauris. Vivamus hendrerit arcu sed erat
                    molestie vehicula. Sed auctor neque eu tellus rhoncus ut
                    eleifend nibh porttitor. Ut in nulla enim. Phasellus
                    molestie magna non est bibendum non venenatis nisl tempor.
                  </p>
                  <p>
                    Suspendisse in orci enim. Vivamus hendrerit arcu sed erat
                    molestie vehicula. Sed auctor neque eu tellus rhoncus ut
                    eleifend nibh porttitor.
                  </p>
                </div>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-3">Key Features</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Feature one with detailed explanation</li>
                    <li>Feature two with implementation details</li>
                    <li>Feature three showcasing technical expertise</li>
                    <li>Feature four highlighting user experience</li>
                    <li>Feature five demonstrating innovation</li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsPortfolio;
