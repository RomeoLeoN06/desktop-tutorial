import React, { useState } from 'react';
import { X, Flame, Check, Sparkles, Clock, Phone, Info } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { RESTAURANT_INFO } from '../data/menuData';

export default function ThreeDishViewerModal({ dish, onClose }) {
  if (!dish) return null;

  const [portionType, setPortionType] = useState('single'); // single, double, plate
  const [selectedSpice, setSelectedSpice] = useState(dish.spiciness || 2);
  const [specialNote, setSpecialNote] = useState('');
  const [tiltStyle, setTiltStyle] = useState({});

  let portionName = 'Standart Tek Lavaş';
  let finalPrice = dish.price;
  if (portionType === 'double') {
    portionName = 'Doyurucu Çift Lavaş';
    finalPrice += 30;
  } else if (portionType === 'plate') {
    portionName = 'Açık Porsiyon & Pide';
    finalPrice += 70;
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s ease-out'
    });
  };

  const handleWhatsAppContact = () => {
    const spiceText = selectedSpice === 0 ? 'Acısız' : `${selectedSpice}. Seviye Acılı`;
    let msg = `Merhaba Sarmacı Faruk! Menünüzdeki "${dish.name}" hakkında bilgi almak / sipariş vermek istiyorum.\n`;
    msg += `▫️ Porsiyon: ${portionName} (${finalPrice} ₺)\n`;
    msg += `▫️ Acılık: ${spiceText}\n`;
    if (specialNote) msg += `▫️ Özel Not: ${specialNote}\n`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encoded}`, '_blank');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card modal-3d" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Kapat">
          <X size={22} />
        </button>

        <div className="modal-body-grid">
          {/* Left Column: 3D Tilt Product Showcase */}
          <div className="modal-image-showcase">
            <div
              className="modal-3d-tilt-frame"
              style={tiltStyle}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img src={dish.image} alt={dish.name} className="modal-hero-img" />
              <div className="tilt-glare-effect"></div>
              
              <div className="modal-badges-top">
                <span className="badge-flame">
                  <Flame size={14} /> {dish.tag || 'Faruk Usta Spesiyali'}
                </span>
                <span className="badge-time">
                  <Clock size={14} /> {dish.prepTime}
                </span>
              </div>

              <div className="modal-3d-hint">
                <Sparkles size={14} /> 3D Canlı Doku Perspektifi
              </div>
            </div>

            {/* Highlights */}
            {dish.highlights && (
              <div className="modal-highlights">
                {dish.highlights.map((h, i) => (
                  <div key={i} className="highlight-pill">
                    <Check size={14} className="text-gold" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Contact */}
          <div className="modal-customizer-content">
            <div className="modal-header-meta">
              <span className="category-sub">Gaziantep Geleneksel Sokak Lezzeti</span>
              <h2 className="modal-dish-title">{dish.name}</h2>
              <p className="modal-dish-desc">{dish.description}</p>
            </div>

            {/* Portion Selector */}
            <div className="customizer-group">
              <label className="group-label">Porsiyon & Dürüm Şekli</label>
              <div className="portion-options-grid">
                <button
                  className={`portion-btn ${portionType === 'single' ? 'active' : ''}`}
                  onClick={() => setPortionType('single')}
                >
                  <span className="portion-name">Standart Tek Lavaş</span>
                  <span className="portion-price">{dish.price} ₺</span>
                </button>
                <button
                  className={`portion-btn ${portionType === 'double' ? 'active' : ''}`}
                  onClick={() => setPortionType('double')}
                >
                  <span className="portion-name">Doyurucu Çift Lavaş</span>
                  <span className="portion-price">{dish.price + 30} ₺</span>
                </button>
                <button
                  className={`portion-btn ${portionType === 'plate' ? 'active' : ''}`}
                  onClick={() => setPortionType('plate')}
                >
                  <span className="portion-name">Açık Porsiyon & Pide</span>
                  <span className="portion-price">{dish.price + 70} ₺</span>
                </button>
              </div>
            </div>

            {/* Spiciness Level */}
            <div className="customizer-group">
              <label className="group-label">
                <span>Acılık Derecesi</span>
                <span className="spice-indicator">
                  {selectedSpice === 0 && 'Acısız / Sade'}
                  {selectedSpice === 1 && 'Tatlımsı / Hafif Acı'}
                  {selectedSpice === 2 && 'Orta Antep Acısı'}
                  {selectedSpice === 3 && 'Hakiki Antep Harareti'}
                  {selectedSpice === 4 && 'Alev Alev Faruk Usta Özel'}
                </span>
              </label>
              <div className="spice-pills">
                {[0, 1, 2, 3, 4].map((level) => (
                  <button
                    key={level}
                    className={`spice-pill-btn ${selectedSpice === level ? 'active' : ''}`}
                    onClick={() => setSelectedSpice(level)}
                  >
                    <Flame size={16} className={level >= 2 ? 'text-crimson' : 'text-gold'} />
                    <span>
                      {level === 0 ? 'Acısız' : `${level}. Seviye`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ingredients list */}
            <div className="customizer-group">
              <label className="group-label">İçindekiler & Antep Baharatları</label>
              <div className="dish-ingredients-row">
                {dish.ingredients.map((ing, idx) => (
                  <span key={idx} className="ingredient-tag">{ing}</span>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="customizer-group">
              <label className="group-label">Faruk Usta'ya Notunuz</label>
              <input
                type="text"
                placeholder="Örn: Bol maydanozlu olsun, lavaşı çıtır olsun..."
                className="custom-note-input"
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
              />
            </div>

            {/* Footer with WhatsApp & Call CTA (No Online Cart) */}
            <div className="modal-footer-action">
              <button
                className="brand-action-pill pill-whatsapp flex-1"
                onClick={handleWhatsAppContact}
              >
                <WhatsAppIcon size={18} color="#fff" />
                <span>WhatsApp ile İletişime Geç • {finalPrice} ₺</span>
              </button>

              <a
                href={RESTAURANT_INFO.phoneTel}
                className="brand-action-pill pill-phone"
              >
                <Phone size={16} />
                <span>Hemen Ara</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
