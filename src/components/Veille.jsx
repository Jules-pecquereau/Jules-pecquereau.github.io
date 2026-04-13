import React from 'react';

const Veille = () => {
    return (
        <section id="veille" className="section">
            <div className="section-header fade-in">
                <h2>Veille Technologique</h2>
                <div className="line"></div>
            </div>
            
            <div className="timeline-container fade-in">
                <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                        <span className="timeline-date">Flux Quotidiens</span>
                        <h3>Réseaux & Agrégateurs</h3>
                        <p>Je consulte quotidiennement ces plateformes pour suivre l'actualité tech en temps réel, découvrir des outils émergents et échanger avec la communauté.</p>
                        <div className="tech-stack">
                            <span>Daily.dev</span>
                            <span>LinkedIn</span>
                            <span>Twitter / X</span>
                            <span>Reddit</span>
                        </div>
                    </div>
                </div>
                
                <div className="timeline-item" style={{ transitionDelay: `0.1s` }}>
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                        <span className="timeline-date">Creuser un sujet</span>
                        <h3>Articles & Blogs Spécialisés</h3>
                        <p>Pour approfondir mes connaissances sur des langages (React, PHP) ou des concepts spécifiques (Architecture, Bonnes pratiques), je m'appuie sur des articles rédigés par d'autres développeurs et sur la documentation officielle.</p>
                        <div className="tech-stack">
                            <span>Medium</span>
                            <span>Dev.to</span>
                            <span>CSS-Tricks</span>
                            <span>MDN Web Docs</span>
                        </div>
                    </div>
                </div>

                <div className="timeline-item" style={{ transitionDelay: `0.2s` }}>
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                        <span className="timeline-date">Formats Longs</span>
                        <h3>Vidéos & Podcasts</h3>
                        <p>Afin de découvrir des frameworks, écouter des retours d'expérience en entreprise ou suivre des tutoriels techniques, le format vidéo/audio est idéal pour moi.</p>
                        <div className="tech-stack">
                            <span>YouTube</span>
                            <span>Twitch</span>
                            <span>Podcasts Tech</span>
                            <span>Discord</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Veille;
