import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';

const Projects = () => {
    return (
        <section id="projects" className="section">
            <div className="section-header fade-in">
                <h2>Projets</h2>
                <div className="line"></div>
            </div>

            <div className="projects-grid">
                {projectsData.map((project, index) => (
                    <div className="project-card fade-in" key={project.id} style={{ transitionDelay: `${index * 0.1}s` }}>
                        <div className="project-image">
                            <img src={project.coverImage} alt={project.title} />
                        </div>
                        <div className="project-content">
                            <span className="project-year">{project.year}</span>
                            <h3>{project.title}</h3>
                            <p>{project.shortDescription}</p>
                            <div className="tech-stack">
                                {project.techStack.map(tech => (
                                    <span key={tech}>{tech}</span>
                                ))}
                            </div>
                            <div className="project-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <Link to={`/projet/${project.id}`} className="glow-link">En savoir plus</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
