import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particle system 1: Glowing Embers (Red/Orange/Gold)
    const emberCount = 120;
    const emberGeometry = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    const emberVelocities = [];
    const emberScales = new Float32Array(emberCount);
    const emberColors = new Float32Array(emberCount * 3);

    const goldColor = new THREE.Color(0xf59e0b);
    const emberColor = new THREE.Color(0xe63946);
    const copperColor = new THREE.Color(0xf4a261);

    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 60;
      emberPositions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      emberVelocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: 0.03 + Math.random() * 0.05,
        z: (Math.random() - 0.5) * 0.02,
        rotSpeed: (Math.random() - 0.5) * 0.03
      });

      emberScales[i] = Math.random() * 0.8 + 0.3;

      // Color variation between gold, copper and ember crimson
      const cChoice = Math.random();
      let picked = goldColor;
      if (cChoice < 0.4) picked = emberColor;
      else if (cChoice < 0.7) picked = copperColor;

      emberColors[i * 3] = picked.r;
      emberColors[i * 3 + 1] = picked.g;
      emberColors[i * 3 + 2] = picked.b;
    }

    emberGeometry.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
    emberGeometry.setAttribute('color', new THREE.BufferAttribute(emberColors, 3));

    // Simple smooth round particle texture using canvas
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(255,220,150,0.8)');
    grad.addColorStop(0.7, 'rgba(230,57,70,0.4)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    const emberMaterial = new THREE.PointsMaterial({
      size: 1.2,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false
    });

    const emberPoints = new THREE.Points(emberGeometry, emberMaterial);
    scene.add(emberPoints);

    // Particle system 2: Floating Gaziantep Spice Dust & Cumin Seeds
    const spiceCount = 80;
    const spiceGeometry = new THREE.BufferGeometry();
    const spicePositions = new Float32Array(spiceCount * 3);
    const spiceVelocities = [];

    for (let i = 0; i < spiceCount; i++) {
      spicePositions[i * 3] = (Math.random() - 0.5) * 50;
      spicePositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      spicePositions[i * 3 + 2] = (Math.random() - 0.5) * 25;

      spiceVelocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: -0.01 - Math.random() * 0.02,
        z: (Math.random() - 0.5) * 0.015
      });
    }

    spiceGeometry.setAttribute('position', new THREE.BufferAttribute(spicePositions, 3));
    const spiceMaterial = new THREE.PointsMaterial({
      size: 0.6,
      color: 0xdfa050,
      transparent: true,
      opacity: 0.45,
      depthWrite: false
    });

    const spicePoints = new THREE.Points(spiceGeometry, spiceMaterial);
    scene.add(spicePoints);

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth camera parallax
      targetX += (mouseX * 2.5 - targetX) * 0.05;
      targetY += (-mouseY * 2.5 - targetY) * 0.05;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Animate embers rising up
      const pos = emberGeometry.attributes.position.array;
      for (let i = 0; i < emberCount; i++) {
        pos[i * 3 + 1] += emberVelocities[i].y;
        pos[i * 3] += Math.sin(Date.now() * 0.001 + i) * 0.01;

        // Reset if too high
        if (pos[i * 3 + 1] > 25) {
          pos[i * 3 + 1] = -25;
          pos[i * 3] = (Math.random() - 0.5) * 50;
        }
      }
      emberGeometry.attributes.position.needsUpdate = true;

      // Animate spice particles
      const sPos = spiceGeometry.attributes.position.array;
      for (let i = 0; i < spiceCount; i++) {
        sPos[i * 3 + 1] += spiceVelocities[i].y;
        if (sPos[i * 3 + 1] < -20) {
          sPos[i * 3 + 1] = 20;
          sPos[i * 3] = (Math.random() - 0.5) * 50;
        }
      }
      spiceGeometry.attributes.position.needsUpdate = true;

      emberPoints.rotation.y += 0.0008;
      spicePoints.rotation.y -= 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      emberGeometry.dispose();
      emberMaterial.dispose();
      spiceGeometry.dispose();
      spiceMaterial.dispose();
      texture.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85
      }}
    />
  );
}
