// Keep it a direct import, otherwise Webpack will try to require/load
// non-browser dependencies.
const generateTemplate = require('./build/generate-template');

module.exports = (templateParams) => {
  const cssVendorChunks = [];
  const cssAppChunks = [];

  templateParams.htmlWebpackPlugin.files.css.forEach((file) => {
    if (file.indexOf('vendor') === -1) {
      cssAppChunks.push(file);
    } else {
      cssVendorChunks.push(file);
    }
  });
  const cssChunks = cssVendorChunks
    .concat(cssAppChunks)
    .map((fileName) => fileName.replace(/^\//, ''));

  const scriptChunks = templateParams.htmlWebpackPlugin.files.js.map(
    (fileName) =>
      // Trim leading slash, the CDN_URL will ensure to have a trailing slash
      // (see `replaceHtmlPlaceholders`)
      fileName.replace(/^\//, '')
  );

  const cssImports = cssChunks.map(
    (chunkPath) =>
      `<link href="__CDN_URL__${chunkPath}" rel='stylesheet' type='text/css'>`
  );
  const scriptImports = scriptChunks.map(
    (chunkPath) => `<script src="__CDN_URL__${chunkPath}"></script>`
  );

  return generateTemplate({ cssImports, scriptImports });
};
