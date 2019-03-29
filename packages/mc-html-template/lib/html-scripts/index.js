/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const uglify = require('uglify-es');

const loadScriptAsString = fileName => {
  const content = fs.readFileSync(path.join(__dirname, fileName), {
    encoding: 'utf8',
  });
  if (process.env.NODE_ENV !== 'production') return content;

  // Minify scripts for production usage
  const result = uglify.minify(content);
  if (result.error) throw result.error;
  if (result.warnings) console.warn(result.warnings);
  return result.code;
};

module.exports = {
  dataLayer: loadScriptAsString('data-layer.js'),
  loadingScreen: loadScriptAsString('loading-screen.js'),
};
