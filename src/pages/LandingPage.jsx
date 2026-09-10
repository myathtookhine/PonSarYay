import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHeader } from '../components/Landing/LandingHeader.jsx';
import { LandingFooter } from '../components/Landing/LandingFooter.jsx';
import { TypewriterHeadline } from '../components/Landing/TypewriterHeadline.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { Type, PenTool, Download, Zap, ArrowRight, Signal, Wifi, BatteryFull, BookOpen, ChevronDown } from 'lucide-react';
import appframeImg from '../assets/appframe.jpg';
import appframeDarkImg from '../assets/appframe-dark.jpg';
import { trackHeroCtaClick, trackEvent } from '../utils/analytics.js';
import './LandingPage.css';

const FEATURES = [
  { icon: Type, titleKey: 'feature_fonts_title', descKey: 'feature_fonts_desc' },
  { icon: PenTool, titleKey: 'feature_edit_title', descKey: 'feature_edit_desc' },
  { icon: Download, titleKey: 'feature_export_title', descKey: 'feature_export_desc' },
  { icon: Zap, titleKey: 'feature_simple_title', descKey: 'feature_simple_desc' },
];

export function LandingPage() {
  const { t, language } = useLanguage();
  const { darkMode } = useTheme();
  const isMy = language === 'my';

  const scrollToGuides = (e) => {
    e.preventDefault();
    trackEvent('hero_guide_link_click', { destination: 'guides_showcase' });
    const target = document.getElementById('guides-showcase');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
            <p className="animate-in animate-delay-1 text-base sm:text-lg">{t('hero_subheadline')}</p>
            <div className="animate-in animate-delay-2 flex flex-col items-center md:items-start">
              <Link to="/editor" onClick={() => trackHeroCtaClick('hero_button')} className="hero-cta">
                <span>{t('hero_cta')}</span>
                <ArrowRight size={20} className="hero-cta-arrow" />
              </Link>
              <a
                href="#guides-showcase"
                onClick={scrollToGuides}
                className="inline-flex items-center justify-center gap-1.5 text-sm sm:text-base font-semibold cursor-pointer mt-6 self-center md:self-start hover:text-orange-500"
                style={{ color: darkMode ? '#d1d5db' : '#374151' }}
              >
                <BookOpen size={16} className="text-orange-500 shrink-0" />
                <span className="underline-offset-4 hover:underline">
                  {isMy ? 'အသုံးပြုရန် လမ်းညွှန်' : 'How-to-Use Guide'}
                </span>
                <ChevronDown size={15} className="opacity-70 shrink-0" />
              </a>
            </div>
          </div>
          <div className="hero-mockup animate-in animate-delay-3">
            <Link to="/editor" onClick={() => trackHeroCtaClick('hero_mockup')} className="mockup-placeholder mockup-link">
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
      <section id="features" className="features-section">
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

      {/* Guides & Resources Showcase Section */}
      <section id="guides-showcase" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full scroll-mt-6">
        <div className="text-center mb-10">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-orange-500 mb-2 block">
            {isMy ? 'ဗဟုသုတနှင့် လမ်းညွှန်များ' : 'Knowledge & Guides'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: darkMode ? '#ffffff' : '#0f172a' }}>
            {isMy
              ? 'မြန်မာစာ လက်ရေးလှနှင့် ဒီဇိုင်းအတွက် လိုအပ်သမျှ အားလုံး'
              : 'Everything You Need for Perfect Myanmar Typography'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/how-to-use"
            className="p-6 sm:p-7 rounded-2xl border transition-all hover:border-orange-500/50 block group no-underline text-inherit"
            style={{
              backgroundColor: darkMode ? '#121212' : '#fafafa',
              borderColor: darkMode ? '#262626' : '#e5e5e5',
            }}
          >
            <span className="text-xs sm:text-sm font-bold text-orange-500 mb-2 block">
              {isMy ? 'အဆင့်ဆင့် လမ်းညွှန်' : 'Step-by-Step Guide'}
            </span>
            <h3 className="text-lg sm:text-xl font-bold mb-3 group-hover:text-orange-500 transition-colors" style={{ color: darkMode ? '#ffffff' : '#0f172a' }}>
              {isMy ? 'Pon-Sar-Yay အသုံးပြုနည်း လမ်းညွှန်' : 'How to Use Pon-Sar-Yay'}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed mb-5" style={{ color: darkMode ? '#d1d5db' : '#374151' }}>
              {isMy
                ? 'ပုံတင်နည်း၊ မြန်မာယူနီကုဒ်ဖောင့် ရွေးချယ်နည်း၊ စာကြောင်းအကွာအဝေး ချိန်ညှိနည်းနှင့် 3x Retina ရုပ်ထွက်ဖြင့် ဒေါင်းလုဒ်ရယူနည်းများကို လေ့လာပါ။'
                : 'Learn how to upload photos, choose the right Myanmar Unicode fonts, adjust line spacing, and export in 3x retina resolution.'}
            </p>
            <span className="text-sm font-semibold text-orange-500 flex items-center gap-1.5">
              {isMy ? 'လမ်းညွှန်ဖတ်ရှုမည်' : 'Read Guide'}
              <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
            </span>
          </Link>

          <Link
            to="/typography-tips"
            className="p-6 sm:p-7 rounded-2xl border transition-all hover:border-orange-500/50 block group no-underline text-inherit"
            style={{
              backgroundColor: darkMode ? '#121212' : '#fafafa',
              borderColor: darkMode ? '#262626' : '#e5e5e5',
            }}
          >
            <span className="text-xs sm:text-sm font-bold text-orange-500 mb-2 block">
              {isMy ? 'စာလုံးဒီဇိုင်း အကြံပြုချက်' : 'Styling Insights'}
            </span>
            <h3 className="text-lg sm:text-xl font-bold mb-3 group-hover:text-orange-500 transition-colors" style={{ color: darkMode ? '#ffffff' : '#0f172a' }}>
              {isMy ? 'ဖောင့်အတွဲအစပ်နှင့် ဒီဇိုင်းနည်းစနစ်များ' : 'Typography & Pairing Tips'}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed mb-5" style={{ color: darkMode ? '#d1d5db' : '#374151' }}>
              {isMy
                ? 'ဖောင့်အတွဲအစပ်ရွေးချယ်မှု၊ စာလုံးဘေးလိုင်း (Stroke) သုံးစွဲနည်း၊ ရှုပ်ထွေးသော ပုံများပေါ်တွင် စာသားထင်ရှားစေမည့် နည်းလမ်းများကို လေ့လာပါ။'
                : 'Master font pairing, subtle stroke outlines, contrast rules over busy photos, and mood matching for your quotes.'}
            </p>
            <span className="text-sm font-semibold text-orange-500 flex items-center gap-1.5">
              {isMy ? 'နည်းလမ်းများ ကြည့်ရှုမည်' : 'Explore Tips'}
              <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
            </span>
          </Link>

          <Link
            to="/blog"
            className="p-6 sm:p-7 rounded-2xl border transition-all hover:border-orange-500/50 block group no-underline text-inherit"
            style={{
              backgroundColor: darkMode ? '#121212' : '#fafafa',
              borderColor: darkMode ? '#262626' : '#e5e5e5',
            }}
          >
            <span className="text-xs sm:text-sm font-bold text-orange-500 mb-2 block">
              {isMy ? 'ဒီဇိုင်းဆောင်းပါးများ' : 'Design Articles'}
            </span>
            <h3 className="text-lg sm:text-xl font-bold mb-3 group-hover:text-orange-500 transition-colors" style={{ color: darkMode ? '#ffffff' : '#0f172a' }}>
              {isMy ? 'Pon-Sar-Yay ဆောင်းပါးများ (Blog)' : 'Pon-Sar-Yay Blog'}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed mb-5" style={{ color: darkMode ? '#d1d5db' : '#374151' }}>
              {isMy
                ? 'မြန်မာယူနီကုဒ် ဖောင့်များသမိုင်း၊ လူကြိုက်များသော ကိုးကားချက် ပိုစ့်များ ဖန်တီးပုံနှင့် ဆိုရှယ်မီဒီယာ ဓာတ်ပုံအရွယ်အစားများအကြောင်း ပြည့်စုံစွာ ဖတ်ရှုပါ။'
                : 'In-depth articles covering the evolution of Myanmar Unicode typography, viral quote card design, and social media dimensions.'}
            </p>
            <span className="text-sm font-semibold text-orange-500 flex items-center gap-1.5">
              {isMy ? 'ဆောင်းပါးများ ဖတ်ရှုမည်' : 'Browse Blog'}
              <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
