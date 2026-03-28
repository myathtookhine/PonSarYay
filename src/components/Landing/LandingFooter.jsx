import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';

export function LandingFooter() {
  const { t } = useLanguage();
  const { darkMode } = useTheme();

  const bg = darkMode ? '#0a0a0a' : '#ffffff';

  return (
    <footer style={{
      borderTop: `1px solid ${darkMode ? '#262626' : '#e5e5e5'}`,
      backgroundColor: bg,
      padding: '32px 24px',
      textAlign: 'center',
      transition: 'background-color 0.2s, border-color 0.2s',
    }}>
      <p style={{ fontSize: '0.875rem', color: darkMode ? '#737373' : '#a3a3a3', margin: 0 }}>
        {t('footer_text')}
      </p>
    </footer>
  );
}
