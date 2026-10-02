import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Serves /api/* from the same files Vercel deploys as serverless functions
// (including the dynamic /api/admin/[action] route), plus locally stored CMS
// media at /cms-media/*, so the forms and the admin panel work under
// `npm run dev` exactly as they do in production.
const MIME = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.avif': 'image/avif', '.mp4': 'video/mp4', '.webm': 'video/webm' };

function devApi() {
  return {
    name: 'flazyn-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost');
        let file = null;
        if (url.pathname === '/api/contact') file = '/api/contact.js';
        else if (url.pathname === '/api/content') file = '/api/content.js';
        else if (url.pathname.startsWith('/api/admin/')) {
          file = '/api/admin/[action].js';
          req.query = { ...Object.fromEntries(url.searchParams), action: url.pathname.slice('/api/admin/'.length) };
        }
        if (file) {
          const mod = await server.ssrLoadModule(file);
          return mod.default(req, res);
        }
        if (url.pathname.startsWith('/cms-media/')) {
          const name = path.basename(decodeURIComponent(url.pathname));
          const full = path.join(process.cwd(), '.cms-local', 'media', name);
          if (!fs.existsSync(full)) { res.statusCode = 404; return res.end(); }
          res.setHeader('Content-Type', MIME[path.extname(name).toLowerCase()] || 'application/octet-stream');
          return fs.createReadStream(full).pipe(res);
        }
        next();
      });
    },
  };
}

export default defineConfig(({ mode, isSsrBuild }) => {
  // Expose .env.local values (RESEND_API_KEY, ADMIN_* …) to the dev API only —
  // they are NOT prefixed with VITE_, so they never reach the browser bundle.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    plugins: [react(), devApi()],
    server: { port: 5174 },
    build: {
      outDir: isSsrBuild ? 'dist-ssr' : 'dist',
      sourcemap: false,
      target: 'es2020',
      rollupOptions: isSsrBuild ? {} : {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            motion: ['framer-motion'],
          },
        },
      },
    },
  };
});
