const getAssetHashes = require('./get-asset-hashes');
const createAssetHash = require('./create-asset-hash');
const sanitizeAppEnvironment = require('./sanitize-app-environment');
const env = require('./env');

const isDev = !process.env.MC_ENV || process.env.MC_ENV === 'development';

// List hashes for injected inline scripts.
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src
const assetHashes = [
  ...getAssetHashes(),
  // Only the mc-http-server is aware of the env which is why we need
  // to create its hash here.
  createAssetHash(`window.app = ${sanitizeAppEnvironment(env)};`),
];

const toArray = value => (Array.isArray(value) ? value : [value]);

const mergeCspDirectives = (...csps) =>
  csps.reduce(
    (mergedCsp, csp) =>
      Object.assign(
        mergedCsp,
        Object.keys(csp).reduce(
          (acc, directiveKey) =>
            Object.assign(acc, {
              [directiveKey]: [
                ...toArray(
                  mergedCsp[directiveKey] ? mergedCsp[directiveKey] : []
                ),
                ...toArray(csp[directiveKey]),
              ],
            }),
          {}
        )
      ),
    {}
  );

/**
 * Content Security Policy (CSP)
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
 */
// eslint-disable-next-line prefer-object-spread/prefer-object-spread
const cspDirectives = Object.assign(
  {
    'default-src': "'none'",
    'script-src': [
      "'self'",
      // NOTE: trailing slash is important for partial URLs!
      'storage.googleapis.com/mc-staging/',
      'storage.googleapis.com/mc-production-eu/',
      'storage.googleapis.com/mc-production-us/',
      'www.googletagmanager.com/gtm.js',
      'www.google-analytics.com/analytics.js',
    ].concat(
      isDev
        ? // allows webpack to load source maps on runtime when errors occur
          // using script tags
          ['localhost:*', "'unsafe-inline'"]
        : // Allow only hashed inline scripts (see list above)
          assetHashes.map(assetHash => `'${assetHash}'`)
    ),
    'connect-src': [
      "'self'",
      'mc-api.escemo.com',
      'mc-api.commercetools.com',
      'mc-api.commercetools.co',
      'app.launchdarkly.com',
      'clientstream.launchdarkly.com',
      'events.launchdarkly.com',
      'app.getsentry.com',
      'www.google-analytics.com',
    ].concat(isDev ? ['ws:', 'localhost:8080', 'webpack-internal:'] : []),
    'img-src': ['*', 'data:'],
    'style-src': [
      "'self'",
      // TODO: this might be removed once we load CSS from an external file
      "'unsafe-inline'",
      'fonts.googleapis.com',
      'data:',
      'storage.googleapis.com/mc-staging/',
      'storage.googleapis.com/mc-production-eu/',
      'storage.googleapis.com/mc-production-us/',
    ],
    'font-src': ["'self'", 'fonts.gstatic.com', 'data:'],
  },
  isDev
    ? {
        // NOTE: use this instead of `upgrade-insecure-requests` for local
        // development to avoid `http://localhost` requests to be redirected
        // to https.
        'block-all-mixed-content': '',
      }
    : {
        // NOTE: prefer this over `block-all-mixed-content`.
        // https://youtu.be/j-0Bj40juMI?t=11m47s
        'upgrade-insecure-requests': '',
        'report-uri':
          // For now we report to the staging project to avoid spamming production.
          'https://sentry.io/api/201984/csp-report/?sentry_key=ccb1fd8c25c241a18e801104bb687ac5',
      }
  // NOTE: we might want to define further policies in the future, for example
  // - `require-sri-for style script` (at the moment not possible because
  //   GTM and Intercom scripts are apparently not meant for this)
);

const mergedCsp = mergeCspDirectives(cspDirectives);

const cspHeaderString = Object.entries(mergedCsp)
  .map(([directive, value]) => `${directive} ${value.join(' ')}`)
  .join('; ');

module.exports = {
  'Strict-Transport-Security': 'max-age=31536000',
  'X-XSS-Protection': '1; mode=block',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': cspHeaderString,
};
