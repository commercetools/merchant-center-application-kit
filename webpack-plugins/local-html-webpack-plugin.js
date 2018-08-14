/* eslint-disable class-methods-use-this,no-param-reassign */
const replaceHtmlPlaceholders = require('@commercetools-frontend/mc-html-template/replace-html-placeholders');

class LocalHtmlWebpackPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('LocalHtmlWebpackPlugin', compilation => {
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
        'local-html-webpack-plugin',
        (data, cb) => {
          data.html = replaceHtmlPlaceholders(data.html);
          cb(null, data);
        }
      );
    });
  }
}

module.exports = LocalHtmlWebpackPlugin;
