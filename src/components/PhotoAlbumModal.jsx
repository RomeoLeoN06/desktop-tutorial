import React, { useState, useEffect } from 'react';
import { X, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { SLIDESHOW_IMAGES } from '../data/menuData';

export default function PhotoAlbumModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const nextPhoto = (e) => {
    if (e) e.stopPropagation();
    setActivePhotoIdx((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
  };

  const prevPhoto = (e) => {
    if (e) e.stopPropagation();
    setActivePhotoIdx((prev) => (prev - 1 + SLIDESHOW_IMAGES.length) % SLIDESHOW_IMAGES.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const current = SLIDESHOW_IMAGES[activePhotoIdx];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card album-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="album-modal-header">
          <div className="d-flex align-center gap-2">
            <Camera size={20} className="text-gold" />
            <h3 className="album-title">Faruk Usta Canlı Mutfak & Lezzet Albümü</h3>
            <span className="album-badge">{activePhotoIdx + 1} / {SLIDESHOW_IMAGES.length}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Kapat">
            <X size={20} />
          </button>
        </div>

        {/* Main Photo Showcase View - Uniform Size and Full Frame */}
        <div className="album-main-stage">
          <button className="album-nav-arrow arrow-left" onClick={prevPhoto} aria-label="Önceki">
            <ChevronLeft size={28} />
          </button>

          <div className="album-img-wrapper">
            {/* Ambient Blurred Background of same image */}
            <div
              className="album-ambient-backdrop"
              style={{ backgroundImage: `url(${current.url})` }}
            />
            {/* Main Vibrant Photo (Object-fit cover, uniform width & height) */}
            <img
              key={current.url}
              src={current.url}
              alt={current.title}
              className="album-main-img fade-in-soft"
            />
            <div className="album-img-caption">
              <h4>{current.title}</h4>
              <p>{current.subtitle}</p>
            </div>
          </div>

          <button className="album-nav-arrow arrow-right" onClick={nextPhoto} aria-label="Sonraki">
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Thumbnail Filmstrip */}
        <div className="album-filmstrip">
          {SLIDESHOW_IMAGES.map((item, idx) => (
            <div
              key={idx}
              className={`filmstrip-thumb ${idx === activePhotoIdx ? 'active' : ''}`}
              onClick={() => setActivePhotoIdx(idx)}
            >
              <img src={item.url} alt={item.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
