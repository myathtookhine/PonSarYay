// Build-time renderer used by scripts/prerender.mjs (not shipped to the browser).
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { HeadContext } from './components/common/SEO.jsx';
import { BLOG_POSTS } from './data/blogData.js';

// Content routes to prerender. /editor is intentionally excluded (canvas app).
export const PRERENDER_ROUTES = [
  '/',
  '/blog',
  ...BLOG_POSTS.map((p) => `/blog/${p.slug}`),
  '/how-to-use',
  '/typography-tips',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
];

// Prerendered HTML is English: Myanmar is not an AdSense-supported language, so
// crawlers should see the English version. The browser then switches to the
// visitor's saved language (default Myanmar) as soon as the app loads.
export function render(url) {
  const head = {};
  const html = renderToString(
    <HeadContext.Provider value={head}>
      <StaticRouter location={url}>
        <LanguageProvider initialLanguage="en">
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </LanguageProvider>
      </StaticRouter>
    </HeadContext.Provider>
  );
  return { html, head };
}
