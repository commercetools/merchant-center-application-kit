/* eslint-disable class-methods-use-this,no-param-reassign */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { processConfig } = require('@commercetools-frontend/application-config');
const {
  replaceHtmlPlaceholders,
} = require('@commercetools-frontend/mc-html-template');

let cachedApplicationEnv;

const getApplicationEnv = async () => {
  if (cachedApplicationEnv) {
    return cachedApplicationEnv;
  }

  const applicationConfig = await processConfig();
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

  cachedApplicationEnv = enhancedLocalEnv;
  return cachedApplicationEnv;
};

class LocalHtmlWebpackPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('LocalHtmlWebpackPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapPromise(
        'LocalHtmlWebpackPlugin',
        async (data) => {
          const env = await getApplicationEnv();
          data.html = replaceHtmlPlaceholders(data.html, { env });
          return data;
        }
      );
    });
  }
}

module.exports = LocalHtmlWebpackPlugin;
