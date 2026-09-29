import React from 'react';
import { Award, Flame, Utensils, Heart, CheckCircle2, Sparkles, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Visual Brand Badge & Atmosphere */}
          <div className="about-visual-col">
            <div className="about-badge-card">
              <div className="crest-halo"></div>
              <img
                src="./images/logo_badge.jpg"
                alt="Sarmacı Faruk Gaziantep Mühür"
                className="about-crest-img"
              />
              <div className="crest-meta">
                <span className="crest-year">1971’den Bugüne</span>
                <span className="crest-title">Gaziantep Gastronomi Geleneği</span>
              </div>
            </div>

            {/* Quote Card */}
            <div className="about-quote-box">
              <p className="quote-text">
                "Bizim dürümümüzde hile hurda olmaz; lavaş fırından yeni çıkacak, nohut et suyunu 
                iliklerine kadar çekecek, kimyon burnuna buram buram kokacak."
              </p>
              <div className="quote-author">
                <span className="author-name">— Faruk Usta</span>
                <span className="author-sub">Kurucu & Baş Usta</span>
              </div>
            </div>
          </div>

          {/* Right Column: Story & 4 Pillars */}
          <div className="about-content-col">
            <div className="badge-pill">
              <Award size={16} className="text-gold" />
              <span>Gaziantep Sokak Kültürü</span>
            </div>

            <h2 className="section-title text-left">
              Yarım Asırlık Bir Lezzet Tutkusu: <span>Sarmacı Faruk</span>
            </h2>

            <p className="about-text">
              1971 yılında Gaziantep'in kadim sokaklarında küçük bir köz ocağı ve taş fırınla başlayan yolculuğumuz, 
              bugün şehrin en sevilen dürüm ve tava durağı olarak devam ediyor. Gaziantep’in UNESCO tescilli 
              mutfak kültürüne olan sadakatimizle, ilk günkü heyecanla sabahın ilk ışıklarında ocağımızı yakıyoruz.
            </p>

            {/* The 4 Pillars */}
            <div className="pillars-grid">
              <div className="pillar-item">
                <div className="pillar-icon-box">
                  <Flame size={20} className="text-crimson" />
                </div>
                <div>
                  <h4 className="pillar-title">Meşe Odun Közü</h4>
                  <p className="pillar-desc">Gaz ya da elektrik değil; meşe odununun o isli, derin köz lezzeti.</p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon-box">
                  <Utensils size={20} className="text-gold" />
                </div>
                <div>
                  <h4 className="pillar-title">Dakikalık Taze Lavaş</h4>
                  <p className="pillar-desc">Beklemiş ekmek asla kullanılmaz, her dürüm anında açılan sıcak lavaşla sarılır.</p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon-box">
                  <Sparkles size={20} className="text-mint" />
                </div>
                <div>
                  <h4 className="pillar-title">8 Saat Kemik Suyu</h4>
                  <p className="pillar-desc">Nohutlarımız ilikli dana kemik suyunda saatlerce demlenerek lokum kıvamına gelir.</p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon-box">
                  <CheckCircle2 size={20} className="text-gold" />
                </div>
                <div>
                  <h4 className="pillar-title">Tescilli Antep Baharatı</h4>
                  <p className="pillar-desc">Taş değirmende çekilmiş kimyon, ipek pul biber ve sumakla benzersiz aroma.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
