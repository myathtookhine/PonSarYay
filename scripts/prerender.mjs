// Prerenders content routes into static HTML after `vite build`.
//
//   /                 -> dist/index.html
//   /blog             -> dist/blog.html
//   /blog/some-post   -> dist/blog/some-post.html
//   /editor           -> dist/editor.html (empty app shell, no prerendered content)
//
// Cloudflare serves "foo.html" at "/foo", so URLs stay the same (no trailing slash).
// If rendering a route fails, that route simply falls back to the normal SPA shell.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadEnv } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.mjs');

const env = { ...loadEnv('production', root, 'VITE_'), ...process.env };
const siteUrl = (env.VITE_SITE_URL || '').replace(/\/+$/, '');

const escapeAttr = (v) =>
  String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeText = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Replace (or insert) <meta {attr}="{key}" content="..."> in the template
const setMeta = (html, attr, key, value) => {
  if (!value) return html;
  const re = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`, 'i');
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(value)}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
};

const applyHead = (template, head, route) => {
  let html = template;
  if (head.title) html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeText(head.title)}</title>`);
  html = setMeta(html, 'name', 'description', head.description);
  html = setMeta(html, 'name', 'keywords', head.keywords);
  html = setMeta(html, 'property', 'og:title', head.title);
  html = setMeta(html, 'property', 'og:description', head.description);
  html = setMeta(html, 'property', 'og:type', head.ogType);
  html = setMeta(html, 'property', 'twitter:title', head.title);
  html = setMeta(html, 'property', 'twitter:description', head.description);

  const canonical = head.canonicalUrl || (siteUrl ? `${siteUrl}${route === '/' ? '/' : route}` : '');
  if (canonical) {
    html = setMeta(html, 'property', 'og:url', canonical);
    html = html.replace('</head>', `    <link rel="canonical" href="${escapeAttr(canonical)}" />\n  </head>`);
  }
  return html;
};

const outFile = (route) =>
  route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, `${route.replace(/^\//, '')}.html`);

const main = async () => {
  const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
  if (!template.includes('<div id="root"></div>')) {
    throw new Error('dist/index.html has no empty <div id="root"></div> — was it already prerendered?');
  }

  // Keep an empty shell for the editor so it doesn't flash landing-page content
  fs.writeFileSync(path.join(distDir, 'editor.html'), template);

  const { render, PRERENDER_ROUTES } = await import(pathToFileURL(ssrEntry).href);
  let ok = 0;

  for (const route of PRERENDER_ROUTES) {
    try {
      const { html, head } = render(route);
      const page = applyHead(template, head, route).replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      );
      const file = outFile(route);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, page);
      ok += 1;
    } catch (err) {
      console.warn(`[prerender] ${route} failed, falling back to SPA shell:`, err.message);
    }
  }

  // Precompressed copies of the old (empty) index.html are now stale
  for (const ext of ['.gz', '.br']) fs.rmSync(path.join(distDir, `index.html${ext}`), { force: true });

  if (!siteUrl) console.warn('[prerender] VITE_SITE_URL not set — canonical links skipped');
  console.log(`[prerender] ${ok}/${PRERENDER_ROUTES.length} routes prerendered`);
};

main().catch((err) => {
  console.error('[prerender] fatal:', err);
  process.exit(1);
});
