// @preval
/**
 * https://github.com/kentcdodds/babel-plugin-preval#preval-file-comment--preval
 * NOTE: This file is pre-evaluated during build time, using `babel-plugin-preval`.
 * This is ok as the loaded files are static anyway and it prevents possible
 * loading issues when files are required through Webpack own context.
 */
const fs = require('fs');
const path = require('path');
const uglifycss = require('uglifycss');

const loadStyleAsString = (fileName) => {
  const content = fs.readFileSync(
    path.join(__dirname, '../html-styles', fileName),
    { encoding: 'utf8' }
  );
  if (process.env.NODE_ENV !== 'production') return content;

  // Minify styles for production usage
  return uglifycss.processString(content);
};

module.exports = {
  loadingScreen: loadStyleAsString('loading-screen.css'),
};
