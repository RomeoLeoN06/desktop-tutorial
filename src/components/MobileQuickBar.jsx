import React from 'react';
import { Utensils, ShoppingBag, Navigation } from 'lucide-react';
import { WhatsAppIcon, InstagramIcon } from './Icons';
import { RESTAURANT_INFO } from '../data/menuData';

export default function MobileQuickBar({ cartCount, onOpenCart, onOpenMenuModal }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent('Merhaba Sarmacı Faruk! Sipariş vermek istiyorum.');
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <nav className="mobile-quick-bar" aria-label="Mobil Hızlı Menü">
      {/* 1. Menü (3D Modal Açıcı) */}
      <button className="quick-bar-item" onClick={onOpenMenuModal}>
        <div className="quick-icon-wrapper">
          <Utensils size={19} />
        </div>
        <span className="quick-label">Menü (3D)</span>
      </button>

      {/* 2. WhatsApp (Themed Pill Button) */}
      <button className="quick-bar-item quick-item-whatsapp" onClick={openWhatsApp}>
        <div className="quick-icon-wrapper icon-whatsapp-bg">
          <WhatsAppIcon size={18} color="#fff" />
        </div>
        <span className="quick-label text-whatsapp">WhatsApp</span>
      </button>

      {/* 3. Instagram (Themed Pill Button) */}
      <a
        href={RESTAURANT_INFO.instagramUrl}
        target="_blank"
        rel="noreferrer"
        className="quick-bar-item quick-item-instagram"
      >
        <div className="quick-icon-wrapper icon-instagram-bg">
          <InstagramIcon size={18} color="#fff" />
        </div>
        <span className="quick-label text-instagram">Instagram</span>
      </a>

      {/* 4. Konum / Yol Tarifi (Themed Pill Button) */}
      <a
        href={RESTAURANT_INFO.googleMapsUrl}
        target="_blank"
        rel="noreferrer"
        className="quick-bar-item quick-item-location"
      >
        <div className="quick-icon-wrapper icon-location-bg">
          <Navigation size={18} color="#fff" />
        </div>
        <span className="quick-label text-location">Konum</span>
      </a>

      {/* 5. Sepetim */}
      <button className="quick-bar-item quick-item-cart" onClick={onOpenCart}>
        <div className="quick-icon-wrapper icon-cart-bg">
          <ShoppingBag size={19} />
          {cartCount > 0 && <span className="quick-cart-badge">{cartCount}</span>}
        </div>
        <span className="quick-label">Sepetim</span>
      </button>
    </nav>
  );
}
