import React, { useState } from 'react';
import ThreeCanvas from './components/ThreeCanvas';
import SlideshowBackground from './components/SlideshowBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FixedFooter from './components/FixedFooter';
import PhotoAlbumModal from './components/PhotoAlbumModal';
import ProductsModal from './components/ProductsModal';
import LogoIntro3D from './components/LogoIntro3D';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [hasIntroPlayed, setHasIntroPlayed] = useState(false);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [isProductsModalOpen, setIsProductsModalOpen] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setHasIntroPlayed(true);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  return (
    <>
      {/* 0. 3D Animated Logo Opening Sequence */}
      {showIntro && (
        <LogoIntro3D onComplete={handleIntroComplete} />
      )}

      {/* Main Single-Screen Homepage Viewport */}
      <div className={`sarmaci-single-screen ${hasIntroPlayed ? 'homepage-enter' : ''}`}>
        {/* 1. Dynamic Auto-Transitioning Background Slideshow */}
        <SlideshowBackground onOpenGallery={() => setIsAlbumModalOpen(true)} />

        {/* 2. Three.js Floating 3D Embers & Spices Canvas */}
        <ThreeCanvas />

        {/* 3. Header Navbar */}
        <Navbar
          onOpenGallery={() => setIsAlbumModalOpen(true)}
          onReplayIntro={handleReplayIntro}
        />

        {/* 4. Single-Screen Hero Viewport */}
        <main className="single-screen-main">
          <Hero
            onOpenGallery={() => setIsAlbumModalOpen(true)}
            onOpenProductsModal={() => setIsProductsModalOpen(true)}
          />
        </main>

        {/* 5. Fixed Bottom Docked Footer */}
        <FixedFooter
          onOpenGallery={() => setIsAlbumModalOpen(true)}
          onOpenProductsModal={() => setIsProductsModalOpen(true)}
        />

        {/* 6. Full Photo Album Modal */}
        <PhotoAlbumModal
          isOpen={isAlbumModalOpen}
          onClose={() => setIsAlbumModalOpen(false)}
        />

        {/* 7. Full-Screen Products & Menu Modal */}
        <ProductsModal
          isOpen={isProductsModalOpen}
          onClose={() => setIsProductsModalOpen(false)}
        />
      </div>
    </>
  );
}
