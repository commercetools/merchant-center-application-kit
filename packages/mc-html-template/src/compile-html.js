const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { processConfig } = require('@commercetools-frontend/application-config');
const processHeaders = require('./process-headers');
const replaceHtmlPlaceholders = require('./utils/replace-html-placeholders');

const requiredOptions = ['publicAssetsPath'];

const trimTrailingSlash = (value) => value.replace(/\/$/, '');

/**
 * Options:
 * - publicAssetsPath
 * - useLocalAssets
 */
module.exports = async function compileHtml(options) {
  requiredOptions.forEach((key) => {
    if (!options[key]) {
      throw new Error(`Missing required option ${key}.`);
    }
  });
  const applicationConfig = processConfig();
  const compiledHeaders = processHeaders(applicationConfig);

  if (options.useLocalAssets) {
    const indexHtmlContent = fs.readFileSync(
      path.join(options.publicAssetsPath, 'index.html.template'),
      'utf8'
    );
    const interpolatedIndexHtmlContent = replaceHtmlPlaceholders(
      indexHtmlContent,
      applicationConfig.env
    );
    return {
      env: applicationConfig.env,
      headers: compiledHeaders,
      indexHtmlContent: interpolatedIndexHtmlContent,
    };
  }

  // TL;DR; This disables the `Cache-Control` and ensures that we get
  // the latest version of the object.
  const randomQueryParam = Date.now();
  // Fetch `index.html.template` from remote CDN
  const remoteIndexHtmlResponse = await fetch(
    `${trimTrailingSlash(
      applicationConfig.env.cdnUrl
    )}/index.html.template?${randomQueryParam}`
  );
  if (!remoteIndexHtmlResponse.ok) {
    const rawResponseError = await remoteIndexHtmlResponse.text();
    const error = new Error(rawResponseError);
    return Promise.reject(error);
  }
  const remoteIndexHtmlContent = await remoteIndexHtmlResponse.text();
  const interpolatedIndexHtmlContent = replaceHtmlPlaceholders(
    remoteIndexHtmlContent,
    applicationConfig.env
  );
  return {
    env: applicationConfig.env,
    headers: compiledHeaders,
    indexHtmlContent: interpolatedIndexHtmlContent,
  };
};
