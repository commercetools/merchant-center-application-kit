/* eslint-disable class-methods-use-this,no-param-reassign,prefer-object-spread/prefer-object-spread */
const path = require('path');
const loadEnv = require('@commercetools-frontend/mc-html-template/load-env');
const replaceHtmlPlaceholders = require('@commercetools-frontend/mc-html-template/utils/replace-html-placeholders');

const sourcePath = process.cwd();
const localEnv = loadEnv(path.join(sourcePath, 'env.json'));
const enhancedLocalEnv = Object.assign(
  {},
  localEnv,
  process.env.MC_API_URL
    ? {
        mcApiUrl: process.env.MC_API_URL,
      }
    : {}
);

class LocalHtmlWebpackPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('LocalHtmlWebpackPlugin', compilation => {
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
        'local-html-webpack-plugin',
        (data, cb) => {
          data.html = replaceHtmlPlaceholders(data.html, enhancedLocalEnv);
          cb(null, data);
        }
      );
    });
  }
}

module.exports = LocalHtmlWebpackPlugin;
