import { resolve } from 'path';
import pluginGraphql from '@rollup/plugin-graphql';
import type { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react';

const config: StorybookConfig = {
  // Stories live here so the published packages carry no test scaffolding.
  stories: ['../src/**/*.stories.@(ts|tsx)'],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  core: {
    disableTelemetry: true,
  },

  // Storybook generates `iframe.html`, so anything the components need at the
  // document level has to be injected here.
  previewHead: (head) => `
    ${head}
    <!-- Runtime globals the MC injects via \`mc-html-template\` and Storybook doesn't.
         Without \`app\`, \`custom-views-selector/index.ts\` lazy-resolves to a null component;
         without \`process\`, \`use-custom-views-connector\` throws reading \`process.env\`. -->
    <script>
      window.app = { applicationName: 'storybook', mcApiUrl: 'http://localhost:8080' };
      window.process = window.process || { env: {} };
    </script>
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
      // Reason in `src/stubs/msw.ts`.
      'msw/browser': resolve(__dirname, '../src/stubs/msw.ts'),
      'msw/core/http': resolve(__dirname, '../src/stubs/msw.ts'),
      // Reason in `src/stubs/supported-locales.ts`.
      '../supported-locales': resolve(
        __dirname,
        '../src/stubs/supported-locales.ts'
      ),
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
