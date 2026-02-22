import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['@mui/material'],
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Fidelity IRA Modeling',
        short_name: 'IRA Modeling',
        description: 'Model and analyze your IRA portfolio allocations',
        theme_color: '#1976d2',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@/app': path.resolve(__dirname, './src/app'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/widgets': path.resolve(__dirname, './src/widgets'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/entities': path.resolve(__dirname, './src/entities'),
      '@/shared': path.resolve(__dirname, './src/shared'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [
      './src/tests/setup.ts',
      './src/tests/indexeddb.setup.ts',
      './src/tests/global-auth-mock.ts',
    ],
    deps: {
      inline: ['@mui/material', '@mui/x-data-grid'],
    },
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.spec.ts',
        '**/*.spec.tsx',
      ],
    },
  },
});
