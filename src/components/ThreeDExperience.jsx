import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Flame, Sparkles, Layers, Eye, RotateCw, ZoomIn, Info, Check, ShieldCheck, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const DISH_3D_MODELS = [
  {
    id: 'nohut',
    title: 'Gaziantep Nohut Sarma',
    subtitle: 'UNESCO Gastronomi Şehri Tescilli Sokak Tacı',
    image: './images/nohut_durum.jpg',
    color: 0xdf9a3f,
    spiceRating: '3/5 (Acılı Antep)',
    cookTime: '8 Saat Kemik Suyu',
    layers: [
      { name: 'Çıtır Taş Fırın Lavaş', desc: 'Odun ateşinde anında açılan tırnaklı mayasız lavaş' },
      { name: 'Tane Nohut Dolgusu', desc: 'Kemik suyunda liflerine kadar yumuşatılmış Antep nohudunun özü' },
      { name: 'Taze Çekilmiş Baharatlar', desc: 'Acı pul biber, hakiki kimyon, sumak ve kaya tuzu' },
      { name: 'Yeşillik & Piyaz Katmanı', desc: 'Taze maydanoz, ince kıyım mor soğan ve taze nane' }
    ],
    facts: [
      'Günde 600+ sarımla Gaziantep’in sabah klasiği',
      'Tamamen bitkisel protein ve sıfır trans yağ',
      'Faruk Usta’nın 1971’den beri uyguladığı özel kimyon reçetesi'
    ]
  },
  {
    id: 'tavuk',
    title: 'Özel Soslu Tavuk Sarma',
    subtitle: '24 Saat Meşe Odunu Terbiyeli Lokum Lezzet',
    image: './images/tavuk_durum.jpg',
    color: 0xd95d39,
    spiceRating: '2/5 (Köz Biberli)',
    cookTime: 'Odun Ateşi Köz',
    layers: [
      { name: 'Közde Isınmış Çift Lavaş', desc: 'Tavuğun yağıyla lezzetlendirilmiş köz kokulu tırnak lavaş' },
      { name: 'Marine Tavuk But Parçaları', desc: 'Zeytinyağı, kapya biber salçası ve sarımsakla 24 saat bekletilmiş et' },
      { name: 'Közlenmiş Antep Biberi', desc: 'Doğrudan közden alınan çıtır ve tatlı acılı biber dilimleri' },
      { name: 'Faruk Usta Özel Sosu', desc: 'Kekik, yoğurt ve kurutulmuş sumakla zenginleştirilmiş gizli sos' }
    ],
    facts: [
      'Yalnızca taze günlük tavuk butu kullanılır',
      'Izgarada meşe odunu isi ile mühürlenir',
      'İçi sulu, dışı çıtır dokusuyla parmak ısırtır'
    ]
  },
  {
    id: 'ciger',
    title: 'Közde Ciğer Kavurma Sarma',
    subtitle: 'Zırhtan Çıkan Günlük Taze Kuzu Ciğeri',
    image: './images/ciger_durum.jpg',
    color: 0x9e2a2b,
    spiceRating: '4/5 (Antep Harareti)',
    cookTime: 'Yüksek Ateş Sac',
    layers: [
      { name: 'Tırnaklı İnce Lavaş', desc: 'Sıcak sacın buharında yumuşayan efsanevi sarım' },
      { name: 'Kavrulmuş Kuzu Ciğeri', desc: 'Kuyruk yağı ile cızbız kavrulan taptaze kuzu ciğeri küpleri' },
      { name: 'Sumaklı Maydanoz Piyazı', desc: 'Ciğerin lezzetini dengeleyen asit ve ferahlık patlaması' },
      { name: 'Köz Acı Biber & Kimyon', desc: 'Ciğer kavurmanın olmazsa olmazı acı Antep toz biberi' }
    ],
    facts: [
      'Gaziantep kasaplarından her sabah saat 06:00’da temin edilir',
      'Asla bekletilmez, sipariş anında sacda pişirilir',
      'Bakır maşrapada soğuk yayık ayranla efsane eşleşme'
    ]
  }
];

export default function ThreeDExperience({ onSelectDish }) {
  const [selectedDishIndex, setSelectedDishIndex] = useState(0);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const canvasMountRef = useRef(null);
  const sceneRef = useRef(null);
  const meshGroupRef = useRef(null);

  const currentDish = DISH_3D_MODELS[selectedDishIndex];

  useEffect(() => {
    if (!canvasMountRef.current) return;

    // Dimensions
    const width = canvasMountRef.current.clientWidth;
    const height = canvasMountRef.current.clientHeight || 450;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3, 8.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    canvasMountRef.current.innerHTML = '';
    canvasMountRef.current.appendChild(renderer.domElement);

    // Group for the 3D model
    const group = new THREE.Group();
    meshGroupRef.current = group;
    scene.add(group);

    // Base Pedestal / Slate Platter
    const slateGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.28, 48);
    const slateMat = new THREE.MeshStandardMaterial({
      color: 0x181412,
      roughness: 0.8,
      metalness: 0.2
    });
    const slateMesh = new THREE.Mesh(slateGeo, slateMat);
    slateMesh.position.y = -1.2;
    slateMesh.receiveShadow = true;
    group.add(slateMesh);

    // Brass Rim Around Platter
    const rimGeo = new THREE.TorusGeometry(3.7, 0.08, 16, 64);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.3
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = -1.05;
    group.add(rimMesh);

    // Glowing Ember Ring beneath
    const glowRingGeo = new THREE.TorusGeometry(3.2, 0.03, 16, 64);
    const glowRingMat = new THREE.MeshBasicMaterial({
      color: currentDish.color,
      transparent: true,
      opacity: 0.6
    });
    const glowRing = new THREE.Mesh(glowRingGeo, glowRingMat);
    glowRing.rotation.x = Math.PI / 2;
    glowRing.position.y = -1.18;
    group.add(glowRing);

    // 3D Artistic Durum Representation (Cylinder with organic wraps)
    const durumGeo = new THREE.CylinderGeometry(0.85, 0.95, 4.4, 32);
    durumGeo.rotateZ(Math.PI / 2.3);
    const durumMat = new THREE.MeshStandardMaterial({
      color: 0xf5d6a7, // Toasted warm lavash color
      roughness: 0.85,
      metalness: 0.05
    });
    const durumMesh = new THREE.Mesh(durumGeo, durumMat);
    durumMesh.position.set(-0.3, 0.1, 0);
    durumMesh.castShadow = true;
    group.add(durumMesh);

    // Second cut half showing interior
    const cutGeo = new THREE.CylinderGeometry(0.82, 0.88, 2.8, 32);
    cutGeo.rotateZ(Math.PI / 3.4);
    const cutMat = new THREE.MeshStandardMaterial({
      color: 0xf3cca0,
      roughness: 0.85
    });
    const cutMesh = new THREE.Mesh(cutGeo, cutMat);
    cutMesh.position.set(1.4, 0.5, 0.4);
    cutMesh.castShadow = true;
    group.add(cutMesh);

    // Interior filling face (glowing with dish primary spice color)
    const fillingGeo = new THREE.CircleGeometry(0.8, 32);
    const fillingMat = new THREE.MeshStandardMaterial({
      color: currentDish.color,
      roughness: 0.6,
      metalness: 0.15
    });
    const fillingMesh = new THREE.Mesh(fillingGeo, fillingMat);
    fillingMesh.position.set(0.6, 1.25, 0.85);
    fillingMesh.rotation.x = -Math.PI / 4;
    fillingMesh.rotation.y = Math.PI / 4;
    group.add(fillingMesh);

    // Floating 3D Spice Orbs around the dish
    const spiceOrbs = [];
    const orbGeo = new THREE.SphereGeometry(0.12, 16, 16);
    for (let i = 0; i < 12; i++) {
      const orbColor = i % 3 === 0 ? 0xe63946 : (i % 3 === 1 ? 0xf59e0b : 0x52b788);
      const orbMat = new THREE.MeshStandardMaterial({
        color: orbColor,
        emissive: orbColor,
        emissiveIntensity: 0.3,
        roughness: 0.4
      });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      const angle = (i / 12) * Math.PI * 2;
      const radius = 2.2 + Math.random() * 0.8;
      orb.position.set(
        Math.cos(angle) * radius,
        -0.5 + Math.random() * 1.5,
        Math.sin(angle) * radius
      );
      orb.userData = {
        baseY: orb.position.y,
        speed: 1.5 + Math.random() * 2,
        offset: Math.random() * Math.PI * 2
      };
      group.add(orb);
      spiceOrbs.push(orb);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff3e0, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.4);
    keyLight.position.set(6, 10, 6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(currentDish.color, 3.5, 15);
    rimLight.position.set(-6, 4, -4);
    scene.add(rimLight);

    const warmFill = new THREE.PointLight(0xff9f1c, 2.0, 12);
    warmFill.position.set(3, -1, 4);
    scene.add(warmFill);

    // Interactive Drag Controls
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const domEl = renderer.domElement;

    const onPointerDown = (e) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onPointerMove = (e) => {
      if (!isDragging || !meshGroupRef.current) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      meshGroupRef.current.rotation.y += deltaX * 0.008;
      meshGroupRef.current.rotation.x = Math.max(-0.4, Math.min(0.4, meshGroupRef.current.rotation.x + deltaY * 0.004));

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Animation Loop
    let reqId;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (isRotating && !isDragging && meshGroupRef.current) {
        meshGroupRef.current.rotation.y += 0.006;
      }

      // Bobbing floating spice orbs
      spiceOrbs.forEach((orb) => {
        orb.position.y = orb.userData.baseY + Math.sin(elapsed * orb.userData.speed + orb.userData.offset) * 0.25;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!canvasMountRef.current) return;
      const newW = canvasMountRef.current.clientWidth;
      const newH = canvasMountRef.current.clientHeight || 450;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [selectedDishIndex, isRotating]);

  const handleCelebrateOrder = () => {
    setIsLiked(!isLiked);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#e63946', '#52b788', '#f3cca0']
    });
  };

  return (
    <section id="experience-3d" className="threed-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="badge-pill">
            <Sparkles size={16} className="text-gold" />
            <span>İnteraktif 3 Boyutlu Lezzet Laboratuvarı</span>
          </div>
          <h2 className="section-title">
            Faruk Usta’nın <span>3 Boyutlu Sarma Deneyimi</span>
          </h2>
          <p className="section-desc">
            Sarmamızın her katmanını, taş fırın çıtırlığını ve Gaziantep baharatlarının sırrını
            360 derece döndürerek 3 boyutlu olarak inceleyin.
          </p>
        </div>

        {/* Dish Switcher Tabs */}
        <div className="threed-dish-tabs">
          {DISH_3D_MODELS.map((dish, idx) => (
            <button
              key={dish.id}
              className={`dish-tab-btn ${selectedDishIndex === idx ? 'active' : ''}`}
              onClick={() => {
                setSelectedDishIndex(idx);
                setActiveLayerIndex(0);
              }}
            >
              <img src={dish.image} alt={dish.title} className="dish-tab-thumb" />
              <div className="dish-tab-text">
                <span className="dish-tab-name">{dish.title}</span>
                <span className="dish-tab-sub">{dish.spiceRating}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Main 3D Stage + Information Dashboard */}
        <div className="threed-grid">
          {/* 3D Interactive Turntable Viewport */}
          <div className="threed-viewport-card">
            {/* Viewport Control Bar */}
            <div className="viewport-overlay-top">
              <span className="live-status-pill">
                <span className="pulse-dot"></span> 3D Canlı Döner Platform
              </span>
              <div className="viewport-controls">
                <button
                  className={`vp-ctrl-btn ${isRotating ? 'active' : ''}`}
                  onClick={() => setIsRotating(!isRotating)}
                  title="Otomatik Dönüşü Aç/Kapat"
                >
                  <RotateCw size={18} className={isRotating ? 'spin-slow' : ''} />
                </button>
                <button
                  className={`vp-ctrl-btn ${isLiked ? 'liked' : ''}`}
                  onClick={handleCelebrateOrder}
                  title="Beğen"
                >
                  <Heart size={18} fill={isLiked ? '#e63946' : 'none'} color={isLiked ? '#e63946' : '#fff'} />
                </button>
              </div>
            </div>

            {/* Three.js Canvas Container */}
            <div ref={canvasMountRef} className="threed-canvas-box" />

            {/* Instruction tooltip */}
            <div className="viewport-overlay-bottom">
              <span className="drag-hint">
                <Eye size={16} /> 360° Çevirmek için sürükleyin & dokunun
              </span>
              <div className="dish-badge-overlay">
                <Flame size={16} className="text-crimson" />
                <span>{currentDish.cookTime}</span>
              </div>
            </div>
          </div>

          {/* Dish Anatomy & Flavor Breakdown Panel */}
          <div className="threed-info-panel">
            <div className="panel-header">
              <div className="d-flex justify-between align-center">
                <h3 className="panel-dish-title">{currentDish.title}</h3>
                <span className="panel-dish-spice">{currentDish.spiceRating}</span>
              </div>
              <p className="panel-dish-subtitle">{currentDish.subtitle}</p>
            </div>

            {/* Layer Dissection Accordion/Pills */}
            <div className="layers-box">
              <h4 className="layers-heading">
                <Layers size={18} className="text-gold" />
                <span>Anatomik Katmanlar & Lezzet Mimarisi</span>
              </h4>
              <div className="layers-list">
                {currentDish.layers.map((layer, index) => (
                  <div
                    key={index}
                    className={`layer-item ${activeLayerIndex === index ? 'active' : ''}`}
                    onClick={() => setActiveLayerIndex(index)}
                  >
                    <div className="layer-num">0{index + 1}</div>
                    <div className="layer-body">
                      <div className="layer-title">{layer.name}</div>
                      <div className="layer-desc">{layer.desc}</div>
                    </div>
                    {activeLayerIndex === index && (
                      <Check size={18} className="layer-check text-gold" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Faruk Usta Secrets & Facts */}
            <div className="facts-box">
              <h4 className="facts-heading">
                <ShieldCheck size={18} className="text-mint" />
                <span>Gaziantep Ustalık Sırrı</span>
              </h4>
              <ul className="facts-list">
                {currentDish.facts.map((fact, fIdx) => (
                  <li key={fIdx}>
                    <span className="fact-bullet">✦</span> {fact}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Bar */}
            <div className="panel-actions">
              <button
                className="btn btn-primary btn-block"
                onClick={() => onSelectDish && onSelectDish(currentDish.id)}
              >
                <Flame size={18} />
                <span>Bu Lezzeti Özelleştir & Sipariş Ver</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
