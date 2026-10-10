import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 4173,
    strictPort: true,
    open: false
  },
  preview: {
    port: 4173,
    strictPort: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/react-router')) {
              return 'react-vendor';
            }
            if (
              id.includes('/framer-motion/') ||
              id.includes('framer-motion') ||
              id.includes('/lenis/') ||
              id.includes('/gsap/')
            ) {
              return 'motion-vendor';
            }
            if (id.includes('/lucide-react/')) {
              return 'icons';
            }
            return 'vendor';
          }
        }
      }
    }
  }
});
