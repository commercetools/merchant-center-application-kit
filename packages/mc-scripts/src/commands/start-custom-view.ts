import path from 'path';
import pluginGraphql from '@rollup/plugin-graphql';
import pluginReact from '@vitejs/plugin-react-swc';
import fs from 'fs-extra';
import { createServer, type Plugin } from 'vite';
import { processConfig } from '@commercetools-frontend/application-config';
import { packageLocation as applicationStaticAssetsPath } from '@commercetools-frontend/assets';
import { generateTemplate } from '@commercetools-frontend/mc-html-template';
import paths from '../config/paths';
import pluginCustomApplication from '../vite-plugins/vite-plugin-custom-application';
import pluginSvgr from '../vite-plugins/vite-plugin-svgr';

async function run() {
  const DEFAULT_PORT = parseInt(String(process.env.HTTP_PORT), 10) || 3001;
  console.log('----> Loading application config...');
  // TODO: Load the Custom View config file first.
  const applicationConfig = processConfig();
  // const applicationConfig = {
  //   name: 'Custom View Template Starter',
  //   cloudIdentifier: 'gcp-eu',
  //   env: {
  //     mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
  //     development: {
  //       initialProjectKey: 'almond-40',
  //     },
  //   },
  //   oAuthScopes: {
  //     view: ['view_products'],
  //     manage: ['manage_products'],
  //   },
  // };
  console.log({ applicationConfig });

  // Ensure the `/public` folder exists.
  fs.mkdirSync(paths.appBuild, { recursive: true });

  // Generate `index.html` (template).
  const appEntryPoint = path.relative(paths.appRoot, paths.entryPoint);
  const html = generateTemplate({
    // type: 'customView',
    // type: 'application',
    // Define the module entry point (path relative to the `/public` folder).
    // NOTE: that this is different from the production configuration.
    scriptImports: [
      `<script type="module" src="/../${appEntryPoint}"></script>`,
    ],
  });
  // Write `index.html` (template) into the `/public` folder.
  fs.writeFileSync(paths.appIndexHtml, html, { encoding: 'utf8' });
  console.log(1);
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
      pluginReact(),
      pluginSvgr(),
      pluginCustomApplication(applicationConfig),
    ],
  });
  console.log(2);
  await server.listen();
  console.log(3);
  // Copy public assets to `/public` folder (even in development).
  fs.copySync(
    path.join(applicationStaticAssetsPath, 'html-page'),
    paths.appBuild,
    { dereference: true }
  );
  console.log(4);

  server.printUrls();
}

export default run;
