import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Clock, 
  Star, 
  Plus, 
  Eye, 
  ShoppingBag, 
  Search,
  Check,
  UtensilsCrossed,
  ChefHat,
  Award,
  Coffee
} from 'lucide-react';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';

// Map icon string to component
const ICONS = {
  Sparkles,
  Flame,
  UtensilsCrossed,
  ChefHat,
  Award,
  Coffee
};

export default function MenuSection({ onOpenDishModal, onQuickAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCardId, setHoveredCardId] = useState(null);

  // Filter items
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="menu-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="badge-pill">
            <Flame size={16} className="text-crimson" />
            <span>Gaziantep Sokaklarının Hakiki Dürüm Menüsü</span>
          </div>
          <h2 className="section-title">
            Faruk Usta’nın <span>Özel Dürüm & Tava Lezzetleri</span>
          </h2>
          <p className="section-desc">
            Antep'in tescilli lezzet mirası; taze tırnaklı lavaşlar, kemik suyunda pişen nohutlar, 
            odun közünde marine tavuk ve sacda cızbız kavurmalarla buluşuyor.
          </p>
        </div>

        {/* Controls: Category Filter Tabs & Search Bar */}
        <div className="menu-filters-bar">
          <div className="category-scroll-wrapper">
            {CATEGORIES.map((cat) => {
              const IconComp = ICONS[cat.icon] || Sparkles;
              return (
                <button
                  key={cat.id}
                  className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <IconComp size={16} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          <div className="menu-search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Lezzet ara (nohut, tavuk, ciğer...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="menu-grid">
          {filteredItems.map((item) => {
            const isHovered = hoveredCardId === item.id;
            return (
              <div
                key={item.id}
                className={`dish-card-3d ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredCardId(item.id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                {/* Image Container with 3D Depth */}
                <div className="dish-card-media" onClick={() => onOpenDishModal(item)}>
                  <img src={item.image} alt={item.name} className="dish-card-img" />
                  
                  {/* Floating Tags */}
                  <div className="dish-card-badges">
                    {item.tag && (
                      <span className="dish-tag-badge">
                        <Flame size={12} /> {item.tag}
                      </span>
                    )}
                    <span className="dish-prep-badge">
                      <Clock size={12} /> {item.prepTime}
                    </span>
                  </div>

                  {/* 3D Inspect Overlay Icon */}
                  <div className="inspect-3d-hint">
                    <Eye size={16} />
                    <span>3D Özelleştir</span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="dish-card-body">
                  <div className="dish-rating-row">
                    <div className="rating-pill">
                      <Star size={14} className="star-filled" />
                      <span>{item.rating}</span>
                      <span className="review-count">({item.reviews})</span>
                    </div>

                    {/* Spiciness Level Indicators */}
                    <div className="spice-meter" title={`Acılık Derecesi: ${item.spiciness}/4`}>
                      {[...Array(4)].map((_, sIdx) => (
                        <Flame
                          key={sIdx}
                          size={14}
                          className={sIdx < item.spiciness ? 'spice-active' : 'spice-dim'}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="dish-card-title" onClick={() => onOpenDishModal(item)}>
                    {item.name}
                  </h3>

                  <p className="dish-card-description">{item.description}</p>

                  {/* Ingredient Tags */}
                  <div className="dish-ingredients-row">
                    {item.ingredients.slice(0, 4).map((ing, i) => (
                      <span key={i} className="ingredient-tag">{ing}</span>
                    ))}
                    {item.ingredients.length > 4 && (
                      <span className="ingredient-tag more">+{item.ingredients.length - 4}</span>
                    )}
                  </div>

                  {/* Price & Action Row */}
                  <div className="dish-card-footer">
                    <div className="dish-pricing">
                      <span className="current-price">{item.price} ₺</span>
                      {item.oldPrice && <span className="old-price">{item.oldPrice} ₺</span>}
                    </div>

                    <div className="card-action-btns">
                      <button
                        className="btn-card-inspect"
                        onClick={() => onOpenDishModal(item)}
                        title="3D Detaylı İncele ve Özelleştir"
                      >
                        <Eye size={17} />
                      </button>
                      <button
                        className="btn-card-add"
                        onClick={() => onQuickAddToCart(item)}
                        title="Hızlı Sepete Ekle"
                      >
                        <Plus size={18} />
                        <span>Ekle</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="empty-search-state">
            <p>Aradığınız kriterlere uygun lezzet bulunamadı.</p>
            <button className="btn btn-outline" onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}>
              Tüm Menüyü Göster
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
