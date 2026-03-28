import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { WifiOff, RefreshCw } from 'lucide-react';

export function OfflinePage() {
  const { t } = useLanguage();
  const { darkMode } = useTheme();

  const bg = darkMode ? '#0a0a0a' : '#ffffff';
  const textPrimary = darkMode ? '#f5f5f5' : '#171717';
  const textSecondary = darkMode ? '#a3a3a3' : '#525252';
  const iconBg = darkMode ? '#1f1f1f' : '#f5f5f5';
  const borderColor = darkMode ? '#2a2a2a' : '#e5e5e5';

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: bg,
      color: textPrimary,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      textAlign: 'center',
      fontFamily: 'inherit',
    }}>
      <div style={{
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: iconBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        border: `1px solid ${borderColor}`,
      }}>
        <WifiOff size={36} color={textSecondary} />
      </div>

      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 8px 0' }}>
        {t('offline_title')}
      </h1>
      <p style={{ fontSize: '0.95rem', color: textSecondary, margin: '0 0 32px 0', maxWidth: 360, lineHeight: 1.6 }}>
        {t('offline_desc')}
      </p>

      <button
        type="button"
        onClick={() => window.location.reload()}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 24px',
          fontSize: '0.9rem',
          fontWeight: 600,
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          cursor: 'pointer',
          backgroundColor: 'transparent',
          color: textPrimary,
          transition: 'background-color 0.15s',
          fontFamily: 'inherit',
        }}
      >
        <RefreshCw size={16} />
        {t('offline_retry')}
      </button>
    </div>
  );
}
