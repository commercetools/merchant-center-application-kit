const fs = require('fs');
const path = require('path');

const compiledStyles = {
  global: fs.readFileSync(path.join(__dirname, './compiled/navbar.css'), {
    encoding: 'utf8',
  }),
  jsonMap: require('./compiled/navbar.css.json'),
};

module.exports = compiledStyles;
