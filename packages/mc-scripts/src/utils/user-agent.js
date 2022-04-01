const createHttpUserAgent = require('@commercetools/http-user-agent');
const pkgJson = require('../../package.json');

const userAgent = createHttpUserAgent({
  name: 'cli-login',
  libraryName: 'mc-scripts',
  libraryVersion: pkgJson.version,
  contactUrl: 'https://git.io/fjuyC', // points to the appkit repo issues
  contactEmail: 'support@commercetools.com',
});

module.exports = userAgent;
