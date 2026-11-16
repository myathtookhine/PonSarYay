import { BLOG_POSTS } from '../src/data/blogData.js';

const PLACEHOLDER_CLIENT = 'ca-pub-XXXXXXXXXXXXXXXX';

const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/editor', priority: '0.9', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/how-to-use', priority: '0.7', changefreq: 'monthly' },
  { path: '/typography-tips', priority: '0.7', changefreq: 'monthly' },
  { path: '/about', priority: '0.5', changefreq: 'yearly' },
  { path: '/contact', priority: '0.4', changefreq: 'yearly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
];

/**
 * Build-time plugin that:
 *  - injects the AdSense loader + account meta into index.html
 *  - emits ads.txt, robots.txt and sitemap.xml into dist/
 * All values come from env (VITE_ADSENSE_CLIENT, VITE_SITE_URL).
 */
export function seoAdsPlugin(env) {
  const rawClient = env.VITE_ADSENSE_CLIENT || '';
  const client = rawClient && rawClient !== PLACEHOLDER_CLIENT ? rawClient : '';
  const siteUrl = (env.VITE_SITE_URL || '').replace(/\/+$/, '');

  return {
    name: 'ponsaryay-seo-ads',

    transformIndexHtml() {
      if (!client) return [];
      return [
        { tag: 'meta', attrs: { name: 'google-adsense-account', content: client }, injectTo: 'head' },
        {
          tag: 'script',
          attrs: {
            async: true,
            src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`,
            crossorigin: 'anonymous',
          },
          injectTo: 'head',
        },
      ];
    },

    generateBundle() {
      // ads.txt
      if (client) {
        const pubId = client.replace(/^ca-/, '');
        this.emitFile({
          type: 'asset',
          fileName: 'ads.txt',
          source: `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`,
        });
      } else {
        this.warn('VITE_ADSENSE_CLIENT not set — skipping AdSense script and ads.txt');
      }

      // robots.txt
      const robots = ['User-agent: *', 'Allow: /'];
      if (siteUrl) robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`);
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' });

      // sitemap.xml
      if (!siteUrl) {
        this.warn('VITE_SITE_URL not set — skipping sitemap.xml');
        return;
      }
      const routes = [
        ...STATIC_ROUTES,
        ...BLOG_POSTS.map((p) => ({ path: `/blog/${p.slug}`, priority: '0.7', changefreq: 'monthly' })),
      ];
      const urls = routes
        .map(
          (r) =>
            `  <url>\n    <loc>${siteUrl}${r.path}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
        )
        .join('\n');
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
    },
  };
}
