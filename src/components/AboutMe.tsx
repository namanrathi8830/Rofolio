import { useState } from "react";
import { cn } from "../lib/utils";
import { Download, ChevronRight, Linkedin, Github } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon?: string;
}

interface TechItem {
  name: string;
  icon: string;
}

const AboutMe = () => {
  const [activeTab, setActiveTab] = useState<"bio" | "timeline" | "tech">(
    "bio",
  );

  const timelineItems: TimelineItem[] = [
    {
      year: "08/2024 - 10/2024",
      title: "Data Analytics Intern at Unified Mentors",
      description:
        "Successfully completed a 2-month internship focused on data analytics and visualization across three projects: Amazon Sales Insights (improved business recommendations by 15%), AtliQ Hospitality Analysis (optimized operations by 20%), and FIFA World Cup Analysis (predicted potential winners with 85% accuracy). Enhanced client reporting speed by 30% through advanced Tableau dashboards.",
    },
    {
      year: "2024",
      title: "Hackathon Project - Celestial Body Recognition",
      description:
        "Led a team at Amrita Vishwa Vidyapeetham to build an advanced image recognition system categorizing stars, nebulae, galaxies, and planets using YOLOv9. Achieved 81% accuracy and improved model performance by 10% through iterative hyperparameter tuning.",
    },
    {
      year: "2022 - Present",
      title: "Student at RNSIT",
      description:
        "Contributed to 5+ real-world projects including data visualization dashboards and AI solutions. Currently developing a BookMyShow-inspired Houseparty app with dynamic event posting, boosting user interaction by 40%.",
    },
    {
      year: "12/2022 - 12/2026",
      title: "B.Tech in Computer Science (Data Science)",
      description:
        "Pursuing degree at RNS Institute of Technology, Bengaluru, Karnataka.",
    },
    {
      year: "2022",
      title: "Academic Achievements",
      description:
        "JEE Mains: 94.14 percentile. MHTCET: 99.04 percentile, reflecting a strong academic foundation.",
    },
  ];

  const techStack: TechItem[] = [
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "Tableau",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tableau/tableau-original.svg",
    },
    {
      name: "Excel",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftoffice/microsoftoffice-plain.svg",
    },
    {
      name: "Pandas",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    },
    {
      name: "SQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
    {
      name: "YOLOv9",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Matplotlib",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-plain.svg",
    },
    {
      name: "Machine Learning",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
  ];

  return (
    <section
      id="about"
      className="w-full min-h-screen bg-background py-20 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          About Me
        </h2>

        {/* Introduction */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/3">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-muted shadow-xl">
              <img
                src="/images/naman-forest.jpg"
                alt="Naman in forest"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="bg-card rounded-2xl p-6 shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-2 text-primary">
                Naman Rathi
              </h3>
              <p className="text-lg font-medium mb-4 text-muted-foreground">
                Aspiring Data Scientist | Web Developer
              </p>
              <p className="italic text-muted-foreground mb-6">
                "Innovative and results-driven Computer Science student with a
                passion for harnessing data and AI to solve complex problems"
              </p>

              <div className="space-y-4">
                <p className="text-card-foreground">
                  With hands-on experience in building machine learning models
                  and full-stack web applications, I excel at delivering
                  data-driven solutions that drive measurable results.
                </p>
                <p className="text-card-foreground">
                  Key accomplishments include leading a hackathon project on
                  celestial body recognition, achieving 81% model efficiency,
                  and creating impactful dashboards that reduced analytics
                  turnaround time by 30%.
                </p>
                <p className="text-card-foreground">
                  I combine technical expertise in Python, React, TensorFlow,
                  and Tableau with a knack for collaborative problem-solving and
                  leadership.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
                  <span className="font-medium">Education:</span> B.Tech in CS
                  (Data Science)
                </div>
                <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
                  <span className="font-medium">Location:</span> Bengaluru,
                  Karnataka
                </div>
                <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
                  <span className="font-medium">University:</span> RNS Institute
                  of Technology
                </div>
                <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
                  <span className="font-medium">Email:</span>{" "}
                  1rn22cd049.namanmangilalrathi@gmail.com
                </div>
                <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
                  <span className="font-medium">Phone:</span> +91 8830634853
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <a
                  href="https://www.linkedin.com/in/naman-rathi-269503214/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#0077B5] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Linkedin size={18} />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/namanrathi8830"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#333] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Github size={18} />
                  GitHub
                </a>
                <a
                  href="/resume.pdf"
                  download="Naman_Rathi_Resume.pdf"
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Download size={18} />
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("bio")}
              className={cn(
                "px-4 py-2 font-medium",
                activeTab === "bio"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground",
              )}
            >
              Professional Bio
            </button>
            <button
              onClick={() => setActiveTab("timeline")}
              className={cn(
                "px-4 py-2 font-medium",
                activeTab === "timeline"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground",
              )}
            >
              Career Timeline
            </button>
            <button
              onClick={() => setActiveTab("tech")}
              className={cn(
                "px-4 py-2 font-medium",
                activeTab === "tech"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground",
              )}
            >
              Tech Stack
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {/* Bio Content */}
          {activeTab === "bio" && (
            <div className="bg-card rounded-xl p-6 shadow-md">
              <h3 className="text-2xl font-bold mb-6">My Journey</h3>
              <div className="space-y-4">
                <p>
                  Currently pursuing a B.Tech in Computer Science with a
                  specialization in Data Science at RNS Institute of Technology
                  (2022-2026), I am passionate about leveraging technology to
                  solve real-world problems.
                </p>
                <p>
                  My academic journey has been marked by achievements such as
                  scoring in the 94.14 percentile in JEE Mains and 99.04
                  percentile in MHTCET, demonstrating my strong foundation in
                  technical concepts.
                </p>
                <p>
                  As a Data Analytics Intern at Unified Mentors (August-October
                  2024), I successfully completed projects across three domains:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="font-medium">Amazon Sales Insights:</span>{" "}
                    Conducted market analysis to identify sales trends,
                    improving business recommendations by 15%.
                  </li>
                  <li>
                    <span className="font-medium">
                      AtliQ Hospitality Analysis:
                    </span>{" "}
                    Built interactive dashboards in Tableau, optimizing
                    operations by 20% through actionable insights.
                  </li>
                  <li>
                    <span className="font-medium">
                      FIFA World Cup Analysis:
                    </span>{" "}
                    Utilized Python and Pandas to analyze historical data,
                    predicting potential winners with 85% accuracy.
                  </li>
                </ul>
                <p>
                  I'm particularly proud of leading a hackathon project at
                  Amrita Vishwa Vidyapeetham - a Celestial Body Recognition
                  System using YOLOv9 that achieved 81% accuracy. We created an
                  end-to-end solution with a robust data pipeline, including
                  annotation, bounding box creation, and model evaluation,
                  improving model performance by 10% through iterative
                  hyperparameter tuning.
                </p>
                <p>
                  At RNSIT, I've contributed to 5+ real-world projects,
                  including data visualization dashboards and AI solutions. I'm
                  currently developing a BookMyShow-inspired Houseparty app with
                  dynamic event posting, boosting user interaction by 40%.
                </p>
                <p>
                  My key strengths include data modeling, problem-solving, and
                  collaboration. I'm skilled in creating and optimizing datasets
                  for machine learning models, overcoming technical challenges
                  to deliver innovative solutions with measurable impact, and
                  collaborating with cross-functional teams to meet deadlines
                  and exceed project goals.
                </p>
              </div>
            </div>
          )}

          {/* Timeline Content */}
          {activeTab === "timeline" && (
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-border"></div>

              {/* Timeline items */}
              <div className="space-y-12">
                {timelineItems.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                  >
                    {/* Dot on timeline */}
                    <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>

                    {/* Content */}
                    <div className="md:w-1/2 pl-8 md:pl-0 md:px-8">
                      <div className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                        <div className="text-sm font-bold text-primary mb-1">
                          {item.year}
                        </div>
                        <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Content */}
          {activeTab === "tech" && (
            <div className="bg-card rounded-xl p-6 shadow-md">
              <h3 className="text-2xl font-bold mb-6">Technologies & Tools</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 bg-background rounded-lg hover:shadow-md transition-shadow transform hover:-translate-y-1 duration-300"
                  >
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-16 h-16 mb-3"
                    />
                    <span className="font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <h4 className="text-xl font-bold mb-4">Additional Skills</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2">Data Science Tools</h5>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="w-24">Matplotlib</span>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24">YOLOv9</span>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: "80%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Visualization Tools</h5>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="w-24">Tableau</span>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: "90%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24">PowerBI</span>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
