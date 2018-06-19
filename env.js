const path = require('path');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

// Resolve the absolute path of the caller location. This is necessary
// to point to files within that folder.
const sourcePath = path.resolve('.');

const parsedEnv = dotenv.config({ path: path.join(sourcePath, '.env') });
dotenvExpand(parsedEnv);

const {
  GIT_SHA,
  MC_ENV,
  MC_LOCATION,
  MC_API_URL,
  FRONTEND_HOST,
  AC_URL,
  IMPEX_PRODUCT_EXPORT_URL,
  TRACKING_GTM,
  TRACKING_SENTRY,
  CDN_URL,
  SERVED_BY_PROXY,
} = process.env;

const requiredEnvVariables = [
  'MC_ENV',
  'MC_LOCATION',
  'MC_API_URL',
  'FRONTEND_HOST',
  'AC_URL',
  'IMPEX_PRODUCT_EXPORT_URL',
  'CDN_URL',
  'SERVED_BY_PROXY',
];
requiredEnvVariables.forEach(key => {
  const value = process.env[key];
  if (!value)
    throw new Error(
      `Missing '${key}' environment variable. ${JSON.stringify(
        process.env,
        null,
        2
      )}`
    );
});

module.exports = {
  frontendHost: FRONTEND_HOST,
  mcApiUrl: MC_API_URL,
  location: MC_LOCATION,
  tracking: {
    gtm: TRACKING_GTM,
    sentry: TRACKING_SENTRY,
  },
  adminCenterUrl: AC_URL,
  impexProductExportUrl: IMPEX_PRODUCT_EXPORT_URL,
  revision: GIT_SHA,
  env: MC_ENV,
  cdnUrl: CDN_URL,
  servedByProxy: SERVED_BY_PROXY,
};
