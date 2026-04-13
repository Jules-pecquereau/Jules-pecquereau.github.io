import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Gestion du scroll au chargement si on arrive avec un hash sur la page d'accueil
    useEffect(() => {
        if (location.pathname === '/' && location.hash) {
            setTimeout(() => {
                const targetElement = document.querySelector(location.hash);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

    const handleScroll = (e, targetId) => {
        e.preventDefault();

        if (location.pathname !== '/') {
            // Si on n'est pas sur l'accueil, on redirige vers l'accueil + hash
            navigate('/' + targetId);
            return;
        }

        // Si on est déjà sur l'accueil, on scrolle
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
            <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Jules Pecquereau.</div>
            <ul className="nav-links">
                <li><a href="#home" onClick={(e) => handleScroll(e, '#home')}>Accueil</a></li>
                <li><a href="#projects" onClick={(e) => handleScroll(e, '#projects')}>Projets</a></li>
                <li><a href="#skills" onClick={(e) => handleScroll(e, '#skills')}>Compétences</a></li>
                <li><a href="#veille" onClick={(e) => handleScroll(e, '#veille')}>Veille Tech</a></li>
                <li><a href="#contact" onClick={(e) => handleScroll(e, '#contact')}>Contact</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
