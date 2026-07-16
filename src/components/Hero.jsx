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
                        <span>Boot successful</span>
                    </div>
                    <div className="status-bubble info">
                        <span>✓</span>
                        <span>Disponible pour de nouveaux projets</span>
                    </div>
                </div>
                <span className="subtitle">Technicien informatique </span>
                <h1 className="title">
                    {text.slice(0, splitIndex)}
                    {text.length > splitIndex && (
                        <span className="gradient-text">{text.slice(splitIndex)}</span>
                    )}
                    {text.length < fullText.length && <span className="cursor">|</span>}
                </h1>
                <p className="description">
                    Passionné de hardware, je prends plaisir à réparer, démonter, remonter et réutiliser des ordinateurs fixes. J’aime mettre les mains dans le matériel, comprendre les pannes et trouver des solutions concrètes pour donner une nouvelle utilité aux machines.
                </p>
            </div>
        </section>
    );
};

export default Hero;
