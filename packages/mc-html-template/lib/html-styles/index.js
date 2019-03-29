/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const uglifycss = require('uglifycss');

const loadStyleAsString = fileName => {
  const content = fs.readFileSync(path.join(__dirname, fileName), {
    encoding: 'utf8',
  });
  if (process.env.NODE_ENV !== 'production') return content;

  // Minify styles for production usage
  return uglifycss.processString(content);
};

module.exports = {
  loadingScreen: loadStyleAsString('loading-screen.css'),
};
