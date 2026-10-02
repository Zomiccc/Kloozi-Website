// Small HTTP helpers shared by the API functions. Files in api/_lib are not
// deployed as functions (Vercel ignores the leading underscore).

export async function readBody(req, limit = 1_000_000) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > limit) throw Object.assign(new Error('Request too large'), { status: 413 });
  }
  return JSON.parse(raw || '{}');
}

export async function readRaw(req, limit) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) throw Object.assign(new Error('File too large'), { status: 413 });
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export function send(res, status, body, headers = {}) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
  res.end(JSON.stringify(body));
}

/* Reject cross-site writes: the Origin (or Referer) must match our host. */
export function sameOrigin(req) {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const origin = req.headers.origin || req.headers.referer;
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function clientIp(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
}
