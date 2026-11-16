// Google AdSense configuration, sourced from Vite env vars.
// Set these in .env.local (dev) and in your hosting provider's env settings (prod).

const rawClient = import.meta.env.VITE_ADSENSE_CLIENT || '';

// Treat the placeholder value as "not configured"
export const ADSENSE_CLIENT =
  rawClient && rawClient !== 'ca-pub-XXXXXXXXXXXXXXXX' ? rawClient : '';

export const AD_SLOTS = {
  // Responsive display unit: landing page, blog list, guide pages
  display: import.meta.env.VITE_ADSENSE_SLOT_DISPLAY || '',
  // In-article / fluid unit: blog posts, typography tips
  article: import.meta.env.VITE_ADSENSE_SLOT_ARTICLE || '',
};

export const isAdsEnabled = Boolean(ADSENSE_CLIENT);
