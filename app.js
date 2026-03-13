document.addEventListener("DOMContentLoaded", () => {
    // 1. Apparition fluide au défilement (Intersection Observer)
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            // Ajoute la classe qui déclenche l'animation CSS
            entry.target.classList.add('appear');
            // Arrête d'observer une fois apparu
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 2. Défilement doux (Smooth Scroll) pour la navigation
    document.querySelectorAll('.nav-links a, .hero-cta a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Petit effet parallax sur les blobs de fond en fonction du scroll
    const blobs = document.querySelectorAll('.blob-bg');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        blobs.forEach((blob, index) => {
            // Le premier blob descend, le deuxième remonte légèrement
            const direction = index === 0 ? 1 : -1;
            const speed = 0.1;
            blob.style.transform = `translateY(${scrollY * speed * direction}px)`;
        });
    });

    // 4. Initialisation du fond Particle 3D (Three.js)
    if (typeof THREE !== 'undefined') {
        initThreeJsBackground();
    }
});

function initThreeJsBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Paramètres
    const particleCount = 450;
    const maxConnectionDistance = 3.5;

    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    // Sphère d'apparition des points
    for (let i = 0; i < particleCount; i++) {
        // Position aléatoire dans une sphère
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = 20 * Math.cbrt(Math.random());

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);     // x
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta); // y
        positions[i * 3 + 2] = r * Math.cos(phi);                   // z

        // Vitesse
        velocities.push({
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
        });
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Matériau pour les points (bleu ciel pour coller au thème glassmorphism)
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.15,
        transparent: true,
        opacity: 0.6
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // Préparation des lignes
    const linesGeometry = new THREE.BufferGeometry();
    const linesMaterial = new THREE.LineBasicMaterial({
        color: 0x818cf8,
        transparent: true,
        opacity: 0.15
    });
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // Suivi de la souris pour un léger effet parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.005;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.005;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Boucle d'animation
    function animate() {
        requestAnimationFrame(animate);

        // Parallax caméra
        targetX = mouseX * 2;
        targetY = mouseY * 2;
        camera.position.x += (targetX - camera.position.x) * 0.02;
        camera.position.y += (-targetY - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        // Rotation lente de toute la scène
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;
        linesMesh.rotation.y += 0.001;
        linesMesh.rotation.x += 0.0005;

        // Mouvement indépendant des particules
        const positions = particles.geometry.attributes.position.array;

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] += velocities[i].x;
            positions[i * 3 + 1] += velocities[i].y;
            positions[i * 3 + 2] += velocities[i].z;

            // Rebondit si ça sort de la zone de 25
            if (Math.abs(positions[i * 3]) > 25) velocities[i].x *= -1;
            if (Math.abs(positions[i * 3 + 1]) > 25) velocities[i].y *= -1;
            if (Math.abs(positions[i * 3 + 2]) > 25) velocities[i].z *= -1;
        }
        particles.geometry.attributes.position.needsUpdate = true;

        // Mise à jour des lignes de connexion
        updateLines(positions);

        renderer.render(scene, camera);
    }

    function updateLines(positions) {
        const linePositions = [];
        const distSqThreshold = maxConnectionDistance * maxConnectionDistance;

        // Optimisation : on ne checke pas tous les couples (O(N^2)) mais une fenêtre proche (O(N*k))
        const neighborsCheck = 15;

        for (let i = 0; i < particleCount; i++) {
            for (let j = 1; j <= neighborsCheck; j++) {
                const otherIdx = (i + j) % particleCount;

                const dx = positions[i * 3] - positions[otherIdx * 3];
                const dy = positions[i * 3 + 1] - positions[otherIdx * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[otherIdx * 3 + 2];

                if ((dx * dx + dy * dy + dz * dz) < distSqThreshold) {
                    linePositions.push(
                        positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                        positions[otherIdx * 3], positions[otherIdx * 3 + 1], positions[otherIdx * 3 + 2]
                    );
                }
            }
        }

        linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    }

    animate();
}
