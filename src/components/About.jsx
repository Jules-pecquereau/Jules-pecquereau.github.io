import React from 'react';

const About = () => {
    return (
        <section id="about" className="section">
            <div className="section-header fade-in">
                <h2>À Propos de Moi</h2>
                <div className="line"></div>
            </div>

            <div className="about-container fade-in">
                <div className="about-image">
                    {/* Espace réservé pour la future photo */}
                    <div className="image-placeholder">
                        <span>Photo à venir</span>
                    </div>
                </div>
                <div className="about-text">
                    <h3>Salut, moi c'est Jules</h3>
                    <p>
                        Actuellement étudiant, mon parcours a commencé par l'obtention d'un <strong>BAC STI2D option SIN</strong>. J'ai ensuite poursuivi mes études vers un <strong>BTS SIO option SLAM</strong>.
                    </p>
                    <p>
                        Au fil de ma formation axée sur le développement, j'ai réalisé que le code n'était pas ma véritable vocation. Mon objectif est d'ailleurs très clair : je souhaite arrêter après mon BTS pour m'orienter vers le métier de <strong>technicien informatique</strong>, un domaine qui correspond pleinement à mes envies !
                    </p>
                    <p>
                        En dehors des cours et de l'informatique, je suis un grand passionné de <strong>jeux vidéo</strong>, ce qui occupe une bonne partie de mon temps libre.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
