#!/usr/bin/env node

/* eslint-disable no-console,global-require */
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const fetch = require('node-fetch');
const replaceHtmlPlaceholders = require('@commercetools-frontend/mc-html-template/utils/replace-html-placeholders');
const options = require('../load-options');

if (process.env.NODE_ENV !== 'production')
  throw new Error(
    'This server can only be started in production mode. Please set your NODE_ENV=production.'
  );

const publicAssetsFolderPath = path.join(__dirname, '../public-assets/*');
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
