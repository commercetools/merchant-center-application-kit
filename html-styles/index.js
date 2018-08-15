/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const loadStyleAsString = fileName => {
  const content = fs.readFileSync(path.join(__dirname, fileName), {
    encoding: 'utf8',
  });
  if (process.env.NODE_ENV !== 'production') return content;

  // Minify styles for production usage
  return content
    .replace(/\s/g, '') // remove all whitespaces
    .replace(/\r?\n|\r/g, ''); // remove all newlines
};

module.exports = {
  loadingScreen: loadStyleAsString('loading-screen.css'),
};
