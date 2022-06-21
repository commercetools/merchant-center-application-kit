import createHttpUserAgent from '@commercetools/http-user-agent';
import pkgJson from '../../package.json';

const userAgent = createHttpUserAgent({
  name: 'graphql-request',
  libraryName: 'mc-scripts',
  libraryVersion: pkgJson.version,
  contactUrl: 'https://git.io/fjuyC', // points to the appkit repo issues
  contactEmail: 'support@commercetools.com',
});

export default userAgent;
