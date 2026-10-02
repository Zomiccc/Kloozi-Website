// Validates and normalises CMS content before it is stored. Everything is
// plain text (React escapes it when rendering), URLs are restricted to our
// own paths or the Vercel Blob CDN, and sizes are capped.
//
// Shape (every field optional; the site's built-in copy is the default):
// {
//   text:     { "home.hero.title": "…" },
//   media:    { "home.audience.0": { type: "image"|"video", url, alt, poster } },
//   blocks:   { "home.top": [ { id, type, …fields } ] },
//   seo:      { "/about": { title, description } },
//   settings: { email, tagline },
//   posts:    [ { slug, title, description, tag, readTime, date, author, image, imageAlt, body } ] | null
// }

const KEY = /^[\w.\-/]{1,120}$/;
const BLOCK_TYPES = new Set(['text', 'image', 'video', 'split', 'cta']);

const str = (v, max = 5000) => (typeof v === 'string' ? v.slice(0, max) : '');
const bool = (v) => v === true;

export function safeUrl(v) {
  if (typeof v !== 'string') return '';
  const u = v.trim().slice(0, 1000);
  if (/^\/(?!\/)[\w\-./%]*$/.test(u)) return u; // site-relative, e.g. /images/x.webp
  if (/^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\/[\w\-./%]+$/i.test(u)) return u;
  return '';
}

export function safeHref(v) {
  if (typeof v !== 'string') return '';
  const u = v.trim().slice(0, 500);
  if (/^\/(?!\/)/.test(u) || /^https:\/\//i.test(u) || /^mailto:[^\s]+$/i.test(u)) return u;
  return '';
}

function cleanMap(input, fn, maxKeys = 2000) {
  const out = {};
  if (!input || typeof input !== 'object') return out;
  for (const [k, v] of Object.entries(input).slice(0, maxKeys)) {
    if (!KEY.test(k)) continue;
    const c = fn(v);
    if (c !== undefined) out[k] = c;
  }
  return out;
}

function cleanMedia(m) {
  if (!m || typeof m !== 'object') return undefined;
  const url = safeUrl(m.url);
  if (!url) return undefined;
  return { type: m.type === 'video' ? 'video' : 'image', url, alt: str(m.alt, 300), poster: safeUrl(m.poster) };
}

function cleanBlock(b) {
  if (!b || typeof b !== 'object' || !BLOCK_TYPES.has(b.type)) return null;
  return {
    id: str(b.id, 40) || Math.random().toString(36).slice(2, 10),
    type: b.type,
    heading: str(b.heading, 300),
    body: str(b.body, 5000),
    url: safeUrl(b.url),
    mediaType: b.mediaType === 'video' ? 'video' : 'image',
    alt: str(b.alt, 300),
    caption: str(b.caption, 300),
    poster: safeUrl(b.poster),
    autoplay: bool(b.autoplay),
    flip: bool(b.flip),
    wide: bool(b.wide),
    buttonLabel: str(b.buttonLabel, 60),
    buttonHref: safeHref(b.buttonHref),
  };
}

function cleanPost(p) {
  if (!p || typeof p !== 'object') return null;
  const slug = str(p.slug, 80).toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  return {
    slug,
    title: str(p.title, 200) || 'Untitled',
    description: str(p.description, 320),
    tag: str(p.tag, 40),
    readTime: str(p.readTime, 30),
    date: /^\d{4}-\d{2}-\d{2}$/.test(p.date) ? p.date : new Date().toISOString().slice(0, 10),
    author: str(p.author, 80) || 'Flazyn Team',
    image: safeUrl(p.image),
    imageAlt: str(p.imageAlt, 300),
    body: typeof p.body === 'string'
      ? str(p.body, 60000)
      : Array.isArray(p.body)
        ? p.body.slice(0, 300).map((b) => ({
          type: ['h2', 'ul'].includes(b?.type) ? b.type : 'p',
          text: str(b?.text, 5000),
          items: Array.isArray(b?.items) ? b.items.slice(0, 50).map((i) => str(i, 1000)) : undefined,
        }))
        : '',
  };
}

export function cleanContent(input = {}) {
  const c = input && typeof input === 'object' ? input : {};
  const posts = Array.isArray(c.posts) ? c.posts.slice(0, 300).map(cleanPost).filter(Boolean) : null;
  if (posts) {
    const seen = new Set();
    for (const p of posts) { if (seen.has(p.slug)) p.slug = `${p.slug}-${seen.size}`; seen.add(p.slug); }
  }
  const email = str(c.settings?.email, 200);
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    text: cleanMap(c.text, (v) => (typeof v === 'string' ? str(v, 6000) : undefined)),
    media: cleanMap(c.media, cleanMedia),
    blocks: cleanMap(c.blocks, (v) => (Array.isArray(v) ? v.slice(0, 40).map(cleanBlock).filter(Boolean) : undefined), 300),
    seo: cleanMap(c.seo, (v) => (v && typeof v === 'object' ? { title: str(v.title, 160), description: str(v.description, 320) } : undefined), 500),
    settings: {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? email : '',
      tagline: str(c.settings?.tagline, 200),
    },
    posts,
  };
}
