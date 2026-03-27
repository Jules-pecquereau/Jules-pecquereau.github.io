import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Background3D = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const particleCount = 450;
        const maxConnectionDistance = 3.5;

        const positions = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let i = 0; i < particleCount; i++) {
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            const r = 20 * Math.cbrt(Math.random());

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);     
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta); 
            positions[i * 3 + 2] = r * Math.cos(phi);                   

            velocities.push({
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            });
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particleMaterial = new THREE.PointsMaterial({
            color: 0x38bdf8,
            size: 0.15,
            transparent: true,
            opacity: 0.6
        });

        const particles = new THREE.Points(geometry, particleMaterial);
        scene.add(particles);

        const linesGeometry = new THREE.BufferGeometry();
        const linesMaterial = new THREE.LineBasicMaterial({
            color: 0x818cf8,
            transparent: true,
            opacity: 0.15
        });
        const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
        scene.add(linesMesh);

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) * 0.005;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.005;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        let animationFrameId;

        function updateLines(positions) {
            const linePositions = [];
            const distSqThreshold = maxConnectionDistance * maxConnectionDistance;
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

        function animate() {
            animationFrameId = requestAnimationFrame(animate);

            targetX = mouseX * 2;
            targetY = mouseY * 2;
            camera.position.x += (targetX - camera.position.x) * 0.02;
            camera.position.y += (-targetY - camera.position.y) * 0.02;
            camera.lookAt(scene.position);

            particles.rotation.y += 0.001;
            particles.rotation.x += 0.0005;
            linesMesh.rotation.y += 0.001;
            linesMesh.rotation.x += 0.0005;

            const positions = particles.geometry.attributes.position.array;

            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] += velocities[i].x;
                positions[i * 3 + 1] += velocities[i].y;
                positions[i * 3 + 2] += velocities[i].z;

                if (Math.abs(positions[i * 3]) > 25) velocities[i].x *= -1;
                if (Math.abs(positions[i * 3 + 1]) > 25) velocities[i].y *= -1;
                if (Math.abs(positions[i * 3 + 2]) > 25) velocities[i].z *= -1;
            }
            particles.geometry.attributes.position.needsUpdate = true;

            updateLines(positions);
            renderer.render(scene, camera);
        }

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            
            geometry.dispose();
            particleMaterial.dispose();
            linesGeometry.dispose();
            linesMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return <canvas id="bg-canvas" ref={canvasRef}></canvas>;
};

export default Background3D;
