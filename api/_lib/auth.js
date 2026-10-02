// Admin authentication: one admin account configured by environment
// variables, scrypt password hash, HMAC-signed HttpOnly session cookie.
//
//   ADMIN_EMAIL           the admin's login email
//   ADMIN_PASSWORD_HASH   generate with:  npm run admin:password
//   ADMIN_SESSION_SECRET  long random string (also printed by that script)
import crypto from 'node:crypto';

const SESSION_COOKIE = 'fz_session';
const FLAG_COOKIE = 'fz_admin'; // readable by the page, only says "load the editor UI"
const SESSION_HOURS = 12;
const SCRYPT = { N: 16384, r: 8, p: 1 };

export function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 64, SCRYPT);
  // ":" separators (not "$") so .env loaders never try to expand the value.
  return `scrypt:${salt.toString('base64url')}:${hash.toString('base64url')}`;
}

export function verifyPassword(password, stored) {
  const [alg, salt, hash] = String(stored || '').split(/[:$]/);
  if (alg !== 'scrypt' || !salt || !hash) return false;
  const expected = Buffer.from(hash, 'base64url');
  const actual = crypto.scryptSync(String(password), Buffer.from(salt, 'base64url'), expected.length, SCRYPT);
  return crypto.timingSafeEqual(actual, expected);
}

export function adminConfigured() {
  return !!(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD_HASH && process.env.ADMIN_SESSION_SECRET);
}

const secret = () => process.env.ADMIN_SESSION_SECRET || '';
const hmac = (data) => crypto.createHmac('sha256', secret()).update(data).digest('base64url');
// Changing the password invalidates every existing session.
const passwordVersion = () => crypto.createHash('sha256').update(process.env.ADMIN_PASSWORD_HASH || '').digest('base64url').slice(0, 12);

function parseCookies(req) {
  const out = {};
  for (const part of String(req.headers.cookie || '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

function cookie(name, value, { maxAge, httpOnly }) {
  const secure = process.env.VERCEL ? '; Secure' : '';
  return `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Strict${httpOnly ? '; HttpOnly' : ''}${secure}`;
}

export function createSession(res, email) {
  const payload = Buffer.from(JSON.stringify({ sub: email, pv: passwordVersion(), exp: Date.now() + SESSION_HOURS * 3600_000 })).toString('base64url');
  const token = `${payload}.${hmac(payload)}`;
  const maxAge = SESSION_HOURS * 3600;
  res.setHeader('Set-Cookie', [
    cookie(SESSION_COOKIE, token, { maxAge, httpOnly: true }),
    cookie(FLAG_COOKIE, '1', { maxAge, httpOnly: false }),
  ]);
}

export function clearSession(res) {
  res.setHeader('Set-Cookie', [
    cookie(SESSION_COOKIE, '', { maxAge: 0, httpOnly: true }),
    cookie(FLAG_COOKIE, '', { maxAge: 0, httpOnly: false }),
  ]);
}

export function getSession(req) {
  if (!adminConfigured()) return null;
  const token = parseCookies(req)[SESSION_COOKIE];
  if (!token) return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expected = hmac(payload);
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (data.exp < Date.now() || data.pv !== passwordVersion() || data.sub !== process.env.ADMIN_EMAIL) return null;
    return data;
  } catch {
    return null;
  }
}

/* Best-effort brute-force protection (per server instance). */
const attempts = new Map();
export function loginAllowed(ip) {
  const now = Date.now();
  const a = (attempts.get(ip) || []).filter((t) => now - t < 15 * 60_000);
  attempts.set(ip, a);
  return a.length < 8;
}
export function recordFailedLogin(ip) {
  attempts.set(ip, [...(attempts.get(ip) || []), Date.now()]);
}
