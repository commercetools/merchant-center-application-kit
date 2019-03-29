const generateTemplate = require('./lib/generate');

module.exports = templateParams => {
  const cssVendorChunks = [];
  const cssAppChunks = [];

  templateParams.htmlWebpackPlugin.files.css.forEach(file => {
    if (file.indexOf('vendor') === -1) {
      cssAppChunks.push(file);
    } else {
      cssVendorChunks.push(file);
    }
  });
  const cssChunks = cssVendorChunks
    .concat(cssAppChunks)
    .map(fileName => fileName.replace(/^\//, ''));

  const scriptChunks = templateParams.htmlWebpackPlugin.files.js.map(fileName =>
    // Trim leading slash, the CDN_URL will ensure to have a trailing slash
    // (see `replaceHtmlPlaceholders`)
    fileName.replace(/^\//, '')
  );

  return generateTemplate({ cssChunks, scriptChunks });
};
