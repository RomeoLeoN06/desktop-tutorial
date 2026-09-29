import React, { useState, useEffect } from 'react';
import { X, Search, Sparkles, UtensilsCrossed } from 'lucide-react';
import { PRODUCTS_LIST, PRODUCT_CATEGORIES } from '../data/productsData';

export default function ProductsModal({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = PRODUCTS_LIST.filter((product) => {
    const matchesCat = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
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
              <span>GAZİANTEP KARAGÖZ MUTFAĞI</span>
              <span className="badge-dot-sep">✦</span>
              <span className="text-gold">ÖZEL MENÜ</span>
            </div>
            <h2 className="products-modal-title">ÜRÜNLERİMİZ & LEZZETLER</h2>
            <p className="products-modal-subtitle">
              Taş fırından tırnak lavaşlı hakiki Antep usulü sarmalar, dürümler ve soğuk içecekler
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

        {/* Categories Bar & Search Filter (Full Width, All Buttons Fit Perfectly) */}
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

          <div className="products-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Ürün ara... (Tavuk, Ciğer, Ayran...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="products-search-input"
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Products Cards Scrollable Body */}
        <div className="products-modal-body">
          <div className="products-cards-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-uniform-card">
                {/* 1. Closed Dark Gray Compact Product Image Box */}
                <div className="product-img-box">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-card-img"
                    loading="lazy"
                  />
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
              <h3>Aradığınız kriterde ürün bulunamadı</h3>
              <p>Farklı bir arama terimi deneyebilir veya kategorileri değiştirebilirsiniz.</p>
              <button
                className="products-reset-btn"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
              >
                Tüm Ürünleri Göster
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
