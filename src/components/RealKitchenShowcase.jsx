import React, { useState } from 'react';
import { Sparkles, Flame, Eye, MapPin, Phone, CheckCircle2, X, Navigation } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from './Icons';
import { REAL_KITCHEN_GALLERY, RESTAURANT_INFO } from '../data/menuData';

export default function RealKitchenShowcase() {
  const [activePhoto, setActivePhoto] = useState(null);

  const openWhatsApp = () => {
    const text = encodeURIComponent('Merhaba Sarmacı Faruk! Karagöz ocağınızdan paket sipariş vermek istiyorum.');
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section className="real-kitchen-section" id="real-kitchen">
      {/* Ambient background with darkened real kitchen texture */}
      <div className="kitchen-bg-layer">
        <div className="kitchen-bg-overlay"></div>
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="badge-pill">
            <Flame size={16} className="text-crimson" />
            <span>Köz Ateşi & Canlı Tezgahımız</span>
          </div>
          <h2 className="section-title">
            Karagöz Ocağımızdan <span>Hakiki Faruk Usta Kareleri</span>
          </h2>
          <p className="section-desc">
            Sarmacı Faruk’un mutfağında her şey gözünüzün önünde; kemik suyunda kaynayan nohut, 
            odun közünde nar gibi pişen tavuk şişler ve sıcacık açılan taş fırın tırnak lavaşlar.
          </p>
        </div>

        {/* Gallery 3D Grid */}
        <div className="real-photos-grid">
          {REAL_KITCHEN_GALLERY.map((item, idx) => (
            <div
              key={item.id}
              className={`real-photo-card card-variant-${(idx % 3) + 1}`}
              onClick={() => setActivePhoto(item)}
            >
              <div className="real-photo-inner">
                <img
                  src={item.image}
                  alt={item.title}
                  className="real-photo-img"
                  loading="lazy"
                />
                <div className="real-photo-glow"></div>
                <div className="real-photo-badge">
                  <Flame size={12} className="text-gold" />
                  <span>{item.tag}</span>
                </div>
                <div className="real-photo-overlay">
                  <div className="overlay-content">
                    <h4 className="photo-title">{item.title}</h4>
                    <p className="photo-sub">{item.subtitle}</p>
                    <span className="view-full-chip">
                      <Eye size={14} /> Büyüt & İncele
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Address & Fast Contact Callout Cards with matching WhatsApp/Instagram/Location styles */}
        <div className="kitchen-contact-callout">
          <div className="callout-grid">
            {/* Konum / Adres Card */}
            <div className="callout-card-item card-location-theme">
              <div className="callout-top-row">
                <div className="callout-icon-box bg-location-glow">
                  <MapPin size={22} color="#fff" />
                </div>
                <div className="callout-text-wrap">
                  <span className="callout-badge-label">Gaziantep Şubemiz</span>
                  <p className="callout-val-address">{RESTAURANT_INFO.address}</p>
                </div>
              </div>
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="brand-action-pill pill-location pill-full-width"
              >
                <Navigation size={16} />
                <span>Haritada Aç & Yol Tarifi Al</span>
              </a>
            </div>

            {/* WhatsApp Sipariş Card */}
            <div className="callout-card-item card-whatsapp-theme">
              <div className="callout-top-row">
                <div className="callout-icon-box bg-whatsapp-glow">
                  <WhatsAppIcon size={22} color="#fff" />
                </div>
                <div className="callout-text-wrap">
                  <span className="callout-badge-label">Canlı WhatsApp Sipariş</span>
                  <p className="callout-val-phone">{RESTAURANT_INFO.phoneFormatted}</p>
                </div>
              </div>
              <button
                className="brand-action-pill pill-whatsapp pill-full-width"
                onClick={openWhatsApp}
              >
                <WhatsAppIcon size={16} color="#fff" />
                <span>WhatsApp ile Sipariş Ver</span>
              </button>
            </div>

            {/* Instagram Card */}
            <div className="callout-card-item card-instagram-theme">
              <div className="callout-top-row">
                <div className="callout-icon-box bg-instagram-glow">
                  <InstagramIcon size={22} color="#fff" />
                </div>
                <div className="callout-text-wrap">
                  <span className="callout-badge-label">Instagram Resmi Sayfa</span>
                  <p className="callout-val-insta">{RESTAURANT_INFO.instagramHandle}</p>
                </div>
              </div>
              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="brand-action-pill pill-instagram pill-full-width"
              >
                <InstagramIcon size={16} color="#fff" />
                <span>Instagram'da Takip Et</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="lightbox-backdrop" onClick={() => setActivePhoto(null)}>
          <div className="lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setActivePhoto(null)}>
              <X size={24} />
            </button>
            <img src={activePhoto.image} alt={activePhoto.title} className="lightbox-img" />
            <div className="lightbox-caption">
              <h3>{activePhoto.title}</h3>
              <p>{activePhoto.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
