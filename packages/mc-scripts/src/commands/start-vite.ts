import fs from 'fs-extra';
import path from 'path';
import { createServer, type Plugin, type Connect } from 'vite';
import pluginGraphql from '@rollup/plugin-graphql';
import pluginReact from '@vitejs/plugin-react';
import {
  type ApplicationRuntimeConfig,
  processConfig,
} from '@commercetools-frontend/application-config';
import {
  replaceHtmlPlaceholders,
  processHeaders,
  generateTemplate,
} from '@commercetools-frontend/mc-html-template';
import { createMcDevAuthenticationMiddleware } from '@commercetools-frontend/mc-dev-authentication';
import { packageLocation as applicationStaticAssetsPath } from '@commercetools-frontend/assets';
import paths from '../config/paths';

const pluginCustomApplication = (
  applicationConfig: ApplicationRuntimeConfig
): Plugin => {
  return {
    name: 'custom-application',
    configureServer(server) {
      return () => {
        // Users do not need to have/maintain the `index.html` (as expected by Vite)
        // as it's generated and maintained by the Custom Application CLI.
        // Therefore, the generated `index.html` (template) is written into the `/public`
        // folder so that it's gitignored.
        // As a result, we need to make sure to point the URI path to the correct location.
        server.middlewares.use((req, _res, next) => {
          if (req.url === '/index.html') {
            req.url = '/public/index.html';
          }
          next();
        });

        // Handle auth routes for internal local development.
        server.middlewares.use(
          createMcDevAuthenticationMiddleware(
            applicationConfig
          ) as Connect.NextHandleFunction
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

async function run() {
  const DEFAULT_PORT = parseInt(String(process.env.HTTP_PORT), 10) || 3001;

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

  const server = await createServer({
    root: paths.appRoot,
    define: {
      'process.env.DEBUG': JSON.stringify(false),
      'process.env.NODE_ENV': JSON.stringify('development'),
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
}

export default run;
