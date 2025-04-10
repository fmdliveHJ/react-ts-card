// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components/*': path.resolve(__dirname, './src/components/*'),
      '@context/*': path.resolve(__dirname, './src/context/*'),
      '@hooks/*': path.resolve(__dirname, './src/hooks/*'),
      '@mock/*': path.resolve(__dirname, './src/mock/*'),
      '@model/*': path.resolve(__dirname, './src/model/*'),
      '@pages/*': path.resolve(__dirname, './src/pages/*'),
      '@styles/*': path.resolve(__dirname, './src/styles/*'),
      '@remote/*': path.resolve(__dirname, './src/remote/*'),
      '@constants/*': path.resolve(__dirname, './src/constants/*'),
      '@home/*': path.resolve(__dirname, './src/components/home/*'),
      '@layouts/*': path.resolve(__dirname, './src/layouts/*'),
      '@atoms/*': path.resolve(__dirname, './src/atoms/*'),
    },
  },
});
