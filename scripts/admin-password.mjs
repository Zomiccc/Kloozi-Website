// Generates the admin credentials for the environment variables.
//   npm run admin:password -- "your-strong-password"
// Prints ADMIN_PASSWORD_HASH and a fresh ADMIN_SESSION_SECRET to paste into
// Vercel (Settings → Environment Variables) and .env.local.
import crypto from 'node:crypto';
import { hashPassword } from '../api/_lib/auth.js';

const password = process.argv[2];
if (!password || password.length < 12) {
  console.error('Usage: npm run admin:password -- "a-strong-password-of-12+-characters"');
  process.exit(1);
}
console.log(`ADMIN_PASSWORD_HASH=${hashPassword(password)}`);
console.log(`ADMIN_SESSION_SECRET=${crypto.randomBytes(32).toString('base64url')}`);
