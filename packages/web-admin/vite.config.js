import * as path from 'node:path';  

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {} // Fix process.env undefined error
  },
  base: '/admin/', // Base path for admin routes
  resolve: {
    alias: {
      '@': path.resolve(import.meta.url, './src')
    }
  }
});