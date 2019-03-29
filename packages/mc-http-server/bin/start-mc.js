#!/usr/bin/env node

/* eslint-disable no-console,global-require */
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const fetch = require('node-fetch');
const {
  replaceHtmlPlaceholders,
} = require('@commercetools-frontend/mc-html-template');
const {
  packageLocation: assetsPath,
} = require('@commercetools-frontend/assets');
const options = require('../load-options');

if (process.env.NODE_ENV !== 'production')
  throw new Error(
    'This server can only be started in production mode. Please set your NODE_ENV=production.'
  );

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
const publicAssetsFolderPath = path.join(`${assetsPath}/html-page/*`);
const publicFolderPath = path.join(__dirname, '../public');

shell.rm('-rf', publicFolderPath);
shell.mkdir('-p', publicFolderPath);
shell.cp('-R', publicAssetsFolderPath, publicFolderPath);

// This should only be used locally, as we're relying on relative paths
// outside of this package.
if (options.useLocalAssets) {
  // Resolve the absolute path of the caller location. This is necessary
  // to point to files within that folder.
  const sourcePath = process.cwd();
  const assetsFrom = path.join(sourcePath, 'dist/assets');
  // Make sure that the `dist/assets` folder is available.
  try {
    fs.accessSync(assetsFrom, fs.F_OK);
  } catch (error) {
    throw new Error(
      'Could not find "dist/assets" folder. Did you run `yarn build` before starting the server?'
    );
  }
  // Copy the `dist/assets` folder into the `public` folder.
  shell.cp('-R', path.join(assetsFrom, '/*'), publicFolderPath);
}

const getIndexHtml = async () => {
  // For local usage only!
  if (options.useLocalAssets) {
    const indexHtmlContent = fs.readFileSync(
      path.join(publicFolderPath, 'index.html.template'),
      'utf8'
    );
    const updatedIndexHtmlContent = replaceHtmlPlaceholders(
      indexHtmlContent,
      options.env
    );
    return Promise.resolve(updatedIndexHtmlContent);
  }

  // 👇 This is the normal production setup
  // NOTE: see `.circleci/push_storage.sh` (for uploading the
  // `index.html.template`) for an explanation on why we need this.
  // TL;DR; This disables the `Cache-Control` and ensures that we get
  // the latest version of the object.
  const randomQueryParam = Date.now();
  // Fetch `index.html.template` from remote Storage Bucket
  const remoteIndexHtmlResponse = await fetch(
    `${options.env.cdnUrl}/index.html.template?${randomQueryParam}`
  );
  if (!remoteIndexHtmlResponse.ok) {
    const rawResponseError = await remoteIndexHtmlResponse.text();
    const error = new Error(rawResponseError);
    return Promise.reject(error);
  }
  const remoteIndexHtmlContent = await remoteIndexHtmlResponse.text();
  const updatedIndexHtmlContent = replaceHtmlPlaceholders(
    remoteIndexHtmlContent,
    options.env
  );
  return Promise.resolve(updatedIndexHtmlContent);
};

const start = async () => {
  const indexHtmlContent = await getIndexHtml();
  fs.writeFileSync(
    path.join(publicFolderPath, 'index.html'),
    indexHtmlContent,
    { encoding: 'utf8' }
  );

  // Start the server
  require('../server');
};

start().catch(error => {
  console.error(error);
  process.exit(1);
});
