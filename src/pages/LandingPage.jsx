import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHeader } from '../components/Landing/LandingHeader.jsx';
import { LandingFooter } from '../components/Landing/LandingFooter.jsx';
import { TypewriterHeadline } from '../components/Landing/TypewriterHeadline.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { Type, PenTool, Download, Zap, ArrowRight, Signal, Wifi, BatteryFull } from 'lucide-react';
import appframeImg from '../assets/appframe.jpg';
import appframeDarkImg from '../assets/appframe-dark.jpg';
import './LandingPage.css';

const FEATURES = [
  { icon: Type, titleKey: 'feature_fonts_title', descKey: 'feature_fonts_desc' },
  { icon: PenTool, titleKey: 'feature_edit_title', descKey: 'feature_edit_desc' },
  { icon: Download, titleKey: 'feature_export_title', descKey: 'feature_export_desc' },
  { icon: Zap, titleKey: 'feature_simple_title', descKey: 'feature_simple_desc' },
];

export function LandingPage() {
  const { t } = useLanguage();
  const { darkMode } = useTheme();

  return (
    <div className={`landing-page ${darkMode ? 'dark-mode' : ''}`}
      style={{ backgroundColor: darkMode ? '#0a0a0a' : '#ffffff', color: darkMode ? '#f5f5f5' : '#171717' }}
    >
      <LandingHeader />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <TypewriterHeadline text={t('hero_headline')} />
            <p className="animate-in animate-delay-1 text-sm">{t('hero_subheadline')}</p>
            <Link to="/editor" className="hero-cta animate-in animate-delay-2">
              {t('hero_cta')}
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="hero-mockup animate-in animate-delay-3">
            <Link to="/editor" className="mockup-placeholder mockup-link">
              <div className="mockup-status-bar">
                <span className="status-time">9:41</span>
                <div className="status-icons">
                  <Signal size={12} strokeWidth={2.5} />
                  <Wifi size={12} strokeWidth={2.5} />
                  <BatteryFull size={14} strokeWidth={2.5} />
                </div>
              </div>
              <div className="mockup-inner">
                <img src={darkMode ? appframeDarkImg : appframeImg} alt="Pon-Sar-Yay App" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={feature.titleKey} className={`feature-card animate-in animate-delay-${index + 1}`}>
                <div className="feature-icon">
                  <Icon size={20} />
                </div>
                <h3>{t(feature.titleKey)}</h3>
                <p>{t(feature.descKey)}</p>
              </div>
            );
          })}
        </div>
      </section>
      <LandingFooter />
    </div>
  );
}
