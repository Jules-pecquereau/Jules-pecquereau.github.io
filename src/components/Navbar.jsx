import React from 'react';

const Navbar = () => {
    const handleScroll = (e, targetId) => {
        e.preventDefault();
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className="navbar">
            <div className="logo">Jules.</div>
            <ul className="nav-links">
                <li><a href="#home" onClick={(e) => handleScroll(e, '#home')}>Accueil</a></li>
                <li><a href="#projects" onClick={(e) => handleScroll(e, '#projects')}>Projets</a></li>
                <li><a href="#skills" onClick={(e) => handleScroll(e, '#skills')}>Compétences</a></li>
                <li><a href="#contact" onClick={(e) => handleScroll(e, '#contact')}>Contact</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
