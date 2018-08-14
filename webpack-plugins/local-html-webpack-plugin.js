/* eslint-disable class-methods-use-this,no-param-reassign */
const path = require('path');
const loadEnv = require('@commercetools-frontend/mc-html-template/load-env');
const replaceHtmlPlaceholders = require('@commercetools-frontend/mc-html-template/utils/replace-html-placeholders');

const sourcePath = process.cwd();
const localEnv = loadEnv(path.join(sourcePath, 'env.json'));

class LocalHtmlWebpackPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('LocalHtmlWebpackPlugin', compilation => {
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
        'local-html-webpack-plugin',
        (data, cb) => {
          data.html = replaceHtmlPlaceholders(data.html, localEnv);
          cb(null, data);
        }
      );
    });
  }
}

module.exports = LocalHtmlWebpackPlugin;
