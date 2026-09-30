import React, { useState } from 'react';
import { Heart, MessageCircle, ExternalLink, Bookmark, CheckCircle, Flame } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { INSTAGRAM_POSTS, RESTAURANT_INFO } from '../data/menuData';

export default function InstagramSection() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section id="instagram" className="instagram-section">
      <div className="container">
        {/* Instagram Profile Header Card */}
        <div className="instagram-profile-card">
          <div className="d-flex align-center gap-4 flex-wrap">
            <div className="insta-avatar-wrap">
              <img
                src="./images/logo_badge.jpg"
                alt="Sarmacı Faruk Instagram"
                className="insta-avatar-img"
              />
              <div className="insta-story-ring"></div>
            </div>

            <div className="insta-profile-info">
              <div className="d-flex align-center gap-2 flex-wrap">
                <h3 className="insta-handle">{RESTAURANT_INFO.instagramHandle}</h3>
                <span className="verified-badge" title="Onaylı Hesap">
                  <CheckCircle size={16} fill="#3897f0" color="#fff" />
                </span>
                <a
                  href={RESTAURANT_INFO.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-insta-follow"
                >
                  <InstagramIcon size={15} />
                  <span>Takip Et</span>
                </a>
              </div>

              <div className="insta-stats-row">
                <span><strong>542</strong> gönderi</span>
                <span><strong>48.9B</strong> takipçi</span>
                <span><strong>1971</strong>'den beri</span>
              </div>

              <p className="insta-bio">
                👑 <strong>Sarmacı Faruk</strong> | Gaziantep Meşhur Sarma Evi<br />
                🌯 Nohut Sarma • Tavuk Sarma • Tavuk Şiş • Ciğer Kavurma Sarma • Antep Tava Sarma<br />
                📍 Karagöz, Karahoca Sok. No:21, Gaziantep<br />
                📞 Sipariş Hattı: <strong>0530 257 49 09</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Instagram Feed Grid */}
        <div className="insta-posts-grid">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="insta-post-card"
              onClick={() => setSelectedPost(post)}
            >
              <img src={post.image} alt="Sarmacı Faruk Instagram Paylaşımı" className="insta-post-img" />
              <div className="insta-overlay">
                <div className="insta-overlay-stat">
                  <Heart size={20} fill="#fff" />
                  <span>{post.likes}</span>
                </div>
                <div className="insta-overlay-stat">
                  <MessageCircle size={20} fill="#fff" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="text-center mt-6">
          <a
            href={RESTAURANT_INFO.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline insta-big-btn"
          >
            <InstagramIcon size={18} />
            <span>@{RESTAURANT_INFO.instagram} Sayfamızı Ziyaret Edin</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Post Preview Modal */}
      {selectedPost && (
        <div className="lightbox-backdrop" onClick={() => setSelectedPost(null)}>
          <div className="insta-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="insta-modal-media">
              <img src={selectedPost.image} alt="Gönderi" />
            </div>
            <div className="insta-modal-details">
              <div className="insta-modal-author">
                <img src="./images/logo_badge.jpg" alt="Logo" className="modal-avatar" />
                <div>
                  <div className="font-bold">{RESTAURANT_INFO.instagramHandle}</div>
                  <div className="text-xs text-muted">Gaziantep, Türkiye</div>
                </div>
              </div>
              <p className="insta-modal-caption">{selectedPost.caption}</p>
              <div className="insta-modal-footer">
                <div className="d-flex align-center gap-3">
                  <span className="d-flex align-center gap-1 font-bold text-sm">
                    <Heart size={16} className="text-crimson" fill="#e63946" /> {selectedPost.likes} beğeni
                  </span>
                  <span className="d-flex align-center gap-1 text-sm text-muted">
                    <MessageCircle size={16} /> {selectedPost.comments} yorum
                  </span>
                </div>
                <a
                  href={RESTAURANT_INFO.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm mt-3"
                >
                  Instagram'da Gör
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
