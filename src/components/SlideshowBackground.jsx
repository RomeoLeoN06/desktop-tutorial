import React, { useState, useEffect } from 'react';
import { SLIDESHOW_IMAGES } from '../data/menuData';

export default function SlideshowBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 2800); // 2.8 seconds transition as requested (2-3 seconds)

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slideshow-container">
      {/* Background Authentic Photos with Smooth Crossfade */}
      {SLIDESHOW_IMAGES.map((img, idx) => (
        <div
          key={idx}
          className={`slideshow-slide ${idx === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${img.url})` }}
        />
      ))}

      {/* Atmospheric Gradients & Texture */}
      <div className="slideshow-overlay-gradient"></div>
      <div className="slideshow-vignette"></div>
    </div>
  );
}
