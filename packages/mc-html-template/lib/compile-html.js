const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const loadEnv = require('./load-env');
const loadHeaders = require('./load-headers');
const replaceHtmlPlaceholders = require('./utils/replace-html-placeholders');

const requiredOptions = ['envPath', 'publicAssetsPath'];

/**
 * Options:
 * - envPath
 * - cspPath
 * - publicAssetsPath
 * - useLocalAssets
 */
module.exports = async function compileHtml(options) {
  requiredOptions.forEach(key => {
    if (!options[key]) {
      throw new Error(`Missing required option ${key}.`);
    }
  });

  const env = loadEnv(options.envPath);
  const headers = loadHeaders(env, { cspPath: options.cspPath });

  // For local usage only!
  if (options.useLocalAssets) {
    const indexHtmlContent = fs.readFileSync(
      path.join(options.publicAssetsPath, 'index.html.template'),
      'utf8'
    );
    const interpolatedIndexHtmlContent = replaceHtmlPlaceholders(
      indexHtmlContent,
      env
    );
    return {
      env,
      headers,
      indexHtmlContent: interpolatedIndexHtmlContent,
    };
  }

  // TL;DR; This disables the `Cache-Control` and ensures that we get
  // the latest version of the object.
  const randomQueryParam = Date.now();
  // Fetch `index.html.template` from remote CDN
  const remoteIndexHtmlResponse = await fetch(
    `${env.cdnUrl}/index.html.template?${randomQueryParam}`
  );
  if (!remoteIndexHtmlResponse.ok) {
    const rawResponseError = await remoteIndexHtmlResponse.text();
    const error = new Error(rawResponseError);
    return Promise.reject(error);
  }
  const remoteIndexHtmlContent = await remoteIndexHtmlResponse.text();
  const interpolatedIndexHtmlContent = replaceHtmlPlaceholders(
    remoteIndexHtmlContent,
    env
  );
  return {
    env,
    headers,
    indexHtmlContent: interpolatedIndexHtmlContent,
  };
};
