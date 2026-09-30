// Build step 3/3 — prerender every route to static HTML for SEO and a
// fast first paint, then write sitemap.xml and robots.txt.
//   dist/index.html            → template produced by `vite build`
//   dist-ssr/entry-server.js   → produced by `vite build --ssr`
// Each route is written as dist/<path>.html (Vercel `cleanUrls` serves
// /about from about.html) plus dist/404.html.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssr = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);
const { render, ROUTES, NOT_FOUND, canonical, SITE, POSTS, HOME_FAQ } = ssr;

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const OG_IMAGE = `${SITE.url}/og.png`;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

const ORG = {
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/logo-512.png`,
  email: SITE.email,
  description: SITE.description,
};
const WEBSITE = { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url, name: SITE.name, publisher: { '@id': ORG['@id'] }, inLanguage: 'en' };

function breadcrumbs(p) {
  if (p === '/') return null;
  const parts = p.split('/').filter(Boolean);
  const items = [{ name: 'Home', url: SITE.url }];
  let acc = '';
  parts.forEach((part, i) => {
    acc += `/${part}`;
    const hit = ROUTES.find((r) => r.path === acc);
    const name = hit ? hit.title.split(/ [|—] /)[0] : part.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
    if (hit || i === parts.length - 1) items.push({ name, url: canonical(acc) });
  });
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  };
}

function structuredData(route) {
  const graph = [ORG, WEBSITE];
  const crumbs = breadcrumbs(route.path);
  if (crumbs) graph.push(crumbs);
  if (route.path === '/') {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: HOME_FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }
  if (route.type === 'article') {
    const post = POSTS.find((p) => `/blog/${p.slug}` === route.path);
    graph.push({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      author: { '@id': ORG['@id'] },
      publisher: { '@id': ORG['@id'] },
      image: `${SITE.url}${post.image}`,
      mainEntityOfPage: canonical(route.path),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

function head(route) {
  const url = canonical(route.path);
  const post = route.type === 'article' && POSTS.find((p) => `/blog/${p.slug}` === route.path);
  const image = post ? `${SITE.url}${post.image}` : OG_IMAGE;
  const tags = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    route.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${route.type === 'article' ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    ...(post ? [] : ['<meta property="og:image:width" content="1200" />', '<meta property="og:image:height" content="630" />']),
    `<meta property="og:image:alt" content="${SITE.name} — ${esc(SITE.tagline)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ];
  if (route.type === 'article') tags.push(`<meta property="article:published_time" content="${route.date}" />`);
  if (!route.noindex) tags.push(`<script type="application/ld+json">${json(structuredData(route))}</script>`);
  return tags.join('\n    ');
}

function page(route, url) {
  const html = render(url);
  return template
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, head(route))
    .replace('<!--app-->', html);
}

function write(file, contents) {
  const out = path.join(dist, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, contents);
}

for (const route of ROUTES) {
  write(route.path === '/' ? 'index.html' : `${route.path.slice(1)}.html`, page(route, route.path));
}
write('404.html', page(NOT_FOUND, '/__not-found__'));

const today = new Date().toISOString().slice(0, 10);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((r) => `  <url><loc>${canonical(r.path)}</loc><lastmod>${r.date || today}</lastmod><priority>${r.priority.toFixed(1)}</priority></url>`).join('\n')}
</urlset>
`);
write('robots.txt', `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE.url}/sitemap.xml
`);

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`Prerendered ${ROUTES.length} routes + 404, sitemap.xml and robots.txt`);
