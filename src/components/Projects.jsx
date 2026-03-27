import React from 'react';

const Projects = () => {
    return (
        <section id="projects" className="section">
            <div className="section-header fade-in">
                <h2>Projets</h2>
                <div className="line"></div>
            </div>

            <div className="projects-grid">
                <div className="project-card fade-in">
                    <div className="project-image">
                        <img src="/images/e6-projet.png" alt="Aperçu Projet E6 Proxy Produit" />
                    </div>
                    <div className="project-content">
                        <span className="project-year">2026</span>
                        <h3>E6 - Projet de fin d'année</h3>
                        <p>Création d'un site marchand pour la vente de produit locaux de la région de Loire Atlantique.</p>
                        <div className="tech-stack">
                            <span>PHP</span><span>Laravel</span><span>C#</span>
                        </div>
                        <a href="https://github.com/Jules-pecquereau/site_marchand-stage" target="_blank" rel="noopener noreferrer" className="glow-link">Voir sur GitHub ➔</a>
                    </div>
                </div>

                <div className="project-card fade-in" style={{ transitionDelay: '0.1s' }}>
                    <div className="project-image">
                        <img src="/images/clinique-medicale.png" alt="Aperçu Clinique Médicale" />
                    </div>
                    <div className="project-content">
                        <span className="project-year">2025</span>
                        <h3>Clinique Médicale</h3>
                        <p>Espace de gestion médicale complet : suivi des patients, création d'ordonnances et historique de consultations.</p>
                        <div className="tech-stack">
                            <span>HTML5</span><span>PHP</span><span>SQL</span>
                        </div>
                        <a href="https://github.com/Jules-pecquereau/exercice-clinique-medicale" className="glow-link" target="_blank" rel="noopener noreferrer">Voir sur GitHub ➔</a>
                    </div>
                </div>

                <div className="project-card fade-in" style={{ transitionDelay: '0.2s' }}>
                    <div className="project-image">
                        <img src="/images/calc-enfant.png" alt="Calculatrice Enfant" />
                    </div>
                    <div className="project-content">
                        <span className="project-year">2024</span>
                        <h3>Application Calculatrice Pour enfant</h3>
                        <p>Avec des fonctionnalités comme la connexion, des challenges ludiques, une interface adaptée.</p>
                        <div className="tech-stack">
                            <span>HTML5</span><span>CSS3</span><span>JS Vanilla</span>
                        </div>
                        <a href="https://github.com/Jules-pecquereau/projet-appli-enfant-" target="_blank" rel="noopener noreferrer" className="glow-link">Voir sur GitHub ➔</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
