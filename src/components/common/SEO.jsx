import { createContext, useContext, useEffect } from 'react';

const DEFAULT_TITLE = 'Pon-Sar-Yay - Myanmar Text-on-Image Editor';
const DEFAULT_DESC = 'Add beautiful custom Myanmar fonts and text to your photos with Pon-Sar-Yay, a sleek, privacy-first, and easy-to-use Myanmar text-on-image editor.';

// During prerendering (entry-server.jsx) a collector object is provided here so
// page metadata can be written into the static HTML. In the browser it's null.
export const HeadContext = createContext(null);

export function SEO({
  title,
  description = DEFAULT_DESC,
  keywords,
  canonicalUrl,
  ogType = 'website',
  ogImage = '/android-chrome-512x512.png',
}) {
  const fullTitle = title ? `${title} | Pon-Sar-Yay` : DEFAULT_TITLE;
  const headCollector = useContext(HeadContext);

  if (headCollector) {
    Object.assign(headCollector, { title: fullTitle, description, keywords, canonicalUrl, ogType, ogImage });
  }

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // Helper to update or create a meta tag
    const setMetaTag = (attrName, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // 3. Open Graph Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);

    // 4. Twitter Card Tags
    setMetaTag('property', 'twitter:title', fullTitle);
    setMetaTag('property', 'twitter:description', description);
    setMetaTag('property', 'twitter:image', ogImage);

    // 5. Canonical Link
    if (canonicalUrl) {
      let linkEl = document.querySelector('link[rel="canonical"]');
      if (!linkEl) {
        linkEl = document.createElement('link');
        linkEl.setAttribute('rel', 'canonical');
        document.head.appendChild(linkEl);
      }
      linkEl.setAttribute('href', canonicalUrl);
    }
  }, [fullTitle, description, keywords, canonicalUrl, ogType, ogImage]);

  return null;
}
