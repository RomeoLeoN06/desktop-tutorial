import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function FixedFooter() {
  return (
    <footer className="fixed-docked-footer">
      {/* 1. Slogan Marquee Ticker Bar */}
      <div className="fixed-marquee-bar">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="marquee-content">
              <span>🌯 Antep Tava Dürüm</span>
              <span className="dot-sep">✦</span>
              <span>🍗 Tavuk Sote Dürüm</span>
              <span className="dot-sep">✦</span>
              <span>🔥 Tavuk Şiş</span>
              <span className="dot-sep">✦</span>
              <span>🌯 Sarma Tavuk Dürüm</span>
              <span className="dot-sep">✦</span>
              <span>🍲 Gaziantep Meşhur Nohut Dürüm</span>
              <span className="dot-sep">✦</span>
              <span>🥩 Antep Usulü Ciğer Kavurma Dürüm</span>
              <span className="dot-sep">✦</span>
              <span>🌶️ Antep Usulü Çiğ Köfte Dürüm</span>
              <span className="dot-sep">✦</span>
              <span>🍟 Karışık Kızartma Dürüm</span>
              <span className="dot-sep">✦</span>
              <span>🥤 Buz Gibi Soğuk Ayran & İçecekler</span>
              <span className="dot-sep">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Bottom Address & Phone Only Strip (Fits Perfectly on All Screen Sizes) */}
      <div className="fixed-info-strip">
        <div className="container fixed-info-container">
          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed-address-item strip-address-link"
            title="Google Haritalar'da Aç (Karagöz, Karahoca Sokak No: 21, Gaziantep)"
          >
            <MapPin size={14} className="text-crimson shrink-0" />
            <span className="strip-address-text">{RESTAURANT_INFO.address}</span>
          </a>

          <a
            href={RESTAURANT_INFO.phoneTel}
            className="fixed-contact-item strip-phone-link"
            title="Telefonla Hemen Ara: 0530 257 49 09"
          >
            <Phone size={14} className="text-gold shrink-0" />
            <span className="strip-phone-text">{RESTAURANT_INFO.phoneFormatted}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
