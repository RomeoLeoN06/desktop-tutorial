import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, ArrowRight, Volume2, VolumeX, Flame } from 'lucide-react';

export default function LogoIntro3D({ onComplete }) {
  const mountRef = useRef(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Gaziantep ateşi harlanıyor...');
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef(null);

  // Play subtle luxury golden chime with Web Audio API
  const playChime = () => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Chord frequencies: C5, E5, G5, B5, C6 (Luxury golden shimmer)
      const freqs = [523.25, 659.25, 783.99, 987.77, 1046.5];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.06 / (idx + 1), ctx.currentTime + idx * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 1.3);
      });
    } catch {
      // Audio autoplay policy fail-safe
    }
  };

  const handleFinish = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete?.();
    }, 850);
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // --- THREE.JS SCENE SETUP ---
    const container = mountRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // --- RESPONSIVE CAMERA ADAPTATION ---
    let currentAspect = width / height;
    const adjustCamera = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth || window.innerWidth;
      const h = mountRef.current.clientHeight || window.innerHeight;
      const aspect = w / h;
      currentAspect = aspect;
      camera.aspect = aspect;

      // Target bounding half-width: coin (radius 2.75) + outer ring (radius 3.52) + safety margin
      const targetHalfWidth = 4.2;
      const halfFovRad = THREE.MathUtils.degToRad(camera.fov / 2);
      const zForWidth = targetHalfWidth / (Math.tan(halfFovRad) * aspect);
      const baseZ = 13.5;

      // Distance adjusts dynamically so rings NEVER clip on narrow / portrait screens
      camera.position.z = Math.min(24, Math.max(baseZ, zForWidth));

      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    adjustCamera();

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xfff3e0, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffd166, 3.2);
    keyLight.position.set(6, 8, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xe63946, 2.5);
    rimLight.position.set(-7, -5, -4);
    scene.add(rimLight);

    const glintLight = new THREE.PointLight(0xfffae0, 2.8, 25);
    glintLight.position.set(0, 4, 6);
    scene.add(glintLight);

    // --- 3D MEDALLION / LOGO BADGE GROUP ---
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // Initial transform
    logoGroup.position.set(0, 0.4, -18);
    logoGroup.scale.set(0.1, 0.1, 0.1);
    logoGroup.rotation.set(-0.8, -Math.PI * 2.5, 0.4);

    // Texture Loader for Logo
    const textureLoader = new THREE.TextureLoader();
    const logoTex = textureLoader.load('./images/logo_badge.jpg');
    logoTex.colorSpace = THREE.SRGBColorSpace;

    // Materials
    const goldRimMaterial = new THREE.MeshStandardMaterial({
      color: 0xe5a93c,
      metalness: 0.92,
      roughness: 0.22,
      emissive: 0x4a2e05,
      emissiveIntensity: 0.25
    });

    const goldBackMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f140e,
      metalness: 0.85,
      roughness: 0.35
    });

    const frontFaceMaterial = new THREE.MeshStandardMaterial({
      map: logoTex,
      metalness: 0.15,
      roughness: 0.35,
      emissive: 0xffffff,
      emissiveIntensity: 0.08
    });

    const coinRadius = 2.75;
    const coinThickness = 0.35;

    // 1. Cylinder Base & Rim
    const coinBaseGeo = new THREE.CylinderGeometry(coinRadius, coinRadius, coinThickness, 64);
    coinBaseGeo.rotateX(Math.PI / 2);
    const coinBaseMesh = new THREE.Mesh(coinBaseGeo, goldRimMaterial);
    logoGroup.add(coinBaseMesh);

    // 2. Front Face
    const frontFaceGeo = new THREE.CircleGeometry(coinRadius * 0.985, 64);
    const frontFaceMesh = new THREE.Mesh(frontFaceGeo, frontFaceMaterial);
    frontFaceMesh.position.z = coinThickness / 2 + 0.005;
    logoGroup.add(frontFaceMesh);

    // 3. Back Face
    const backFaceGeo = new THREE.CircleGeometry(coinRadius * 0.985, 64);
    backFaceGeo.rotateY(Math.PI);
    const backFaceMesh = new THREE.Mesh(backFaceGeo, goldBackMaterial);
    backFaceMesh.position.z = -coinThickness / 2 - 0.005;
    logoGroup.add(backFaceMesh);

    // 4. Outer Beveled Gold Torus Trim
    const outerTorusGeo = new THREE.TorusGeometry(coinRadius, 0.08, 16, 64);
    const outerTorusMesh = new THREE.Mesh(outerTorusGeo, goldRimMaterial);
    outerTorusMesh.position.z = coinThickness / 2;
    logoGroup.add(outerTorusMesh);

    // 5. Back Torus Trim
    const backTorusMesh = new THREE.Mesh(outerTorusGeo, goldRimMaterial);
    backTorusMesh.position.z = -coinThickness / 2;
    logoGroup.add(backTorusMesh);

    // --- COHESIVE ORBITING HALO RINGS (Grouped with Logo) ---
    const haloGroup = new THREE.Group();
    scene.add(haloGroup);
    haloGroup.position.copy(logoGroup.position);
    haloGroup.scale.copy(logoGroup.scale);

    // Ring 1 (Gold tight orbit)
    const halo1Geo = new THREE.TorusGeometry(coinRadius * 1.15, 0.028, 16, 100);
    const halo1Mat = new THREE.MeshBasicMaterial({
      color: 0xffb703,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const halo1Mesh = new THREE.Mesh(halo1Geo, halo1Mat);
    halo1Mesh.rotation.x = Math.PI / 3;
    halo1Mesh.rotation.y = Math.PI / 6;
    haloGroup.add(halo1Mesh);

    // Ring 2 (Ember Crimson tight orbit)
    const halo2Geo = new THREE.TorusGeometry(coinRadius * 1.28, 0.02, 16, 100);
    const halo2Mat = new THREE.MeshBasicMaterial({
      color: 0xe63946,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const halo2Mesh = new THREE.Mesh(halo2Geo, halo2Mat);
    halo2Mesh.rotation.x = -Math.PI / 4;
    halo2Mesh.rotation.y = -Math.PI / 5;
    haloGroup.add(halo2Mesh);

    // --- SWIRLING GOLDEN EMBER PARTICLES ---
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    const pColor1 = new THREE.Color(0xffd166);
    const pColor2 = new THREE.Color(0xe63946);
    const pColor3 = new THREE.Color(0xff9f1c);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 6.5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 7;

      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = height;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

      particleVelocities.push({
        angle,
        radius,
        speed: 0.008 + Math.random() * 0.015,
        ySpeed: (Math.random() - 0.5) * 0.01,
        y: height
      });

      const choice = Math.random();
      const col = choice < 0.5 ? pColor1 : choice < 0.8 ? pColor3 : pColor2;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    pGrad.addColorStop(0, 'rgba(255,255,255,1)');
    pGrad.addColorStop(0.3, 'rgba(255,220,120,0.85)');
    pGrad.addColorStop(0.6, 'rgba(230,57,70,0.3)');
    pGrad.addColorStop(1, 'rgba(0,0,0,0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 64, 64);
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.7,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false
    });

    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // --- MOUSE & TILT INTERACTION ---
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX = x;
      mouseY = y;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const x = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        const y = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
        mouseX = x;
        mouseY = y;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', adjustCamera);

    // --- ANIMATION CHOREOGRAPHY ---
    let animId;
    let startTime = null;
    let chimePlayed = false;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;

      animId = requestAnimationFrame(animate);

      // In portrait/narrow window, raise badge to upper section to prevent overlap with bottom typography
      const targetBaseY = currentAspect < 0.9 ? 1.05 : 0.35;

      // 1. Stage 0.0s - 1.4s: Swoop-in fly from deep 3D space with spin
      if (elapsed < 1.4) {
        const t = elapsed / 1.4;
        const ease = 1 - Math.pow(1 - t, 3);

        logoGroup.position.z = -18 + 18 * ease;
        logoGroup.position.y = targetBaseY * ease;

        const targetScale = THREE.MathUtils.lerp(0.1, 1.0, ease);
        logoGroup.scale.set(targetScale, targetScale, targetScale);
        haloGroup.scale.set(targetScale, targetScale, targetScale);

        logoGroup.rotation.y = -Math.PI * 2.5 * (1 - ease);
        logoGroup.rotation.x = -0.8 * (1 - ease);
        logoGroup.rotation.z = 0.4 * (1 - ease);

        setProgress(Math.min(45, Math.round(t * 45)));
      } else {
        if (!chimePlayed) {
          chimePlayed = true;
          playChime();
        }

        // 2. Stage 1.4s - 3.2s: Gentle 3D floating & cursor tilt interaction
        const floatY = Math.sin((elapsed - 1.4) * 2.2) * 0.12;
        logoGroup.position.y = targetBaseY + floatY;
        logoGroup.position.z = 0;
        haloGroup.scale.set(1, 1, 1);

        targetRotY = mouseX * 0.42;
        targetRotX = -mouseY * 0.32;
        logoGroup.rotation.y += (targetRotY - logoGroup.rotation.y) * 0.08;
        logoGroup.rotation.x += (targetRotX - logoGroup.rotation.x) * 0.08;
        logoGroup.rotation.z = Math.sin((elapsed - 1.4) * 1.5) * 0.03;

        const p2 = Math.min(100, Math.round(45 + ((elapsed - 1.4) / 1.8) * 55));
        setProgress(p2);

        if (elapsed > 1.4 && elapsed < 2.2) {
          setStatusText('Gaziantep Karagöz lezzeti...');
        } else if (elapsed >= 2.2 && elapsed < 3.2) {
          setStatusText('Antep usulü sarmalar ve fırın hazır!');
        }
      }

      // Sync halo rings group with logo position
      haloGroup.position.copy(logoGroup.position);

      // 3. Stage 3.4s: Automatic transition to homepage
      if (elapsed >= 3.4 && !isFadingOut) {
        handleFinish();
      }

      // Orbiting lights & rings
      glintLight.position.x = Math.sin(elapsed * 2) * 5;
      glintLight.position.y = Math.cos(elapsed * 2) * 4 + 2;

      halo1Mesh.rotation.z += 0.012;
      halo2Mesh.rotation.z -= 0.009;

      // Swirling particles
      const positions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const vel = particleVelocities[i];
        vel.angle += vel.speed;
        vel.y += vel.ySpeed;

        if (vel.y > 4.5) vel.y = -4.5;
        if (vel.y < -4.5) vel.y = 4.5;

        positions[i * 3] = Math.cos(vel.angle) * vel.radius;
        positions[i * 3 + 1] = vel.y + targetBaseY;
        positions[i * 3 + 2] = Math.sin(vel.angle) * vel.radius;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', adjustCamera);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      coinBaseGeo.dispose();
      frontFaceGeo.dispose();
      backFaceGeo.dispose();
      outerTorusGeo.dispose();
      halo1Geo.dispose();
      halo2Geo.dispose();
      particleGeo.dispose();

      goldRimMaterial.dispose();
      goldBackMaterial.dispose();
      frontFaceMaterial.dispose();
      halo1Mat.dispose();
      halo2Mat.dispose();
      particleMat.dispose();

      logoTex.dispose();
      pTexture.dispose();
    };
  }, [isMuted]);

  return (
    <div
      className={`logo-intro-overlay ${isFadingOut ? 'intro-fade-out' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'radial-gradient(ellipse at center, #1f110c 0%, #0d0705 60%, #050302 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        overflow: 'hidden',
        pointerEvents: isFadingOut ? 'none' : 'auto',
        transition: 'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), filter 0.85s ease'
      }}
    >
      {/* 3D Canvas Background Container */}
      <div
        ref={mountRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'auto',
          cursor: 'grab'
        }}
      />

      {/* Top Bar with Audio & Skip Action */}
      <div className="intro-top-bar">
        <button
          className="intro-sound-btn"
          onClick={() => setIsMuted((m) => !m)}
          title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
          aria-label="Ses Kontrolü"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <button
          className="intro-skip-btn"
          onClick={handleFinish}
          title="Doğrudan Anasayfaya Geç"
        >
          <span>Hemen Başla</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Center Cinematic Typography & Brand Reveal */}
      <div className="intro-brand-meta">
        <div className="intro-badge-pill">
          <Flame size={14} className="text-crimson" />
          <span>GAZİANTEP</span>
          <Sparkles size={14} className="text-gold" />
        </div>

        <h1 className="intro-brand-title">SARMACI FARUK</h1>

        <p className="intro-brand-subtitle">
          Sarmacı Faruk Antep Usulü Sarmacı Afiyet Olsun
        </p>

        {/* Dynamic Progress Indicator */}
        <div className="intro-progress-box">
          <div className="intro-progress-bar-bg">
            <div
              className="intro-progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="intro-status-text">
            <span>{statusText}</span>
            <span className="intro-percent font-mono">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
