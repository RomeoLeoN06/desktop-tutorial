import React from 'react';
import { MapPin, Phone, Clock, Navigation, ShieldCheck, Share2 } from 'lucide-react';
import { WhatsAppIcon, InstagramIcon } from './Icons';
import { RESTAURANT_INFO } from '../data/menuData';

export default function LocationAndHours() {
  const openWhatsApp = () => {
    const text = encodeURIComponent(`Merhaba Sarmacı Faruk! Karagöz şubenize gelmek istiyorum veya paket sipariş vermek istiyorum.`);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${text}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Sarmacı Faruk - Gaziantep Lezzet Durağı',
        text: 'Gaziantep Karagöz’de efsane nohut sarma ve köz lezzetleri!',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Bağlantı kopyalandı!');
    }
  };

  return (
    <section id="location" className="location-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="badge-pill">
            <MapPin size={16} className="text-crimson" />
            <span>Gaziantep Merkez Şubemiz</span>
          </div>
          <h2 className="section-title">
            Karagöz Ocağımıza <span>Bekliyoruz & Yol Tarifi</span>
          </h2>
          <p className="section-desc">
            Tarihi Antep sokaklarının kalbinde, köz kokusunu takip ederek bize kolayca ulaşabilir 
            veya telefonla kapınıza kadar sıcak paket sipariş verebilirsiniz.
          </p>
        </div>

        {/* Grid: Details Cards + Google Maps Embed */}
        <div className="location-grid">
          {/* Information & Contact Cards */}
          <div className="location-info-col">
            {/* Address Card */}
            <div className="info-card-3d">
              <div className="info-card-header">
                <div className="info-icon-box bg-location-glow">
                  <MapPin size={22} color="#fff" />
                </div>
                <div>
                  <h3 className="info-card-title">Açık Adresimiz</h3>
                  <span className="text-xs text-muted">Şahinbey / Gaziantep</span>
                </div>
              </div>
              <p className="info-card-body-text">
                <strong>{RESTAURANT_INFO.address}</strong>
              </p>
              <div className="info-card-actions">
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="brand-action-pill pill-location pill-full-width"
                >
                  <Navigation size={16} />
                  <span>Google Haritada Aç & Yol Tarifi</span>
                </a>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="info-card-3d">
              <div className="info-card-header">
                <div className="info-icon-box bg-whatsapp-glow">
                  <Phone size={22} color="#fff" />
                </div>
                <div>
                  <h3 className="info-card-title">İletişim & Paket Servis Hattı</h3>
                  <span className="text-xs text-muted">Hızlı Sipariş & Bilgi</span>
                </div>
              </div>
              <div className="contact-numbers">
                <a href={RESTAURANT_INFO.phoneTel} className="primary-phone-link">
                  <Phone size={20} />
                  <span>{RESTAURANT_INFO.phoneFormatted}</span>
                </a>
              </div>
              <div className="action-pill-dual-row">
                <button className="brand-action-pill pill-whatsapp flex-1" onClick={openWhatsApp}>
                  <WhatsAppIcon size={16} color="#fff" />
                  <span>WhatsApp Sipariş</span>
                </button>
                <a href={RESTAURANT_INFO.phoneTel} className="brand-action-pill pill-phone flex-1">
                  <Phone size={15} />
                  <span>Hemen Ara</span>
                </a>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="info-card-3d">
              <div className="info-card-header">
                <div className="info-icon-box bg-mint-glow">
                  <Clock size={22} color="#fff" />
                </div>
                <div>
                  <h3 className="info-card-title">Çalışma Saatlerimiz</h3>
                  <span className="text-xs text-muted">Gece Dürümü Dahil</span>
                </div>
              </div>
              <div className="hours-list">
                <div className="hour-row">
                  <span className="day-name">Pazartesi - Pazar (Her Gün)</span>
                  <span className="hour-time font-bold text-gold">10:00 - 02:00</span>
                </div>
                <div className="hour-note">
                  ⚡ Gece acıkanlara sıcak taş fırın lavaş ve nohut servisi sabaha karşı 02:00’ye kadar devam eder.
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Embed & Interactive Frame */}
          <div className="location-map-col">
            <div className="map-frame-card">
              <div className="map-header-bar">
                <div className="d-flex align-center gap-2">
                  <span className="map-pin-pulse"></span>
                  <span className="font-bold text-sm">Gaziantep Sarmacı Faruk Konumu</span>
                </div>
                <button className="btn-icon-sm" onClick={handleShare} title="Konumu Paylaş">
                  <Share2 size={16} />
                </button>
              </div>

              {/* Embedded Google Map */}
              <div className="map-embed-wrapper">
                <iframe
                  title="Sarmacı Faruk Gaziantep Konumu"
                  src={RESTAURANT_INFO.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Map Footer Bar with styled pill buttons */}
              <div className="map-footer-bar">
                <div className="map-footer-address">
                  <div className="text-xs text-muted">Hızlı Navigasyon</div>
                  <div className="font-semibold text-sm">Karagöz, Karahoca Sok. No:21</div>
                </div>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="brand-action-pill pill-location"
                >
                  <Navigation size={15} />
                  <span>Yol Tarifi Başlat</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
