import React from 'react';
import { MapPin, Phone, Flame, Heart, ArrowUp, Sparkles, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Footer({ onOpenMenuModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Top Footer Banner */}
        <div className="footer-top-cta">
          <div className="d-flex align-center gap-4 flex-wrap">
            <img src="/images/logo_badge.jpg" alt="Logo" className="footer-logo-badge" />
            <div>
              <h3 className="footer-cta-title">Acıktınız mı? Faruk Usta'nın Ocağı Yanıyor!</h3>
              <p className="footer-cta-desc">
                Sıcak tırnak lavaş, kemik sulu nohut ve köz lezzetleri bir tık uzağınızda.
              </p>
            </div>
          </div>
          <div className="d-flex gap-3 flex-wrap">
            <a href={RESTAURANT_INFO.phoneTel} className="btn btn-primary">
              <Phone size={18} />
              <span>{RESTAURANT_INFO.phoneFormatted}</span>
            </a>
            <a
              href={RESTAURANT_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-glass"
            >
              <InstagramIcon size={18} />
              <span>{RESTAURANT_INFO.instagramHandle}</span>
            </a>
          </div>
        </div>

        {/* Footer Main Links Grid */}
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-col brand-col">
            <div className="d-flex align-center gap-2 mb-3">
              <span className="brand-title text-gold">SARMACI FARUK</span>
            </div>
            <p className="footer-about-text">
              Gaziantep'in UNESCO tescilli mutfak mirasını 1971'den beri meşe odunu közünde ve 
              taş fırın tırnak lavaş ustalığıyla sofralarınıza taşıyoruz.
            </p>
            <div className="footer-tags">
              <span className="badge-flame">🔥 Meşe Odunu Közü</span>
              <span className="badge-time">🥖 Taş Fırın Lavaş</span>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="footer-col">
            <h4 className="footer-col-title">Lezzetlerimiz (3D Menü)</h4>
            <ul className="footer-links-list">
              <li><button className="footer-link-btn" onClick={onOpenMenuModal}>Meşhur Antep Nohut Sarma</button></li>
              <li><button className="footer-link-btn" onClick={onOpenMenuModal}>Özel Soslu Tavuk Sarma</button></li>
              <li><button className="footer-link-btn" onClick={onOpenMenuModal}>Közde Odun Ateşi Tavuk Şiş</button></li>
              <li><button className="footer-link-btn" onClick={onOpenMenuModal}>Sacda Ciğer Kavurma Sarma</button></li>
              <li><button className="footer-link-btn" onClick={onOpenMenuModal}>Antep Usulü Tava Sarma</button></li>
              <li><button className="footer-link-btn" onClick={onOpenMenuModal}>Cevizli Çiğ Köfte Dürüm</button></li>
              <li><button className="footer-link-btn" onClick={onOpenMenuModal}>Karışık Kızartma & Patates</button></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="footer-col">
            <h4 className="footer-col-title">İletişim & Adres</h4>
            <div className="footer-contact-item">
              <MapPin size={18} className="text-crimson shrink-0" />
              <span>{RESTAURANT_INFO.address}</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={18} className="text-gold shrink-0" />
              <a href={RESTAURANT_INFO.phoneTel}>{RESTAURANT_INFO.phoneFormatted}</a>
            </div>
            <div className="footer-contact-item">
              <InstagramIcon size={18} color="var(--accent-mint)" className="shrink-0" />
              <a href={RESTAURANT_INFO.instagramUrl} target="_blank" rel="noreferrer">
                {RESTAURANT_INFO.instagramHandle}
              </a>
            </div>
            <div className="footer-hours-note">
              ⏰ Çalışma Saatleri: Her Gün 10:00 - 02:00
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © 1971 - 2026 <strong>Sarmacı Faruk</strong> Gaziantep Dürüm Evi. Tüm Hakları Saklıdır.
          </p>
          <div className="d-flex align-center gap-4">
            <span className="text-xs text-muted">Gaziantep Gastronomi Şehri</span>
            <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Yukarı Çık">
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
