import React, { useEffect } from 'react';

const Skills = () => {
    useEffect(() => {
        const skillBars = document.querySelectorAll('.skill-bar-fill');
        const skillOptions = { threshold: 0.5 };
        const animateSkillBars = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const bar = entry.target;
                const percent = bar.getAttribute('data-percent');
                bar.style.width = percent + '%';
                observer.unobserve(bar);
            });
        }, skillOptions);

        skillBars.forEach(bar => animateSkillBars.observe(bar));

        return () => {
            skillBars.forEach(bar => animateSkillBars.unobserve(bar));
        };
    }, []);

    return (
        <section id="skills" className="section">
            <div className="section-header fade-in">
                <h2>Mes Compétences</h2>
                <div className="line"></div>
            </div>

            <div className="skills-container fade-in">
                <div className="skill-category">
                    <div className="skill-icon"></div>
                    <h3>Frontend</h3>
                    <p className="skill-desc">Création d'interfaces réactives et d'expériences riches.</p>
                    <div className="skills-list">
                        <div className="skill-item">
                            <div className="skill-info">
                                <span>HTML5 / CSS3</span>
                                <span className="skill-percentage">100%</span>
                            </div>
                            <div className="skill-bar-bg">
                                <div className="skill-bar-fill" data-percent="90"></div>
                            </div>
                        </div>
                        <div className="skill-item">
                            <div className="skill-info">
                                <span>JavaScript (ES6+)</span>
                                <span className="skill-percentage">85%</span>
                            </div>
                            <div className="skill-bar-bg">
                                <div className="skill-bar-fill" data-percent="85"></div>
                            </div>
                        </div>

                        <div className="skill-item">
                            <div className="skill-info">
                                <span>UI/UX Design</span>
                                <span className="skill-percentage">80%</span>
                            </div>
                            <div className="skill-bar-bg">
                                <div className="skill-bar-fill" data-percent="80"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="skill-category" style={{ transitionDelay: '0.1s' }}>
                    <div className="skill-icon"></div>
                    <h3>Backend</h3>
                    <p className="skill-desc">Développement d'architectures robustes et sécurisées.</p>
                    <div className="skills-list">
                        <div className="skill-item">
                            <div className="skill-info">
                                <span>PHP</span>
                                <span className="skill-percentage">85%</span>
                            </div>
                            <div className="skill-bar-bg">
                                <div className="skill-bar-fill" data-percent="85"></div>
                            </div>
                        </div>
                        <div className="skill-item">
                            <div className="skill-info">
                                <span>Laravel</span>
                                <span className="skill-percentage">80%</span>
                            </div>
                            <div className="skill-bar-bg">
                                <div className="skill-bar-fill" data-percent="80"></div>
                            </div>
                        </div>
                        <div className="skill-item">
                            <div className="skill-info">
                                <span>MySQL</span>
                                <span className="skill-percentage">90%</span>
                            </div>
                            <div className="skill-bar-bg">
                                <div className="skill-bar-fill" data-percent="90"></div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="skill-category" style={{ transitionDelay: '0.2s' }}>
                    <div className="skill-icon"></div>
                    <h3>Outils & Process</h3>
                    <p className="skill-desc">Gestion de projet et déploiement continu.</p>
                    <div className="skills-list">
                        <div className="skill-item">
                            <div className="skill-info">
                                <span>Git / GitHub</span>
                                <span className="skill-percentage">80%</span>
                            </div>
                            <div className="skill-bar-bg">
                                <div className="skill-bar-fill" data-percent="80"></div>
                            </div>
                        </div>
                        <div className="skill-item">
                            <div className="skill-info">
                                <span>Sécurité Web</span>
                                <span className="skill-percentage">70%</span>
                            </div>
                            <div className="skill-bar-bg">
                                <div className="skill-bar-fill" data-percent="70"></div>
                            </div>
                        </div>
                        <div className="skill-item">
                            <div className="skill-info">
                                <span>Méthodes Agiles</span>
                                <span className="skill-percentage">70%</span>
                            </div>
                            <div className="skill-bar-bg">
                                <div className="skill-bar-fill" data-percent="70"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
