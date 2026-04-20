import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Veille from '../components/Veille';
import Contact from '../components/Contact';

const Home = () => {
  useEffect(() => {
    const faders = document.querySelectorAll('.fade-in:not(.appear)');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    const blobs = document.querySelectorAll('.blob-bg');
    const handleScroll = () => {
        const scrollY = window.scrollY;
        blobs.forEach((blob, index) => {
            const direction = index === 0 ? 1 : -1;
            const speed = 0.1;
            blob.style.transform = `translateY(${scrollY * speed * direction}px)`;
        });
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
        faders.forEach(fader => appearOnScroll.unobserve(fader));
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="ui-layer">
        <div className="blob-bg"></div>
        <div className="blob-bg blob-2"></div>
        <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Veille />
            <Contact />
        </main>
    </div>
  );
};

export default Home;
