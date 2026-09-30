import React, { useState, useEffect } from 'react';
import { X, Sparkles, UtensilsCrossed, ZoomIn } from 'lucide-react';
import { PRODUCTS_LIST, PRODUCT_CATEGORIES } from '../data/productsData';

export default function ProductsModal({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('yiyecekler');
  const [zoomedProduct, setZoomedProduct] = useState(null);

  // Close on Escape key press (close zoomed image first if open)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (zoomedProduct) {
          setZoomedProduct(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, zoomedProduct]);

  if (!isOpen) return null;

  const filteredProducts = PRODUCTS_LIST.filter(
    (product) => product.category === activeCategory
  );

  return (
    <>
      <div className="products-modal-overlay" onClick={onClose}>
        <div
          className="products-modal-wrapper"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Top Bar */}
          <div className="products-modal-header">
            <div className="products-modal-title-group">
              <div className="products-modal-badge">
                <Sparkles size={14} className="text-gold" />
                <span style={{ color: '#ffffff', fontWeight: 800 }}>GAZİANTEP</span>
                <span style={{ color: '#ffffff', opacity: 0.9 }}>KARAGÖZ MUTFAĞI</span>
                <span className="badge-dot-sep">✦</span>
                <span className="text-gold">ÖZEL MENÜ</span>
              </div>
              <h2 className="products-modal-title">ÜRÜNLERİMİZ & LEZZETLER</h2>
              <p className="products-modal-subtitle">
                Taş fırından tırnak lavaşlı hakiki Antep usulü enfes sarmalar ve soğuk içecekler
              </p>
            </div>

            <div className="products-header-actions">
              <button
                className="products-modal-close-btn"
                onClick={onClose}
                title="Kapat (ESC)"
                aria-label="Kapat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Categories Bar (Full Width, Balanced Two-Button Switcher) */}
          <div className="products-filter-strip">
            <div className="products-categories-grid">
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`products-cat-pill ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span className="cat-icon">{cat.icon}</span>
                  <span className="cat-name">{cat.name}</span>
                  <span className="cat-count">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Products Cards Scrollable Body */}
          <div className="products-modal-body">
            <div className="products-cards-grid">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-uniform-card"
                  onClick={() => setZoomedProduct(product)}
                  role="button"
                  tabIndex={0}
                  title={`${product.name} - Detayları ve görseli büyütmek için tıkla`}
                  aria-label={`${product.name} resmini tam boyutta görüntüle`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setZoomedProduct(product);
                    }
                  }}
                >
                  {/* 1. Closed Dark Gray Compact Product Image Box with Click to Zoom */}
                  <div className="product-img-box">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-card-img"
                      loading="lazy"
                    />
                    <div className="product-img-zoom-btn" title="Büyüt">
                      <ZoomIn size={14} />
                    </div>
                  </div>

                  {/* 2. Product Information Column */}
                  <div className="product-info-box">
                    <h3 className="product-item-name">{product.name}</h3>
                    <p className="product-item-desc">{product.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="products-empty-state">
                <UtensilsCrossed size={40} className="text-gold" />
                <h3>Bu kategoride henüz ürün bulunmuyor</h3>
              </div>
            )}
          </div>
        </div>

        {/* Smart Responsive Full-Width Centered Lightbox */}
        {zoomedProduct && (
          <div
            className="product-lightbox-overlay"
            onClick={(e) => {
              e.stopPropagation();
              setZoomedProduct(null);
            }}
            role="dialog"
            aria-modal="true"
            aria-label={`${zoomedProduct.name} görseli`}
          >
            <div
              className="product-lightbox-card"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Header with Product Title in White & Title Case */}
              <div className="product-lightbox-header">
                <div className="product-lightbox-title-box">
                  <span className="product-lightbox-badge">
                    {zoomedProduct.categoryName || (zoomedProduct.category === 'icecekler' ? 'İçecek' : 'Lezzet')}
                  </span>
                  <h3 className="product-lightbox-title">{zoomedProduct.name}</h3>
                </div>
                <button
                  className="product-lightbox-close-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomedProduct(null);
                  }}
                  title="Kapat (ESC)"
                  aria-label="Resmi Kapat"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Smart Lightbox Centered Image Area */}
              <div className="product-lightbox-img-area">
                <img
                  src={zoomedProduct.image}
                  alt={zoomedProduct.name}
                  className="product-lightbox-img"
                />
              </div>

              {/* Lightbox Description */}
              {zoomedProduct.desc && (
                <div className="product-lightbox-desc-box">
                  <p className="product-lightbox-desc">{zoomedProduct.desc}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
