const fs = require('fs-extra');
const path = require('path');
const { createServer } = require('vite');
const pluginGraphql = require('@rollup/plugin-graphql');
const pluginReact = require('@vitejs/plugin-react').default;
const { processConfig } = require('@commercetools-frontend/application-config');
const {
  replaceHtmlPlaceholders,
  processHeaders,
  generateTemplate,
} = require('@commercetools-frontend/mc-html-template');
const {
  createMcDevAuthenticationMiddleware,
} = require('@commercetools-frontend/mc-dev-authentication');
const {
  packageLocation: applicationStaticAssetsPath,
} = require('@commercetools-frontend/assets');
const paths = require('../config/paths');

const DEFAULT_PORT = parseInt(process.env.HTTP_PORT, 10) || 3001;

const pluginCustomApplication = (applicationConfig) => {
  /**
   * @type {import('vite').Plugin}
   */
  return {
    name: 'custom-application',
    /**
     * @type {import('vite').ServerHook}
     */
    configureServer(server) {
      return () => {
        // Users do not need to have/maintain the `index.html` (as expected by Vite)
        // as it's generated and maintained by the Custom Application CLI.
        // Therefore, the generated `index.html` (template) is written into the `/public`
        // folder so that it's gitignored.
        // As a result, we need to make sure to point the URI path to the correct location.
        server.middlewares.use((req, res, next) => {
          if (req.url === '/index.html') {
            req.url = '/public/index.html';
          }
          next();
        });

        // Handle auth routes for internal local development.
        server.middlewares.use(
          createMcDevAuthenticationMiddleware(applicationConfig)
        );
      };
    },
    /**
     * @type {import('vite').IndexHtmlTransformHook}
     */
    transformIndexHtml(rawHtml, _ctx) {
      const compiledHeaders = processHeaders(applicationConfig);
      const enhancedLocalEnv = Object.assign(
        {},
        applicationConfig.env,
        // Now that the app config is defined as a `env.json`, when we start the FE app
        // to point to the local backend API by passing the `MC_API_URL` env does not
        // work anymore). To make it work again, we can override the `env.json` config
        // with the env variable before injecting the values into the index.html.
        // NOTE: this is only necessary for development.
        process.env.MC_API_URL
          ? {
              mcApiUrl: process.env.MC_API_URL,
            }
          : {}
      );

      // Resolve the placeholders of the `index.html` (template) file, before serving it.
      const html = replaceHtmlPlaceholders(rawHtml, {
        env: enhancedLocalEnv,
        headers: compiledHeaders,
      });
      return html;
    },
  };
};

const execute = async () => {
  // Load the Custom Application config file first.
  const applicationConfig = processConfig();

  // Ensure the `/public` folder exists.
  fs.mkdirSync(paths.appBuild, { recursive: true });

  // Generate `index.html` (template).
  const appEntryPoint = path.relative(paths.appRoot, paths.entryPoint);
  const html = generateTemplate({
    // Define the module entry point (path relative to the `/public` folder).
    // NOTE: that this is different from the production configuration.
    scriptImports: [
      `<script type="module" src="/../${appEntryPoint}"></script>`,
    ],
  });
  // Write `index.html` (template) into the `/public` folder.
  fs.writeFileSync(paths.appIndexHtml, html, { encoding: 'utf8' });

  // TODO: allow to pass additional config options.
  // * `define`
  // * `plugins`
  const server = await createServer({
    configFile: false,
    root: paths.appRoot,
    define: {
      'process.env.DEBUG': JSON.stringify(false),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
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
      pluginCustomApplication(applicationConfig),
    ],
  });
  await server.listen();

  // Copy public assets to `/public` folder (even in development).
  fs.copySync(
    path.join(applicationStaticAssetsPath, 'html-page'),
    paths.appBuild,
    { dereference: true }
  );

  server.printUrls();
};

execute().catch((error) => {
  if (error && error.message) {
    console.error(error.message);
  }
  process.exit(1);
});
