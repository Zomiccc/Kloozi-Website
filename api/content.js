// GET /api/content — the published CMS content (public). The live site gets
// it baked into each page at build time; this endpoint serves dev mode and
// anything that needs a fresh copy at runtime.
import { readDoc } from './_lib/storage.js';
import { send } from './_lib/http.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return send(res, 405, { error: 'Method not allowed.' });
  try {
    return send(res, 200, (await readDoc('published')) || {});
  } catch (err) {
    console.error('[content]', err);
    return send(res, 200, {});
  }
}
