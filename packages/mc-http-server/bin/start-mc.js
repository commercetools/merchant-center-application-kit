#!/usr/bin/env node

/* eslint-disable no-console,global-require */

const fs = require('fs');
const path = require('path');
const mri = require('mri');
const shelljs = require('shelljs');
const { compileHtml } = require('@commercetools-frontend/mc-html-template');
const {
  packageLocation: applicationStaticAssetsPath,
} = require('@commercetools-frontend/assets');
const launchServer = require('../server');

const flags = mri(process.argv.slice(2), { alias: { help: ['h'] } });

if (flags.help) {
  console.log(`
  Usage: mc-http-server [options]

  Options:
  --config=<path>           (required) The path to the environment config (defined as a JSON file, e.g. "env.json").
  --csp=<path>              (optional) Deprecated: the path to the custom CSP directives config (defined as a JSON file, e.g. "csp.json").
  --headers=<path>          (optional) The path to the headers containing CSP and feature policy configs (defined as a JSON file, e.g. "headers.json").
  --use-local-assets        (optional) If this option is enabled, the "dist/assets" will be used to start the http-server package. This requires that the assets have been built before running this script.
  `);
}
if (!flags.config) {
  throw new Error('Missing required option "--config"');
}

const useLocalAssets = flags['use-local-assets'];

if (process.env.NODE_ENV !== 'production')
  throw new Error(
    'This server can only be started in production mode. Please set your NODE_ENV=production.'
  );

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const paths = {
  envPath: flags.config,
  cspPath: flags.csp,
  headersPath: flags.headers,
  publicAssetsPath: path.join(__dirname, '../public'),
  // NOTE: previously, for running the prod server locally, we were copying
  // assets into public/assets and compiling the index.html into public folder.
  // To run the app then we would define the cdnUrl as http://localhost:3001/assets,
  // because of the assets subfolder.
  // However, on the webpack-dev-server, the index.html and the bundles are
  // served from the same folder. It's really complicated to get the config right
  // and eventually it's not worth the effort as it just feels like a bloody workaround.
  // Therefore, we do it a bit different now: keep the webpack-dev-server
  // config as is and adjust the mc-script to serve the files the same way.
  // Remember that for normal production usage, assets are served from a CDN.
  // So now we have a flat public folder instead of an assets subfolder.
  // Which means that the 3 static files (favicon, google**.html, robots.txt)
  // need to be put somewhere else (public-assets) and copy into the public
  // folder when the server starts.
  publicAssetsFolderPath: path.join(
    `${applicationStaticAssetsPath}/html-page/*`
  ),
};

shelljs.rm('-rf', paths.publicAssetsPath);
shelljs.mkdir('-p', paths.publicAssetsPath);
shelljs.cp('-R', paths.publicAssetsFolderPath, paths.publicAssetsPath);

// This should only be used locally, as we're relying on relative paths
// outside of this package.
if (useLocalAssets) {
  // Resolve the absolute path of the caller location. This is necessary
  // to point to files within that folder.
  const assetsFrom = resolveApp('dist/assets');
  // Make sure that the `dist/assets` folder is available.
  try {
    fs.accessSync(assetsFrom, fs.F_OK);
  } catch (error) {
    throw new Error(
      'Could not find "dist/assets" folder. Did you run `yarn build` before starting the server?'
    );
  }
  // Copy the `dist/assets` folder into the `public` folder.
  shelljs.cp('-R', path.join(assetsFrom, '/*'), paths.publicAssetsPath);
}

const start = async () => {
  const compiled = await compileHtml({
    envPath: paths.envPath,
    cspPath: paths.cspPath,
    headersPath: paths.headersPath,
    publicAssetsPath: paths.publicAssetsPath,
    useLocalAssets,
  });

  fs.writeFileSync(
    path.join(paths.publicAssetsPath, 'index.html'),
    compiled.indexHtmlContent,
    { encoding: 'utf8' }
  );

  // Start the server
  await launchServer({
    env: compiled.env,
    headers: compiled.headers,
    paths,
  });
};

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
