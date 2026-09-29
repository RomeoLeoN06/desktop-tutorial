import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, Phone, ShoppingBag, ArrowRight, Sparkles, MapPin, User } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNote, setOrderNote] = useState('');

  if (!isOpen) return null;

  const totalAmount = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    let message = `🌯 *SARMACI FARUK - YENİ DÜRÜM SİPARİŞİ*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    
    cart.forEach((item, idx) => {
      message += `*${idx + 1}. ${item.quantity}x ${item.name}*\n`;
      if (item.portionType === 'double') message += `   ▫️ Porsiyon: Çift Lavaş\n`;
      if (item.portionType === 'plate') message += `   ▫️ Porsiyon: Pide / Açık Porsiyon\n`;
      if (item.selectedSpice !== undefined) {
        const spiceTxt = item.selectedSpice === 0 ? 'Acısız' : `${item.selectedSpice}. Derece Acı`;
        message += `   ▫️ Acılık: ${spiceTxt}\n`;
      }
      if (item.selectedExtras && item.selectedExtras.length > 0) {
        message += `   ▫️ İlaveler: ${item.selectedExtras.join(', ')}\n`;
      }
      if (item.specialNote) {
        message += `   ▫️ Not: ${item.specialNote}\n`;
      }
      message += `   💰 Tutar: ${item.totalPrice} ₺\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💵 *GENEL TOPLAM:* ${totalAmount} ₺\n\n`;

    if (customerName) message += `👤 *Müşteri:* ${customerName}\n`;
    if (customerAddress) message += `📍 *Teslimat Adresi:* ${customerAddress}\n`;
    if (orderNote) message += `📝 *Genel Not:* ${orderNote}\n`;

    message += `\nLütfen siparişimi onaylayıp tahmini teslimat süresini bildiriniz.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encoded}`, '_blank');
  };

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="d-flex align-center gap-2">
            <ShoppingBag size={22} className="text-gold" />
            <h3 className="cart-drawer-title">Sipariş Sepetim</h3>
            <span className="cart-count-chip">{cart.reduce((a, b) => a + b.quantity, 0)} ürün</span>
          </div>
          <button className="btn-icon" onClick={onClose} aria-label="Kapat">
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <div className="empty-cart-icon">🌯</div>
              <h4>Sepetiniz Henüz Boş</h4>
              <p>Faruk Usta’nın enfes Gaziantep dürümlerinden dilediğinizi ekleyin.</p>
              <button className="btn btn-primary mt-4" onClick={onClose}>
                Lezzetleri Keşfet
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.cartId} className="cart-item-card">
                  <div className="cart-item-main">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <div className="cart-item-specs">
                        {item.portionType === 'double' && <span className="spec-badge">Çift Lavaş</span>}
                        {item.portionType === 'plate' && <span className="spec-badge">Porsiyon</span>}
                        {item.selectedExtras && item.selectedExtras.length > 0 && (
                          <span className="spec-badge text-gold">+{item.selectedExtras.length} İlave</span>
                        )}
                      </div>
                      <div className="cart-item-unit-price">{item.totalPrice} ₺</div>
                    </div>
                    <button
                      className="btn-remove-item"
                      onClick={() => onRemoveItem(item.cartId)}
                      title="Kaldır"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="cart-item-actions">
                    <div className="cart-stepper">
                      <button
                        className="cart-step-btn"
                        onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="cart-qty-val">{item.quantity}</span>
                      <button
                        className="cart-step-btn"
                        onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <span className="cart-item-subtotal font-bold">{item.totalPrice} ₺</span>
                  </div>
                </div>
              ))}

              {/* Delivery Details Form */}
              <div className="cart-delivery-form">
                <h5 className="form-subtitle">Teslimat & İletişim Bilgileri (İsteğe Bağlı)</h5>
                <div className="form-field">
                  <User size={16} className="field-icon" />
                  <input
                    type="text"
                    placeholder="Adınız Soyadınız"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-field">
                  <MapPin size={16} className="field-icon" />
                  <input
                    type="text"
                    placeholder="Gaziantep Teslimat Adresiniz / Mahalle"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-field">
                  <input
                    type="text"
                    placeholder="Sipariş Notu (Örn: Zil çalmayın, kapıya bırakın...)"
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="d-flex justify-between align-center mb-3">
              <span className="text-secondary text-sm">Toplam Tutar:</span>
              <span className="cart-grand-total">{totalAmount} ₺</span>
            </div>

            <div className="cart-cta-buttons">
              <button className="btn btn-whatsapp btn-block" onClick={handleWhatsAppOrder}>
                <MessageCircle size={18} />
                <span>WhatsApp ile Sipariş Gönder ({totalAmount} ₺)</span>
              </button>

              <a href={RESTAURANT_INFO.phoneTel} className="btn btn-outline btn-block text-center mt-2">
                <Phone size={17} />
                <span>Telefonla Sipariş Ver: {RESTAURANT_INFO.phoneFormatted}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
