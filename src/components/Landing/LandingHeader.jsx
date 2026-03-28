import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { Sun, Moon, Languages } from 'lucide-react';

export function LandingHeader() {
  const { t, language, changeLanguage } = useLanguage();
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();

  const bg = darkMode ? '#0a0a0a' : '#ffffff';
  const borderColor = darkMode ? '#262626' : '#e5e5e5';
  const textPrimary = darkMode ? '#f5f5f5' : '#171717';
  const textSecondary = darkMode ? '#a3a3a3' : '#525252';
  const btnBorder = darkMode ? '#333333' : '#e5e5e5';
  const btnHoverBg = darkMode ? '#1f1f1f' : '#f5f5f5';

  return (
    <header style={{
      borderBottom: `1px solid ${borderColor}`,
      padding: '12px 24px',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: bg,
      transition: 'background-color 0.2s, border-color 0.2s',
    }}>
      <div style={{
        maxWidth: 1120,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
        <img src="/ponsaryay.png" alt="Pon-Sar-Yay Logo" style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 6 }} />
        <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.01em', fontSize: '1.1rem', color: textPrimary }}>
          Pon-Sar-Yay
        </span>
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Link
          to="/about"
          style={{
            fontSize: '0.85rem',
            fontWeight: 500,
            padding: '6px 14px',
            borderRadius: 6,
            textDecoration: 'none',
            transition: 'background-color 0.15s',
            color: location.pathname === '/about' ? '#ea580c' : textSecondary,
            backgroundColor: location.pathname === '/about' ? (darkMode ? 'rgba(234,88,12,0.12)' : '#fff7ed') : 'transparent',
          }}
        >
          {t('nav_aboutapp')}
        </Link>
        {/* <Link
          to="/editor"
          style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            padding: '6px 16px',
            borderRadius: 6,
            textDecoration: 'none',
            transition: 'background-color 0.15s',
            backgroundColor: darkMode ? '#f5f5f5' : '#171717',
            color: darkMode ? '#171717' : '#ffffff',
          }}
        >
          {t('nav_editor')}
        </Link> */}

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 4 }}>
          <button
            type="button"
            onClick={() => changeLanguage(language === 'en' ? 'my' : 'en')}
            style={{
              padding: 6,
              borderRadius: 6,
              border: `1px solid ${btnBorder}`,
              backgroundColor: 'transparent',
              color: textSecondary,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: '0.75rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background-color 0.15s',
            }}
            title={t('change language')}
          >
            <Languages size={15} />
            <span>{language === 'en' ? 'MY' : 'EN'}</span>
          </button>
          <button
            type="button"
            onClick={toggleDarkMode}
            style={{
              padding: 6,
              borderRadius: 6,
              border: `1px solid ${btnBorder}`,
              backgroundColor: 'transparent',
              color: textSecondary,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.15s',
            }}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </nav>
      </div>
    </header>
  );
}
