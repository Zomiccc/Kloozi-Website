import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Zomic marketing site — same stack as the product app so the two feel
// like one company. Vite + React + Tailwind + Framer Motion.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split the big vendors so the main app chunk stays small and
        // pages lazy-load their dependencies on navigation.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
});
