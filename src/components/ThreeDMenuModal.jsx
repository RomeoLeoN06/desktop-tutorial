import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  Sparkles, 
  Star, 
  Clock, 
  Eye, 
  Check, 
  Phone,
  MessageCircle
} from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { MENU_ITEMS, CATEGORIES, RESTAURANT_INFO } from '../data/menuData';

export default function ThreeDMenuModal({ isOpen, onClose, onSelectDishForDetail }) {
  if (!isOpen) return null;

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSpotlightId, setSelectedSpotlightId] = useState(MENU_ITEMS[2].id); // Default Nohut Sarma
  const [tiltCards, setTiltCards] = useState({});

  const filteredItems = MENU_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const spotlightDish = MENU_ITEMS.find((item) => item.id === selectedSpotlightId) || MENU_ITEMS[0];

  const handleCardMouseMove = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    setTiltCards((prev) => ({
      ...prev,
      [id]: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`
    }));
  };

  const handleCardMouseLeave = (id) => {
    setTiltCards((prev) => ({
      ...prev,
      [id]: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }));
  };

  const sendWhatsAppOrder = (dishName, price) => {
    const text = encodeURIComponent(`Merhaba Sarmacı Faruk! Menünüzdeki "${dishName}" (${price} ₺) hakkında bilgi almak / sipariş vermek istiyorum.`);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card menu-3d-fullscreen-modal" onClick={(e) => e.stopPropagation()}>
        {/* Top Header Bar */}
        <div className="menu-modal-top-bar">
          <div className="d-flex align-center gap-3">
            <img src="/images/logo_badge.jpg" alt="Logo" className="modal-top-logo" />
            <div>
              <div className="badge-pill mb-0 py-1">
                <Sparkles size={14} className="text-gold" />
                <span>3 Boyutlu Lezzet Galerisi</span>
              </div>
              <h2 className="modal-top-title">Sarmacı Faruk Menüsü & Lezzet Sırları</h2>
            </div>
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Kapat">
            <X size={22} />
          </button>
        </div>

        {/* 3D Spotlight Featured Banner */}
        <div className="modal-spotlight-section">
          <div className="spotlight-visual-box">
            <img
              src={spotlightDish.image}
              alt={spotlightDish.name}
              className="spotlight-main-img"
            />
            <div className="spotlight-badge-live">
              <Flame size={14} className="text-crimson" />
              <span>3D İnteraktif Seçim</span>
            </div>
          </div>

          <div className="spotlight-info-box">
            <div className="d-flex align-center justify-between mb-2">
              <span className="spotlight-tag">{spotlightDish.tag}</span>
              <span className="spotlight-price">{spotlightDish.price} ₺</span>
            </div>

            <h3 className="spotlight-title">{spotlightDish.name}</h3>
            <p className="spotlight-desc">{spotlightDish.description}</p>

            {/* How it's made / Ingredients highlights */}
            <div className="spotlight-highlights-grid">
              {spotlightDish.highlights?.map((h, i) => (
                <div key={i} className="spotlight-hl-item">
                  <Check size={14} className="text-gold" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="spotlight-actions-row">
              <button
                className="brand-action-pill pill-whatsapp"
                onClick={() => sendWhatsAppOrder(spotlightDish.name, spotlightDish.price)}
              >
                <WhatsAppIcon size={16} color="#fff" />
                <span>WhatsApp ile Sipariş / Bilgi</span>
              </button>

              <a href={RESTAURANT_INFO.phoneTel} className="brand-action-pill pill-phone">
                <Phone size={16} />
                <span>{RESTAURANT_INFO.phoneFormatted}</span>
              </a>

              <button
                className="btn btn-glass"
                onClick={() => onSelectDishForDetail(spotlightDish)}
              >
                <Eye size={15} />
                <span>Tüm Detayları Gör</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="modal-category-bar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`modal-cat-pill ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Items 3D Cards Grid */}
        <div className="modal-dishes-grid">
          {filteredItems.map((dish) => {
            const isSpotlight = dish.id === selectedSpotlightId;
            return (
              <div
                key={dish.id}
                className={`dish-modal-card ${isSpotlight ? 'is-selected' : ''}`}
                style={{ transform: tiltCards[dish.id] || 'none' }}
                onMouseMove={(e) => handleCardMouseMove(e, dish.id)}
                onMouseLeave={() => handleCardMouseLeave(dish.id)}
                onClick={() => setSelectedSpotlightId(dish.id)}
              >
                <div className="card-media-wrapper">
                  <img src={dish.image} alt={dish.name} className="card-dish-img" />
                  <div className="card-tag-chip">
                    <Flame size={12} /> {dish.tag}
                  </div>
                  <div className="card-prep-chip">
                    <Clock size={12} /> {dish.prepTime}
                  </div>
                </div>

                <div className="card-content-wrapper">
                  <div className="d-flex align-center justify-between mb-1">
                    <h4 className="card-dish-name">{dish.name}</h4>
                    <span className="card-dish-price">{dish.price} ₺</span>
                  </div>

                  <p className="card-dish-desc">{dish.description}</p>

                  {/* Highlights / Neler Var */}
                  <div className="card-ingredients-snippet">
                    {dish.ingredients.slice(0, 3).map((ing, idx) => (
                      <span key={idx} className="ing-chip">{ing}</span>
                    ))}
                    {dish.ingredients.length > 3 && (
                      <span className="ing-chip more">+{dish.ingredients.length - 3}</span>
                    )}
                  </div>

                  {/* Action Buttons: Detay & WhatsApp */}
                  <div className="card-actions-wrapper">
                    <button
                      className="btn-modal-action-inspect"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDishForDetail(dish);
                      }}
                      title="Detaylı İncele"
                    >
                      <Eye size={15} />
                      <span>İncele</span>
                    </button>

                    <button
                      className="brand-action-pill pill-whatsapp py-1 px-3 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        sendWhatsAppOrder(dish.name, dish.price);
                      }}
                      title="WhatsApp'tan Yaz"
                    >
                      <WhatsAppIcon size={14} color="#fff" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
