// CMS storage. Production: Vercel Blob (needs BLOB_READ_WRITE_TOKEN, which
// Vercel adds when a Blob store is connected to the project).
// Local development without a token: files under .cms-local/ (gitignored),
// with media served by the Vite dev server at /cms-media/*.
//
// Layout
//   cms/draft-<rand>.json       the admin's working copy (latest wins)
//   cms/published-<rand>.json   what the live site is built from
//   cms/history/<iso>-<rand>.json  a snapshot of every publish
//   media/<name>-<rand>.<ext>   uploaded images and videos
//
// JSON documents get a fresh random URL on every write so CDN caching can
// never serve a stale version; older copies are deleted afterwards.
import fs from 'node:fs/promises';
import path from 'node:path';

const LOCAL_DIR = path.join(process.cwd(), '.cms-local');
const useBlob = () => !!process.env.BLOB_READ_WRITE_TOKEN;

export function storageMode() {
  if (useBlob()) return 'blob';
  return process.env.VERCEL ? 'missing' : 'local';
}

function assertWritable() {
  if (storageMode() === 'missing') {
    throw Object.assign(new Error('Storage is not configured. Connect a Vercel Blob store to this project.'), { status: 503 });
  }
}

/* ─── Vercel Blob ─── */
const blobApi = () => import('@vercel/blob');

async function blobList(prefix) {
  const { list } = await blobApi();
  const all = [];
  let cursor;
  do {
    const page = await list({ prefix, cursor, limit: 1000 });
    all.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return all.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
}

async function fetchJson(url) {
  const r = await fetch(url, { cache: 'no-store' });
  if (!r.ok) throw new Error(`Could not read ${url} (${r.status})`);
  return r.json();
}

/* ─── public API ─── */
export async function readDoc(name) {
  if (useBlob()) {
    const [latest] = await blobList(`cms/${name}-`);
    return latest ? fetchJson(latest.url) : null;
  }
  try {
    return JSON.parse(await fs.readFile(path.join(LOCAL_DIR, 'cms', `${name}.json`), 'utf8'));
  } catch {
    return null;
  }
}

export async function writeDoc(name, data) {
  assertWritable();
  const body = JSON.stringify(data);
  if (useBlob()) {
    const { put, del } = await blobApi();
    const before = await blobList(`cms/${name}-`);
    await put(`cms/${name}.json`, body, { access: 'public', addRandomSuffix: true, contentType: 'application/json', cacheControlMaxAge: 60 });
    if (before.length) await del(before.map((b) => b.url));
    return;
  }
  await fs.mkdir(path.join(LOCAL_DIR, 'cms'), { recursive: true });
  await fs.writeFile(path.join(LOCAL_DIR, 'cms', `${name}.json`), body);
}

export async function addHistory(data) {
  assertWritable();
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const body = JSON.stringify(data);
  if (useBlob()) {
    const { put } = await blobApi();
    await put(`cms/history/${stamp}.json`, body, { access: 'public', addRandomSuffix: true, contentType: 'application/json' });
    return;
  }
  await fs.mkdir(path.join(LOCAL_DIR, 'cms', 'history'), { recursive: true });
  await fs.writeFile(path.join(LOCAL_DIR, 'cms', 'history', `${stamp}.json`), body);
}

export async function listHistory() {
  if (useBlob()) {
    return (await blobList('cms/history/')).slice(0, 50).map((b) => ({ id: b.pathname, date: b.uploadedAt }));
  }
  try {
    const dir = path.join(LOCAL_DIR, 'cms', 'history');
    const files = (await fs.readdir(dir)).sort().reverse().slice(0, 50);
    return Promise.all(files.map(async (f) => ({ id: f, date: (await fs.stat(path.join(dir, f))).mtime.toISOString() })));
  } catch {
    return [];
  }
}

export async function readHistory(id) {
  if (useBlob()) {
    const hit = (await blobList('cms/history/')).find((b) => b.pathname === id);
    return hit ? fetchJson(hit.url) : null;
  }
  if (!/^[\w.-]+\.json$/.test(id)) return null;
  try {
    return JSON.parse(await fs.readFile(path.join(LOCAL_DIR, 'cms', 'history', id), 'utf8'));
  } catch {
    return null;
  }
}

export async function listMedia() {
  if (useBlob()) {
    return (await blobList('media/')).map((b) => ({ url: b.url, name: b.pathname.replace(/^media\//, ''), size: b.size, date: b.uploadedAt }));
  }
  try {
    const dir = path.join(LOCAL_DIR, 'media');
    const files = await fs.readdir(dir);
    const items = await Promise.all(files.map(async (f) => {
      const st = await fs.stat(path.join(dir, f));
      return { url: `/cms-media/${f}`, name: f, size: st.size, date: st.mtime.toISOString() };
    }));
    return items.sort((a, b) => b.date.localeCompare(a.date));
  } catch {
    return [];
  }
}

export async function deleteMedia(url) {
  assertWritable();
  const known = (await listMedia()).find((m) => m.url === url);
  if (!known) throw Object.assign(new Error('File not found.'), { status: 404 });
  if (useBlob()) {
    const { del } = await blobApi();
    await del(url);
    return;
  }
  await fs.unlink(path.join(LOCAL_DIR, 'media', known.name));
}

/* Local development only — production uploads go straight from the
   browser to Vercel Blob (see the "upload" admin action). */
export async function saveLocalMedia(name, buffer) {
  const safe = name.replace(/[^\w.-]/g, '-').slice(-80);
  const ext = path.extname(safe);
  const file = `${path.basename(safe, ext)}-${Date.now().toString(36)}${ext}`;
  await fs.mkdir(path.join(LOCAL_DIR, 'media'), { recursive: true });
  await fs.writeFile(path.join(LOCAL_DIR, 'media', file), buffer);
  return { url: `/cms-media/${file}`, name: file, size: buffer.length };
}

export const LOCAL_MEDIA_DIR = path.join(LOCAL_DIR, 'media');
