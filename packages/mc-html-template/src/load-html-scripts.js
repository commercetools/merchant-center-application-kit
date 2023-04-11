/**
 * NOTE: This file is pre-evaluated during build time, using `babel-plugin-preval`.
 * This is ok as the loaded files are static anyway and it prevents possible
 * loading issues when files are required through Webpack own context.
 */
const fs = require('fs');
const path = require('path');
const uglify = require('uglify-js');

const loadScriptAsString = (fileName) => {
  const content = fs.readFileSync(
    path.join(__dirname, '../html-scripts', fileName),
    { encoding: 'utf8' }
  );
  if (process.env.NODE_ENV !== 'production') return content;

  // Minify scripts for production usage
  const result = uglify.minify(content);
  if (result.error) throw result.error;
  if (result.warnings) console.warn(result.warnings);
  return result.code;
};

module.exports = {
  loadingScreen: loadScriptAsString('loading-screen.js'),
  publicPath: loadScriptAsString('public-path.js'),
};
