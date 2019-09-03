const fs = require('fs');
const createAssetHash = require('./utils/create-asset-hash');
const sanitizeAppEnvironment = require('./utils/sanitize-app-environment');
const htmlScripts = require('./html-scripts');
// const htmlStyles = require('./html-styles');

const loadCustomConfiguration = pathToConfiguration => {
  let rawConfiguration;
  try {
    rawConfiguration = fs.readFileSync(pathToConfiguration, {
      encoding: 'utf8',
    });
  } catch (error) {
    // Ignore
  }
  return rawConfiguration ? JSON.parse(rawConfiguration) : {};
};

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
const toHeaderString = (directives = {}) =>
  Object.entries(directives)
    .map(
      ([directive, value]) =>
        `${directive} ${Array.isArray(value) ? value.join(' ') : value}`
    )
    .join('; ');

module.exports = (env, options) => {
  const isMcDevEnv = env.env === 'development';

  // List hashes for injected inline scripts.
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src
  const htmlScriptsHashes = [
    createAssetHash(htmlScripts.dataLayer),
    createAssetHash(htmlScripts.loadingScreen),
    createAssetHash(`window.app = ${sanitizeAppEnvironment(env)};`),
  ];

  // // List hashes for injected inline styles.
  // // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src
  // const htmlStylesHashes = [createAssetHash(htmlStyles.loadingScreen)];

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
        'storage.googleapis.com/mc-production-eu/',
        'storage.googleapis.com/mc-production-us/',
        'www.googletagmanager.com/gtm.js',
        'www.google-analytics.com/analytics.js',
      ].concat(
        isMcDevEnv
          ? // Allow webpack to load source maps on runtime when errors occur
            // using script tags
            ['localhost:*', "'unsafe-inline'"]
          : htmlScriptsHashes.map(assetHash => `'${assetHash}'`)
      ),
      'connect-src': [
        "'self'",
        'mc-api.commercetools.com',
        'mc-api.commercetools.co',
        'app.launchdarkly.com',
        'clientstream.launchdarkly.com',
        'events.launchdarkly.com',
        'app.getsentry.com',
        'www.google-analytics.com',
      ].concat(
        isMcDevEnv ? ['ws:', 'localhost:8080', 'webpack-internal:'] : []
      ),
      'img-src': ['*', 'data:'],
      'style-src': [
        "'self'",
        'fonts.googleapis.com',
        'data:',
        'storage.googleapis.com/mc-production-eu/',
        'storage.googleapis.com/mc-production-us/',
      ].concat(
        // TODO: investigate what needs to be done to avoid unsafe-inline styles
        // https://github.com/commercetools/merchant-center-frontend/pull/5223#discussion_r210367636
        ["'unsafe-inline'"]
        // TODO: enable this once we can avoid unsafe-inline
        // htmlStylesHashes.map(assetHash => `'${assetHash}'`)
      ),
      'font-src': ["'self'", 'fonts.gstatic.com', 'data:'],
    },
    isMcDevEnv
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
        }
    // NOTE: we might want to define further policies in the future, for example
    // - `require-sri-for style script` (at the moment not possible because
    //   GTM and Intercom scripts are apparently not meant for this)
  );

  // Attempt to load the JSON config for custom CSP and feature policy headers provided by each application
  // For backwards compatibilty the `cspPath` can still be used but the `headerPath` takes precedence.

  const shouldUseDeprecatedCspPath = Boolean(
    options.cspPath && !options.headersPath
  );

  const customHeaders = loadCustomConfiguration(options.headersPath);

  const customCspDirectives = shouldUseDeprecatedCspPath
    ? loadCustomConfiguration(options.cspPath)
    : customHeaders.csp;

  // Recursively merge the directives
  const mergedCsp = mergeCspDirectives(
    cspDirectives,
    customCspDirectives || {}
  );

  return {
    'Strict-Transport-Security': 'max-age=31536000',
    'X-XSS-Protection': '1; mode=block',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'same-origin',
    'Content-Security-Policy': toHeaderString(mergedCsp),
    ...(customHeaders.featurePolicies && {
      'Feature-Policy': toHeaderString(customHeaders.featurePolicies),
    }),
  };
};
