import React from 'react';
import { Sparkles, Phone, Navigation, UtensilsCrossed } from 'lucide-react';
import { WhatsAppIcon, InstagramIcon } from './Icons';
import { RESTAURANT_INFO } from '../data/menuData';
import { PRODUCTS_LIST } from '../data/productsData';

export default function Hero({ onOpenProductsModal }) {
  const openWhatsApp = () => {
    const text = encodeURIComponent(
      'Merhaba Sarmacı Faruk! Antep usulü sarma ve lezzetleriniz hakkında sipariş vermek / bilgi almak istiyorum.'
    );
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${text}`, '_blank');
  };

  const FOOD_PRODUCTS = PRODUCTS_LIST.filter((p) => p.category !== 'icecekler');
  const DRINK_PRODUCTS = PRODUCTS_LIST.filter((p) => p.category === 'icecekler');

  return (
    <section className="fullscreen-hero-section">
      {/* Top Left: Ürünlerimiz button directly below red marquee bar */}
      <div className="hero-top-left-bar">
        <button
          className="hero-products-btn"
          onClick={onOpenProductsModal}
          title="Ürünlerimiz & Menüyü Aç"
        >
          <UtensilsCrossed size={16} className="text-gold" />
          <span>Ürünlerimiz</span>
          <span className="products-count-badge">14 Çeşit</span>
          <Sparkles size={14} className="text-gold" />
        </button>
      </div>

      <div className="hero-fit-container hero-fullwidth-container">
        {/* Brand Typography & Action Triggers - Centered & Grand */}
        <div className="hero-text-col">
          <div className="hero-text-group hero-text-centered">
            <div className="hero-badge">
              <span className="fire-pulse-icon">🌯</span>
              <span>Gaziantep Karagöz’de Antep Usulü Sarma</span>
              <span className="badge-divider">|</span>
              <span className="text-gold font-bold">Faruk Usta</span>
            </div>

            <h1 className="hero-title">
              <span className="hero-title-main">Antep Usulü Özel Sarma</span>
              <span className="hero-title-sub">Faruk Usta Lezzeti</span>
            </h1>

            {/* Products Strip - Orderly: Food Delicacies on All Screens, Drinks on Desktop */}
            <div
              className="hero-all-products-strip"
              onClick={onOpenProductsModal}
              title="Tüm Menüyü İncelemek İçin Tıklayın"
            >
              {/* Main Food Delicacies */}
              <div className="hero-prods-food-group">
                {FOOD_PRODUCTS.map((product, idx) => (
                  <span key={product.id} className="hero-prod-unit">
                    <span className="hero-prod-name">{product.name}</span>
                    {idx < FOOD_PRODUCTS.length - 1 && (
                      <span className="hero-prod-dot">✦</span>
                    )}
                  </span>
                ))}
              </div>

              {/* Cold Beverages (Included on Desktop, Hidden on Mobile/Tablet) */}
              <div className="hero-prods-drinks-group">
                <span className="hero-prod-group-sep">✦</span>
                {DRINK_PRODUCTS.map((product, idx) => (
                  <span key={product.id} className="hero-prod-unit">
                    <span className="hero-prod-name">{product.name}</span>
                    {idx < DRINK_PRODUCTS.length - 1 && (
                      <span className="hero-prod-dot">✦</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Pills Row */}
          <div className="hero-actions-group">
            <div className="hero-pills-row hero-pills-grid">
              <button
                className="hero-capsule-pill pill-whatsapp"
                onClick={openWhatsApp}
                title="WhatsApp Sipariş Hattı"
              >
                <WhatsAppIcon size={18} color="#fff" />
                <span>WhatsApp Sipariş</span>
              </button>

              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="hero-capsule-pill pill-instagram"
                title="Instagram: @sarmacifaruk"
              >
                <InstagramIcon size={18} color="#fff" />
                <span>Instagram</span>
              </a>

              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="hero-capsule-pill pill-location"
                title="Google Haritalar Yol Tarifi"
              >
                <Navigation size={17} />
                <span>Yol Tarifi</span>
              </a>

              <a
                href={RESTAURANT_INFO.phoneTel}
                className="hero-capsule-pill pill-phone"
                title="Hemen Telefon Et"
              >
                <Phone size={17} />
                <span>0530 257 49 09</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
