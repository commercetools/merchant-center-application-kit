import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import graphql from '@rollup/plugin-graphql';
import customApplicationConfig from './vite-plugin-custom-application';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.DEBUG': JSON.stringify(false),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    customApplicationConfig(),
    graphql(),
  ],
  server: {
    port: 3001,
  },
});
