import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { Sun, Moon, Languages, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export function LandingHeader() {
  const { t, language, changeLanguage } = useLanguage();
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bg = darkMode ? '#0a0a0a' : '#ffffff';
  const borderColor = darkMode ? '#262626' : '#e5e5e5';
  const textPrimary = darkMode ? '#ffffff' : '#0f172a';
  const textSecondary = darkMode ? '#d1d5db' : '#374151';
  const btnBorder = darkMode ? '#333333' : '#e5e5e5';

  const navLinks = [
    { to: '/how-to-use', label: language === 'my' ? 'အသုံးပြုနည်း' : 'How to Use' },
    { to: '/typography-tips', label: language === 'my' ? 'ဖောင့်အကြံပြုချက်' : 'Typography Tips' },
    { to: '/blog', label: language === 'my' ? 'ဆောင်းပါးများ' : 'Blog' },
    { to: '/about', label: language === 'my' ? 'အကြောင်း' : 'About' },
  ];

  const isActive = (path) => {
    if (path === '/blog') return location.pathname.startsWith('/blog');
    return location.pathname === path;
  };

  return (
    <header
      className="sticky top-0 z-50 transition-colors duration-200"
      style={{
        borderBottom: `1px solid ${borderColor}`,
        backgroundColor: bg,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 text-decoration-none group">
          <img
            src="/ponsaryay.png"
            alt="Pon-Sar-Yay Logo"
            className="w-9 h-9 object-contain rounded-md shadow-sm transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span
              className="font-bold uppercase tracking-tight text-base sm:text-lg leading-none"
              style={{ color: textPrimary }}
            >
              Pon-Sar-Yay
            </span>
            <span className="text-[10px] text-neutral-400 font-medium tracking-wide mt-0.5">
              ပုံစာရေး
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm lg:text-base font-medium px-3.5 py-1.5 rounded-lg transition-all duration-150"
                style={{
                  color: active ? '#ea580c' : textSecondary,
                  backgroundColor: active
                    ? darkMode
                      ? 'rgba(234,88,12,0.12)'
                      : '#fff7ed'
                    : 'transparent',
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5">
          {/* Open Editor CTA Button */}
          <Link
            to="/editor"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold shadow-sm transition-all"
          >
            <Sparkles size={15} />
            <span>{language === 'my' ? 'Editor ဖွင့်မည်' : 'Open Editor'}</span>
          </Link>

          {/* Language Toggle */}
          <button
            type="button"
            onClick={() => changeLanguage(language === 'en' ? 'my' : 'en')}
            className="p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
            style={{
              border: `1px solid ${btnBorder}`,
              color: textSecondary,
              backgroundColor: 'transparent',
            }}
            title={t('change language')}
          >
            <Languages size={16} />
            <span className="text-xs font-bold">{language === 'en' ? 'MY' : 'EN'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-2 rounded-lg transition-colors"
            style={{
              border: `1px solid ${btnBorder}`,
              color: textSecondary,
              backgroundColor: 'transparent',
            }}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg ml-1"
            style={{
              border: `1px solid ${btnBorder}`,
              color: textPrimary,
              backgroundColor: 'transparent',
            }}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t px-4 py-4 space-y-2.5 animate-in fade-in duration-150"
          style={{
            borderColor,
            backgroundColor: bg,
          }}
        >
          {navLinks.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium px-3.5 py-2.5 rounded-lg transition-colors"
                style={{
                  color: active ? '#ea580c' : textSecondary,
                  backgroundColor: active
                    ? darkMode
                      ? 'rgba(234,88,12,0.15)'
                      : '#fff7ed'
                    : 'transparent',
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t" style={{ borderColor }}>
            <Link
              to="/editor"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-base font-semibold shadow-sm"
            >
              <span>{language === 'my' ? 'Editor သို့သွားမည်' : 'Open Editor'}</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
