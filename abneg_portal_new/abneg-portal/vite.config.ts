import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  // For production build, the proxy is not needed as API calls go directly to Vercel functions
  // For development, the proxy handles API calls to local Express server
});
