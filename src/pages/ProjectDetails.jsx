import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        // Défilement vers le haut au chargement de la page
        window.scrollTo(0, 0);
        
        const foundProject = projectsData.find(p => p.id === id);
        setProject(foundProject);
    }, [id]);

    if (!project) {
        return (
            <div id="ui-layer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
                <h2>Projet introuvable</h2>
                <Link to="/" className="glow-link" style={{ marginTop: '20px' }}>Retour à l'accueil</Link>
            </div>
        );
    }

    return (
        <div id="ui-layer" className="project-details-page">
            <div className="blob-bg"></div>
            <div className="blob-bg blob-2"></div>
            
            <nav className="details-nav">
                <Link to="/" className="back-link">
                    <span className="arrow">←</span> Retour
                </Link>
            </nav>

            <main className="details-container fade-in appear">
                <header className="details-header">
                    <span className="project-year">{project.year}</span>
                    <h1 className="glow-text">{project.title}</h1>
                    <div className="tech-stack" style={{ justifyContent: 'center', marginTop: '1rem' }}>
                        {project.techStack.map(tech => (
                            <span key={tech}>{tech}</span>
                        ))}
                    </div>
                </header>

                <div className="details-image fade-in appear">
                    <img src={project.coverImage} alt={project.title} />
                </div>

                <div className="details-content bento-layout">
                    <section className="details-section bento-context Glass-panel fade-in appear">
                        <h2>Contexte</h2>
                        <p>{project.context}</p>
                    </section>

                    <section className="details-section bento-objectives Glass-panel fade-in appear" style={{ transitionDelay: '0.1s' }}>
                        <h2>Objectifs</h2>
                        <ul>
                            {project.objectives.map((obj, i) => (
                                <li key={i}>{obj}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="details-section bento-environment Glass-panel fade-in appear" style={{ transitionDelay: '0.2s' }}>
                        <h2>Environnement & Outils</h2>
                        <p>{project.environment}</p>
                    </section>

                    <section className="details-section bento-skills Glass-panel fade-in appear" style={{ transitionDelay: '0.3s' }}>
                        <h2>Compétences développées</h2>
                        <div className="skills-tags">
                            {project.skills.map((skill, i) => (
                                <span key={i} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </section>

                    {project.additionalInfo && (
                        <section className="details-section bento-extra Glass-panel fade-in appear" style={{ transitionDelay: '0.4s' }}>
                            <h2>Autre</h2>
                            <p>{project.additionalInfo}</p>
                        </section>
                    )}

                    {project.documents && project.documents.length > 0 && (
                        <section className="details-section bento-documents Glass-panel fade-in appear" style={{ transitionDelay: '0.5s' }}>
                            <h2>Documentation</h2>
                            <div className="documents-links" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                                {project.documents.map((doc, i) => (
                                    <a key={i} href={doc.url} target="_blank" rel="noopener noreferrer" className="action-btn" style={{ padding: '8px 15px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                        {doc.name}
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="details-footer fade-in appear">
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="action-btn">
                        Voir le code <span className="arrow">➔</span>
                    </a>
                </div>
            </main>
        </div>
    );
};

export default ProjectDetails;
