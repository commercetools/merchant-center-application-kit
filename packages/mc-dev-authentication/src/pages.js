const fs = require('fs');
const path = require('path');

const loadHtmlDocAsString = (fileName) => {
  const content = fs.readFileSync(
    path.join(__dirname, '../html-docs', fileName),
    {
      encoding: 'utf8',
    }
  );
  return content;
};

module.exports = {
  loginPage: loadHtmlDocAsString('login.html'),
  logoutPage: loadHtmlDocAsString('logout.html'),
};
