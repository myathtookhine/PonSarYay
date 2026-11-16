import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ADSENSE_CLIENT, AD_SLOTS } from '../../utils/ads.js';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';

/**
 * Manual AdSense unit that works with SPA route changes.
 *
 * - `type`: 'display' (responsive) or 'article' (in-article fluid)
 * - Renders nothing in production when AdSense isn't configured.
 * - Renders a dashed placeholder in dev so placements are visible.
 *
 * Policy notes: never place this inside modals/popups or right next to
 * editor controls (accidental-click risk).
 */
export function AdSlot({ type = 'display', className = '' }) {
  const insRef = useRef(null);
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const { darkMode } = useTheme();

  const slot = AD_SLOTS[type];
  const configured = Boolean(ADSENSE_CLIENT && slot);
  const label = language === 'my' ? 'ကြော်ငြာ' : 'Advertisement';
  const labelColor = darkMode ? '#737373' : '#9ca3af';

  useEffect(() => {
    if (!configured) return;
    const el = insRef.current;
    // Skip if this <ins> was already filled (e.g. React StrictMode double effect)
    if (!el || el.getAttribute('data-adsbygoogle-status')) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers or script load failures should never break the page
    }
  }, [configured, pathname]);

  if (!configured) {
    if (!import.meta.env.DEV) return null;
    return (
      <div
        className={`my-10 flex items-center justify-center rounded-xl border-2 border-dashed text-xs font-medium ${className}`}
        style={{ minHeight: 120, borderColor: labelColor, color: labelColor }}
      >
        Ad placeholder ({type}) — set VITE_ADSENSE_CLIENT & VITE_ADSENSE_SLOT_{type.toUpperCase()}
      </div>
    );
  }

  const formatProps =
    type === 'article'
      ? { 'data-ad-layout': 'in-article', 'data-ad-format': 'fluid', style: { display: 'block', textAlign: 'center' } }
      : { 'data-ad-format': 'auto', 'data-full-width-responsive': 'true', style: { display: 'block' } };

  return (
    <aside className={`my-10 ${className}`} aria-label={label}>
      <div className="text-[10px] uppercase tracking-wider text-center mb-1.5" style={{ color: labelColor }}>
        {label}
      </div>
      {/* key forces a fresh <ins> per route so AdSense can fill it again */}
      <ins
        key={pathname}
        ref={insRef}
        className="adsbygoogle"
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        {...formatProps}
      />
    </aside>
  );
}
