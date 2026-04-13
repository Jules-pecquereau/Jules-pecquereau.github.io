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
