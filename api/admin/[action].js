// /api/admin/<action> — every admin operation in one serverless function
// (keeps the project within Vercel's function limits).
//
//   POST login · POST logout · GET session
//   GET content · PUT content          the draft
//   POST publish                       draft → live (+ history, + rebuild)
//   GET history · POST restore
//   GET media · POST media-delete
//   POST upload                        Vercel Blob client-upload handshake
//   POST upload-local                  dev-only upload into .cms-local/
import { readBody, readRaw, send, sameOrigin, clientIp } from '../_lib/http.js';
import { adminConfigured, verifyPassword, createSession, clearSession, getSession, loginAllowed, recordFailedLogin } from '../_lib/auth.js';
import { storageMode, readDoc, writeDoc, addHistory, listHistory, readHistory, listMedia, deleteMedia, saveLocalMedia } from '../_lib/storage.js';
import { cleanContent } from '../_lib/content.js';

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
const VIDEO_TYPES = ['video/mp4', 'video/webm'];
const MAX_UPLOAD = 150 * 1024 * 1024;

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function triggerRebuild() {
  const hook = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!hook) return 'not-configured';
  try {
    const r = await fetch(hook, { method: 'POST' });
    return r.ok ? 'triggered' : `failed (${r.status})`;
  } catch {
    return 'failed';
  }
}

export default async function handler(req, res) {
  const action = String(req.query?.action || '');
  const method = req.method;

  try {
    // ── public: login / session / logout ──
    if (action === 'session' && method === 'GET') {
      const s = getSession(req);
      return send(res, 200, { authenticated: !!s, email: s?.sub || null, configured: adminConfigured(), storage: storageMode(), rebuild: !!process.env.VERCEL_DEPLOY_HOOK_URL });
    }
    if (action === 'login' && method === 'POST') {
      if (!sameOrigin(req)) return send(res, 403, { error: 'Forbidden.' });
      if (!adminConfigured()) return send(res, 503, { error: 'Admin login is not configured yet. Set ADMIN_EMAIL, ADMIN_PASSWORD_HASH and ADMIN_SESSION_SECRET.' });
      const ip = clientIp(req);
      if (!loginAllowed(ip)) return send(res, 429, { error: 'Too many attempts. Try again in 15 minutes.' });
      const { email, password } = await readBody(req, 10_000);
      const ok = String(email || '').trim().toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase() && verifyPassword(password, process.env.ADMIN_PASSWORD_HASH);
      if (!ok) {
        recordFailedLogin(ip);
        await wait(800);
        return send(res, 401, { error: 'Incorrect email or password.' });
      }
      createSession(res, process.env.ADMIN_EMAIL);
      return send(res, 200, { ok: true });
    }
    if (action === 'logout' && method === 'POST') {
      clearSession(res);
      return send(res, 200, { ok: true });
    }

    // ── Vercel Blob calls this endpoint itself when a client upload
    //    finishes (signed by Vercel, no cookie), so let it through to
    //    handleUpload, which verifies the signature. ──
    const isUploadCallback = action === 'upload' && method === 'POST' && req.headers['x-vercel-signature'];

    // ── everything below needs a valid admin session ──
    const session = getSession(req);
    if (!session && !isUploadCallback) return send(res, 401, { error: 'Please log in.' });
    if (method !== 'GET' && !isUploadCallback && !sameOrigin(req)) return send(res, 403, { error: 'Forbidden.' });

    switch (`${method} ${action}`) {
      case 'GET content': {
        const draft = await readDoc('draft');
        const published = await readDoc('published');
        return send(res, 200, { draft: draft || published || cleanContent({}), published: published || null });
      }
      case 'PUT content': {
        const body = await readBody(req, 2_000_000);
        const clean = cleanContent(body);
        await writeDoc('draft', clean);
        return send(res, 200, { ok: true, updatedAt: clean.updatedAt });
      }
      case 'POST publish': {
        const draft = await readDoc('draft');
        if (!draft) return send(res, 400, { error: 'Nothing to publish yet — save a draft first.' });
        const clean = cleanContent(draft);
        await writeDoc('published', clean);
        await addHistory(clean);
        const rebuild = await triggerRebuild();
        return send(res, 200, { ok: true, rebuild, publishedAt: clean.updatedAt });
      }
      case 'GET history':
        return send(res, 200, { items: await listHistory() });
      case 'POST restore': {
        const { id } = await readBody(req, 10_000);
        const snap = await readHistory(String(id || ''));
        if (!snap) return send(res, 404, { error: 'Version not found.' });
        await writeDoc('draft', cleanContent(snap));
        return send(res, 200, { ok: true });
      }
      case 'GET media':
        return send(res, 200, { items: await listMedia(), storage: storageMode() });
      case 'POST media-delete': {
        const { url } = await readBody(req, 10_000);
        await deleteMedia(String(url || ''));
        return send(res, 200, { ok: true });
      }
      case 'POST upload': {
        if (storageMode() !== 'blob') return send(res, 400, { error: 'Blob storage is not configured.' });
        const { handleUpload } = await import('@vercel/blob/client');
        const body = await readBody(req, 100_000);
        const result = await handleUpload({
          body,
          request: req,
          onBeforeGenerateToken: async (pathname) => {
            if (!getSession(req)) throw new Error('Not authorised');
            if (!/^media\/[\w.-]{1,120}$/.test(pathname)) throw new Error('Invalid file name');
            return {
              allowedContentTypes: [...IMAGE_TYPES, ...VIDEO_TYPES],
              maximumSizeInBytes: MAX_UPLOAD,
              addRandomSuffix: true,
            };
          },
          onUploadCompleted: async () => {},
        });
        return send(res, 200, result);
      }
      case 'POST upload-local': {
        if (storageMode() !== 'local') return send(res, 400, { error: 'Local uploads are only available in development.' });
        const type = String(req.headers['content-type'] || '').split(';')[0];
        if (![...IMAGE_TYPES, ...VIDEO_TYPES].includes(type)) return send(res, 415, { error: 'Unsupported file type.' });
        const name = String(req.headers['x-filename'] || 'upload').slice(0, 120);
        const buffer = await readRaw(req, MAX_UPLOAD);
        return send(res, 200, await saveLocalMedia(name, buffer));
      }
      default:
        return send(res, 404, { error: 'Unknown action.' });
    }
  } catch (err) {
    console.error(`[admin:${action}]`, err);
    return send(res, err.status || 500, { error: err.status ? err.message : 'Something went wrong.' });
  }
}
