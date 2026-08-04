import { resolve } from 'path';
import pluginGraphql from '@rollup/plugin-graphql';
import type { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react';

const config: StorybookConfig = {
  // Anchored to the literal `src` so the glob can't descend into pnpm's nested symlinks.
  stories: [
    '../../packages/*/src/**/*.stories.@(ts|tsx)',
    // `application-icons` reads SVGs from `packages/assets`, not a component package.
    '../src/**/*.stories.@(ts|tsx)',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  core: {
    disableTelemetry: true,
  },

  // Storybook builds its own `iframe.html`, so `visual-testing-app/index.html`'s fonts don't carry over.
  previewHead: (head) => `
    ${head}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Open+Sans:ital,wght@0,300;0,400;0,700;1,400;1,700&display=swap"
      rel="stylesheet"
    />
  `,

  viteFinal: async (viteConfig) => {
    viteConfig.resolve = viteConfig.resolve || {};
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      // Published `packages/*` must not depend on this private workspace; root tsconfig `paths` mirrors it.
      '@/storybook-helpers': resolve(__dirname, '../src/helpers'),
      // Reason in `src/stubs/msw.ts`.
      'msw/browser': resolve(__dirname, '../src/stubs/msw.ts'),
      'msw/core/http': resolve(__dirname, '../src/stubs/msw.ts'),
    };

    viteConfig.plugins?.push(
      // `apollo-client.ts` imports a `.graphql` document.
      pluginGraphql(),
      react({
        jsxImportSource: '@emotion/react',
        babel: { plugins: ['@emotion/babel-plugin'] },
      })
    );

    return viteConfig;
  },
};

export default config;
