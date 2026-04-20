import React, { useState, useEffect } from 'react';

const Hero = () => {
    const [text, setText] = useState("");
    const fullText = "Créer des expériences web mémorables.";
    const splitIndex = 26; // Index after "Créer des expériences web "

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            index++;
            setText(fullText.slice(0, index));
            if (index >= fullText.length) {
                clearInterval(intervalId);
            }
        }, 50);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <section id="home" className="hero section">
            <div className="hero-content fade-in">
                <div className="status-bubbles-container">
                    <div className="status-bubble success">
                        <span>✓</span>
                        <span>Build successful</span>
                    </div>
                    <div className="status-bubble info">
                        <span>✓</span>
                        <span>Disponible pour de nouveaux projets</span>
                    </div>
                </div>
                <span className="subtitle">Développeur Web & Fullstack</span>
                <h1 className="title">
                    {text.slice(0, splitIndex)}
                    {text.length > splitIndex && (
                        <span className="gradient-text">{text.slice(splitIndex)}</span>
                    )}
                    {text.length < fullText.length && <span className="cursor">|</span>}
                </h1>
                <p className="description">
                    Je conçois et développe des applications web modernes, performantes et esthétiquement plaisantes avec une attention particulière aux détails des interface Utilisateur et l'expérience Utilisateur.
                </p>
                <div className="hero-cta">
                    <a href="#projects" className="btn btn-primary">Voir mon travail</a>
                    <a href="#contact" className="btn btn-secondary">Me contacter</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
