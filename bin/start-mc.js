#!/usr/bin/env node

/* eslint-disable no-console,global-require */
const fs = require('fs');
const path = require('path');
const mri = require('mri');
const shell = require('shelljs');
const fetch = require('node-fetch');
const env = require('@commercetools-frontend/mc-http-server-config/env');
const replaceHtmlPlaceholders = require('@commercetools-frontend/mc-http-server-config/utils/replace-html-placeholders');

if (process.env.NODE_ENV !== 'production')
  throw new Error(
    'This server can only be started in production mode. Please set your NODE_ENV=production.'
  );

const publicFolderPath = path.join(__dirname, '../public');

const flags = mri(process.argv.slice(2), { alias: { help: ['h'] } });

if (flags.help) {
  console.log(`
  Usage: mc-http-server [options]

  Options:
  --use-local-assets     (optional) If this option is enabled, the "dist/assets" will be used to start the http-server package. This requires that the assets have been built before running this script.
  `);
}
const useLocalAssets = flags['use-local-assets'];

// This should only be used locally, as we're relying on relative paths
// outside of this package.
if (useLocalAssets) {
  // Resolve the absolute path of the caller location. This is necessary
  // to point to files within that folder.
  const sourcePath = path.resolve('.');
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
  shell.cp('-R', assetsFrom, publicFolderPath);
}

const getIndexHtml = async () => {
  // For local usage only!
  if (useLocalAssets) {
    const indexHtmlContent = fs.readFileSync(
      path.join(publicFolderPath, 'assets/index.html.template'),
      'utf8'
    );
    const updatedIndexHtmlContent = replaceHtmlPlaceholders(
      indexHtmlContent,
      env
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
    `${env.cdnUrl}/index.html.template?${randomQueryParam}`
  );
  if (!remoteIndexHtmlResponse.ok) {
    const rawResponseError = await remoteIndexHtmlResponse.text();
    const error = new Error(rawResponseError);
    return Promise.reject(error);
  }
  const remoteIndexHtmlContent = await remoteIndexHtmlResponse.text();
  const updatedIndexHtmlContent = replaceHtmlPlaceholders(
    remoteIndexHtmlContent,
    env
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
