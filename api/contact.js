// POST /api/contact — Vercel serverless function.
// Validates a contact / early-access submission and emails it to the
// Flazyn inbox through Resend (https://resend.com/docs/api-reference).
//
// Environment variables (Vercel → Project → Settings → Environment Variables,
// or .env.local for `npm run dev`). NEVER put these in client code.
//   RESEND_API_KEY      required
//   CONTACT_TO_EMAIL    required — inbox that receives submissions
//   CONTACT_FROM_EMAIL  optional — verified sender, e.g. "Flazyn <hello@flazyn.com>".
//                       Defaults to Resend's test sender, which only delivers to
//                       the Resend account owner's address.

const LIMITS = { name: 100, email: 200, company: 120, teamSize: 20, topic: 60, message: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 20000) throw new Error('too large');
  }
  return JSON.parse(raw || '{}');
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'Method not allowed.' });
  }

  let data;
  try {
    data = await readBody(req);
  } catch {
    return send(res, 400, { error: 'Invalid request.' });
  }

  // Honeypot: bots fill the hidden "website" field. Pretend success.
  if (data.website) return send(res, 200, { ok: true });

  const type = data.type === 'early-access' ? 'early-access' : 'contact';
  const clean = {};
  for (const [k, max] of Object.entries(LIMITS)) {
    clean[k] = typeof data[k] === 'string' ? data[k].trim().slice(0, max) : '';
  }

  if (!clean.name) return send(res, 400, { error: 'Please enter your name.' });
  if (!EMAIL_RE.test(clean.email)) return send(res, 400, { error: 'Please enter a valid email address.' });
  if (type === 'contact' && clean.message.length < 10) return send(res, 400, { error: 'Please write a slightly longer message.' });
  if (type === 'early-access' && data.consent !== 'yes') return send(res, 400, { error: 'Please agree to be contacted about early access.' });

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
    console.error('[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set');
    return send(res, 500, { error: 'The form is not configured yet.' });
  }

  const label = type === 'early-access' ? 'Early access request' : `Contact: ${clean.topic || 'General question'}`;
  const rows = [
    ['Type', label],
    ['Name', clean.name],
    ['Email', clean.email],
    ['Company', clean.company || '—'],
    ...(type === 'early-access' ? [['Team size', clean.teamSize || '—'], ['Consent to emails', 'Yes']] : []),
    ['Message', clean.message || '—'],
  ];
  const html = `<h2 style="font-family:sans-serif">${escapeHtml(label)}</h2><table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top"><b>${escapeHtml(k)}</b></td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
    .join('')}</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL || 'Flazyn Website <onboarding@resend.dev>',
        to: CONTACT_TO_EMAIL.split(',').map((s) => s.trim()),
        reply_to: clean.email,
        subject: `[Flazyn] ${label} — ${clean.name}`,
        html,
        text,
      }),
    });
    if (!r.ok) {
      console.error('[contact] Resend error', r.status, await r.text());
      return send(res, 502, { error: 'We couldn’t send your message right now.' });
    }
    return send(res, 200, { ok: true });
  } catch (err) {
    console.error('[contact] Network error', err);
    return send(res, 502, { error: 'We couldn’t send your message right now.' });
  }
}
