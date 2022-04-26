/* eslint-disable react-hooks/rules-of-hooks */
const fs = require('fs-extra');
const path = require('path');
const { build } = require('vite');
const pluginGraphql = require('@rollup/plugin-graphql');
const pluginReact = require('@vitejs/plugin-react').default;
const { useDynamicPublicPath } = require('vite-plugin-dynamic-publicpath');
const {
  generateTemplate,
  htmlScripts,
} = require('@commercetools-frontend/mc-html-template');
const {
  packageLocation: applicationStaticAssetsPath,
} = require('@commercetools-frontend/assets');
const paths = require('../config/paths');

const DEFAULT_PORT = parseInt(process.env.HTTP_PORT, 10) || 3001;

const pluginCustomApplication = () => {
  return {
    name: 'custom-application',
    /**
     * @type {import('vite').IndexHtmlTransformHook}
     */
    transformIndexHtml(rawHtml, _ctx) {
      // Ensure to use the `cdnUrl` value when loading the entry point.
      // NOTE: with Webpack this is done by setting the `__webpack_public_path__`.
      const html = rawHtml.replace(
        new RegExp(`<script type="module"(.*) src="(.*)">`, 'g'),
        `<script type="module"$1 src="__CDN_URL__$2">`
      );

      return {
        html,
        tags: [
          {
            tag: 'script',
            // Inject the functions to dynamically change the public path.
            // This is also used for the `cdnUrl` and is the equivalent
            // of Webpack's `__webpack_public_path__`.
            children: htmlScripts.publicPath,
            injectTo: 'body',
          },
        ],
      };
    },
  };
};

const execute = async () => {
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

  // TODO: allow to pass additional config options.
  // * `define`
  // * `plugins`
  await build({
    configFile: false,
    root: paths.appRoot,
    base: '', // <-- Very important, otherwise asset URLs start with `/`.
    define: {
      'process.env.DEBUG': JSON.stringify(false),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
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
      pluginGraphql(),
      pluginReact({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      pluginCustomApplication(),
      // This plugin allows to change the public path on runtime.
      // This is the equivalent of Webpack's `__webpack_public_path__`.
      // See original issue: https://github.com/vitejs/vite/issues/3522#issuecomment-874377284
      useDynamicPublicPath({
        dynamicImportHandler: 'window.__dynamicImportHandler__',
        dynamicImportPreload: 'window.__dynamicImportPreload__',
        assetsBase: '.',
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
};

execute().catch((error) => {
  if (error && error.message) {
    console.error(error.message);
  }
  process.exit(1);
});
