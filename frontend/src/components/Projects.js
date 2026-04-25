import React, { useEffect, useState } from 'react';
import { buildApiUrl } from '../api';
import '../styles/Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/projects'));
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        console.log('[Projects DEBUG] fetched projects:', data.length);
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <section className="projects"><p>Loading projects...</p></section>;
  if (error) return <section className="projects"><p>Error: {error}</p></section>;

  return (
    <section className="projects">
      <div className="projects-container">
        <h2 className="section-title">My Projects</h2>
        
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project._id} className="project-card">
              {project.image && (
                <img src={project.image} alt={project.title} className="project-image" />
              )}
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                {project.technologies && project.technologies.length > 0 && (
                  <div className="project-tech">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                )}
                
                <div className="project-links">
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-link">
                      GitHub
                    </a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-link">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
