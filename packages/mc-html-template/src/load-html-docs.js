/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const loadHtmlDocAsString = (fileName) => {
  const content = fs.readFileSync(
    path.join(__dirname, '../html-docs', fileName),
    { encoding: 'utf8' }
  );
  return content;
};

module.exports = {
  application: loadHtmlDocAsString('application.html'),
};
