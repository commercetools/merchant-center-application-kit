import path from 'path';
import pluginGraphql from '@rollup/plugin-graphql';
import pluginReact from '@vitejs/plugin-react-swc';
import fs from 'fs-extra';
import { createServer, type Plugin } from 'vite';
import { processConfig } from '@commercetools-frontend/application-config';
import { packageLocation as applicationStaticAssetsPath } from '@commercetools-frontend/assets';
import {
  generateTemplate,
  processHeaders,
} from '@commercetools-frontend/mc-html-template';
import paths from '../config/paths';
import pluginMerchantCenterCustomization from '../vite-plugins/vite-plugin-merchant-center-customization';
import pluginSvgr from '../vite-plugins/vite-plugin-svgr';

async function run() {
  const DEFAULT_PORT = parseInt(String(process.env.HTTP_PORT), 10) || 3001;

  // Load the Merchant Center customization config file first.
  const applicationConfig = await processConfig();

  // Ensure the `/public` folder exists.
  fs.mkdirSync(paths.appBuild, { recursive: true });

  // Generate `index.html` (template).
  const appEntryPoint = path.relative(paths.appRoot, paths.entryPoint);
  const html = generateTemplate({
    // Define the module entry point (path relative to the `/public` folder).
    // NOTE: that this is different from the production configuration.
    scriptImports: [
      `<script type="module" src="/../${appEntryPoint}" defer></script>`,
    ],
  });
  // Write `index.html` (template) into the `/public` folder.
  fs.writeFileSync(paths.appIndexHtml, html, { encoding: 'utf8' });

  const compiledHeaders = processHeaders(applicationConfig);

  const server = await createServer({
    root: paths.appRoot,
    define: {
      'process.env.DEBUG': JSON.stringify(false),
      'process.env.NODE_ENV': JSON.stringify('development'),
    },
    server: {
      open: true,
      port: DEFAULT_PORT,
      headers: compiledHeaders,
    },
    plugins: [
      pluginGraphql() as Plugin,
      pluginReact({
        jsxImportSource: '@emotion/react',
      }),
      pluginSvgr(),
      pluginMerchantCenterCustomization(applicationConfig),
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
