import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Serves /api/* from the same files Vercel deploys as serverless
// functions, so forms work under `npm run dev` too.
function devApi() {
  return {
    name: 'flazyn-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        const mod = await server.ssrLoadModule('/api/contact.js');
        await mod.default(req, res);
      });
    },
  };
}

export default defineConfig(({ mode, isSsrBuild }) => {
  // Expose .env.local values (RESEND_API_KEY etc.) to the dev API only —
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
