import React from 'react';
import { Phone, Navigation } from 'lucide-react';
import { WhatsAppIcon, InstagramIcon } from './Icons';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Navbar({ onOpenGallery, onReplayIntro }) {
  const openWhatsApp = () => {
    const text = encodeURIComponent('Merhaba Sarmacı Faruk! Antep usulü sarma ve lezzetleriniz hakkında bilgi almak / sipariş vermek istiyorum.');
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <header className="header-navbar single-screen-navbar">
      {/* 1. Main Navigation Bar (Logo on left, 4 Action Buttons on right) */}
      <div className="nav-main-container nav-fullwidth-container">
        {/* Brand Logo & Name */}
        <div
          className="nav-brand"
          onClick={onReplayIntro}
          style={{ cursor: 'pointer' }}
          title="3D Logo Açılışını Yeniden Başlat"
        >
          <img
            src="/images/logo_badge.jpg"
            alt="Sarmacı Faruk Gaziantep"
            className="brand-logo-img"
          />
          <div className="brand-text">
            <span className="brand-title">SARMACI FARUK</span>
            <span className="brand-tagline">GAZİANTEP</span>
          </div>
        </div>

        {/* Action Buttons: Instagram, Konum, WhatsApp, Arama */}
        <div className="nav-actions">
          {/* 1. Instagram Button */}
          <a
            href={RESTAURANT_INFO.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="brand-action-pill pill-instagram nav-action-btn"
            title="Instagram: @sarmacifaruk"
          >
            <InstagramIcon size={17} color="#fff" />
            <span className="pill-text-desktop">Instagram</span>
          </a>

          {/* 2. Konum / Harita Button */}
          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="brand-action-pill pill-location nav-action-btn"
            title="Google Haritalar Yol Tarifi"
          >
            <Navigation size={16} />
            <span className="pill-text-desktop">Konum</span>
          </a>

          {/* 3. WhatsApp Direct Button */}
          <button
            className="brand-action-pill pill-whatsapp nav-action-btn"
            onClick={openWhatsApp}
            title="WhatsApp ile İletişim / Sipariş"
          >
            <WhatsAppIcon size={17} color="#fff" />
            <span className="pill-text-desktop">WhatsApp</span>
          </button>

          {/* 4. Arama / Telefon Button */}
          <a
            href={RESTAURANT_INFO.phoneTel}
            className="brand-action-pill pill-phone nav-action-btn"
            title="Hemen Ara: 0530 257 49 09"
          >
            <Phone size={16} />
            <span className="pill-text-desktop">Telefon</span>
          </a>
        </div>
      </div>

      {/* 2. Red Hours Animated Marquee Bar (Moving ticker under logo & navbar) */}
      <div className="nav-hours-marquee-bar sub-navbar-bar">
        <div className="hours-marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="hours-marquee-content">
              <span>⏰ AKTİF ÇALIŞMA SAATLERİ: SABAH 06:00 — GECE 03:00</span>
              <span className="hours-dot-sep">✦</span>
              <span>🔥 HER GÜN AÇIK: 06:00 — 03:00</span>
              <span className="hours-dot-sep">✦</span>
              <span>⏰ SABAH 06:00'DAN GECE 03:00'E KADAR KESİNTİSİZ AÇIĞIZ</span>
              <span className="hours-dot-sep">✦</span>
              <span>🌙 GECE 03:00'E KADAR SICAK DÜRÜM & SARMA SERVİSİ</span>
              <span className="hours-dot-sep">✦</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
