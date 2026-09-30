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
              <span>🌯 GAZİANTEP NOHUT SARMA</span>
              <span className="dot-sep">✦</span>
              <span>🍗 ÖZEL SOSLU TAVUK SARMA</span>
              <span className="dot-sep">✦</span>
              <span>🔥 MEŞE KÖZÜNDE TAVUK ŞİŞ</span>
              <span className="dot-sep">✦</span>
              <span>🥩 SACDA CIZBIZ CİĞER KAVURMA SARMA</span>
              <span className="dot-sep">✦</span>
              <span>🥘 ANTEP USULÜ TAVA SARMA</span>
              <span className="dot-sep">✦</span>
              <span>🌯 TAVUK SOTE DÜRÜM</span>
              <span className="dot-sep">✦</span>
              <span>🌶️ ANTEP USULÜ ÇİĞ KÖFTE DÜRÜM</span>
              <span className="dot-sep">✦</span>
              <span>🍟 KARIŞIK KIZARTMA DÜRÜM</span>
              <span className="dot-sep">✦</span>
              <span>🥤 BUZ GİBİ YAYIK AYRAN & İÇECEKLER</span>
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
            rel="noreferrer"
            className="fixed-address-item strip-address-link"
            title="Google Haritalar'da Aç (Karagöz, Karahoca Sok. No:21)"
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
