import fs from 'fs-extra';
import path from 'path';
import { build, type Plugin } from 'vite';
import pluginGraphql from '@rollup/plugin-graphql';
import pluginReact from '@vitejs/plugin-react';
import { generateTemplate } from '@commercetools-frontend/mc-html-template';
import { packageLocation as applicationStaticAssetsPath } from '@commercetools-frontend/assets';
import paths from '../config/paths';
import pluginSvgr from '../vite-plugins/vite-plugin-svgr';

async function run() {
  const DEFAULT_PORT = parseInt(String(process.env.HTTP_PORT), 10) || 3001;

  // Ensure the `/public` folder exists.
  fs.mkdirSync(paths.appBuild, { recursive: true });

  // Generate `index.html` (template).
  const appEntryPoint = path.relative(paths.appRoot, paths.entryPoint);
  const html = generateTemplate({
    // Define the module entry point (path relative from the `/public` folder).
    // NOTE: that this is different from the development configuration.
    scriptImports: [`<script type="module" src="/${appEntryPoint}"></script>`],
  });
  // Write `index.html` (template) into the `/public` folder.
  fs.writeFileSync(paths.appIndexHtml, html, { encoding: 'utf8' });

  await build({
    root: paths.appRoot,
    define: {
      'process.env.DEBUG': JSON.stringify(false),
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    build: {
      outDir: 'public',
      assetsDir: '.',
      rollupOptions: {
        // This is necessary to instruct Vite that the `index.html` (template)
        // is located in the `/public` folder.
        // NOTE that after the build, Vite will write the `index.html` (template)
        // at the `/public/public/index.html` location. See `fs.renameSync` below.
        input: paths.appIndexHtml,
      },
    },
    server: {
      port: DEFAULT_PORT,
    },
    plugins: [
      pluginGraphql() as Plugin,
      pluginReact({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      pluginSvgr({
        svgrOptions: {
          icon: false,
          svgoConfig: {
            plugins: [
              {
                // https://github.com/svg/svgo#default-preset
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
            ],
          },
        },
      }),
    ],
  });

  // Rename `/public/public/index.html` to `/public/index.html.template`
  fs.renameSync(
    // Because of our custom entry point path (`/public/index.html`),
    // Vite will write the `index.html` to `/public/public/index.html`.
    // We need to move this file to the `/public` folder and rename it
    // to `index.html.template` (as expected by the `compile-html` command).
    path.join(paths.appBuild, 'public/index.html'),
    paths.appIndexHtmlTemplate
  );
  // Clean up nested folder
  fs.rmdirSync(path.join(paths.appBuild, 'public'));

  // Copy public assets
  fs.copySync(
    path.join(applicationStaticAssetsPath, 'html-page'),
    paths.appBuild,
    { dereference: true }
  );
}

export default run;
