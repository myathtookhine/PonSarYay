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
  // Microsoft Clarity project ID (letters/numbers only)
  const clarityId = /^[a-z0-9]+$/i.test(env.VITE_CLARITY_PROJECT_ID || '') ? env.VITE_CLARITY_PROJECT_ID : '';

  return {
    name: 'ponsaryay-seo-ads',

    transformIndexHtml() {
      const tags = [];
      if (client) {
        tags.push(
          { tag: 'meta', attrs: { name: 'google-adsense-account', content: client }, injectTo: 'head' },
          {
            tag: 'script',
            attrs: {
              async: true,
              src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`,
              crossorigin: 'anonymous',
            },
            injectTo: 'head',
          }
        );
      }
      if (clarityId) {
        // Official Clarity loader. The editor is masked with data-clarity-mask (see AppShell.jsx)
        // so users' photos and text are never captured in session recordings.
        tags.push({
          tag: 'script',
          children: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`,
          injectTo: 'head',
        });
      }
      return tags;
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

      // sitemap.xml + feed.json need absolute URLs
      if (!siteUrl) {
        this.warn('VITE_SITE_URL not set — skipping sitemap.xml and feed.json');
        return;
      }

      // feed.json — public list of blog posts, consumed by infiniteframe.online
      const feed = {
        site: siteUrl,
        updated: new Date().toISOString(),
        posts: BLOG_POSTS.map((p) => ({
          slug: p.slug,
          url: `${siteUrl}/blog/${p.slug}`,
          title: p.title,
          title_my: p.title_my || p.title,
          excerpt: p.excerpt,
          excerpt_my: p.excerpt_my || p.excerpt,
          category: p.category,
          category_my: p.category_my || p.category,
          date: p.date,
          readTime: p.readTime,
          readTime_my: p.readTime_my || p.readTime,
        })),
      };
      this.emitFile({ type: 'asset', fileName: 'feed.json', source: JSON.stringify(feed) });

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
