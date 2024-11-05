// src/app/components/Projects.tsx
import { useEffect, useState } from "react";

interface Project {
  name: string;
  html_url: string;
  description: string;
  created_at: string;
  languages: Record<string, string>;
  topics: string[];
}

const languageColors: Record<string, string> = {
  JavaScript: "#f7df1e",
  CSS: "#264de4",
  HTML: "#e34c26",
  Python: "#3776ab",
  TypeScript: "#3178c6",
  Go: "#00ADD8",
  Rust: "#dea584",
  Templ: "#2a00a8",
};

export default function FocusProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/projects.json");
        const data = await response.json();
        setProjects(data.slice(0, 6)); // Limit to 6 projects
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    }
    fetchProjects();
  }, []);

  return (
    <section className="projects-container">
      <h2 className="projects-title">My Projects</h2>
      <div className="project-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3 className="project-name"><a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >{project.name}</a></h3>
            <p className="project-description">{project.description}</p>
            {/* Language Bar */}
            <div className="language-bar">
              {Object.entries(project.languages).map(([lang, perc], idx) => (
                <div
                  key={idx}
                  className="language-segment group"
                  style={{
                    width: perc,
                    backgroundColor: languageColors[lang] || "#cccccc",
                  }}
                >
                </div>
              ))}
            </div>
            <div className="project-topics">
              {project.topics.map((topic, idx) => (
                <span key={idx} className="project-topic">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}