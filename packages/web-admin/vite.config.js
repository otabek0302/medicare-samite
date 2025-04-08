import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {} // Fix process.env undefined error
  },
  base: '/admin/', // Base path for admin routes
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});