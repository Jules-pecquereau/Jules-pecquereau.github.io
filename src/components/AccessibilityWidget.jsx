import React, { useState, useEffect } from 'react';

const AccessibilityWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [highContrast, setHighContrast] = useState(false);
    const [largeText, setLargeText] = useState(false);

    useEffect(() => {
        if (highContrast) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
    }, [highContrast]);

    useEffect(() => {
        if (largeText) {
            document.body.classList.add('large-text');
        } else {
            document.body.classList.remove('large-text');
        }
    }, [largeText]);

    return (
        <div className={`a11y-widget ${isOpen ? 'open' : ''}`}>
            <button 
                className="a11y-toggle" 
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Menu d'accessibilité"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                    <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
                </svg>
            </button>
            
            <div className="a11y-menu-container">
                {isOpen && (
                    <div className="a11y-menu fade-in appear">
                        <h3>Accessibilité</h3>
                        <p className="a11y-desc">Ajustez les paramètres pour une meilleure lisibilité.</p>
                        
                        <div className="a11y-option">
                            <label className="switch-label">
                                <span className="switch-text">Contraste Élevé</span>
                                <div className="switch">
                                    <input 
                                        type="checkbox" 
                                        checked={highContrast} 
                                        onChange={() => setHighContrast(!highContrast)} 
                                        aria-label="Activer le contraste élevé"
                                    />
                                    <span className="slider round"></span>
                                </div>
                            </label>
                        </div>

                        <div className="a11y-option">
                            <label className="switch-label">
                                <span className="switch-text">Aggrandir le texte</span>
                                <div className="switch">
                                    <input 
                                        type="checkbox" 
                                        checked={largeText} 
                                        onChange={() => setLargeText(!largeText)} 
                                        aria-label="Agrandir la taille du texte"
                                    />
                                    <span className="slider round"></span>
                                </div>
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccessibilityWidget;
