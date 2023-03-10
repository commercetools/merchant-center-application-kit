import type { ApplicationRuntimeConfig } from '@commercetools-frontend/application-config';
import { HTTP_SECURITY_HEADERS } from '@commercetools-frontend/constants';
import htmlScripts from /* preval */ './load-html-scripts';
import createAssetHash from './utils/create-asset-hash';
import sanitizeAppEnvironment from './utils/sanitize-app-environment';
// https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros

type TCspDirectiveValue = string | string[] | undefined;
type TCspDirective = Record<string, TCspDirectiveValue>;

const toArray = (value: TCspDirectiveValue) =>
  Array.isArray(value) ? value : [value];

const mergeCspDirectives = (...directives: TCspDirective[]) =>
  directives.reduce(
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
const toHeaderString = (directives: TCspDirective = {}) =>
  Object.entries(directives)
    .map(
      ([directive, value]) =>
        `${directive} ${Array.isArray(value) ? value.join(' ') : value}`
    )
    .join('; ');
const toStructuredHeaderString = (directives: TCspDirective = {}) =>
  Object.entries(directives)
    .map(
      ([directive, value]) =>
        `${directive}=${Array.isArray(value) ? value.join(' ') : value}`
    )
    .join(', ');

const processHeaders = (
  applicationConfig: ApplicationRuntimeConfig
): Record<string, string | undefined> => {
  const isMcDevEnv = applicationConfig.env.env === 'development';

  // List hashes for injected inline scripts.
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src
  const htmlScriptsHashes = [
    createAssetHash(htmlScripts.loadingScreen),
    createAssetHash(
      `window.app = ${sanitizeAppEnvironment(applicationConfig.env)};`
    ),
    createAssetHash(htmlScripts.publicPath),
    createAssetHash(htmlScripts.dataLayer),
  ];

  // // List hashes for injected inline styles.
  // // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src
  // const htmlStylesHashes = [createAssetHash(htmlStyles.loadingScreen)];

  /**
   * Content Security Policy (CSP)
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
   */
  const cspDirectives = Object.assign(
    {
      'default-src': "'none'",
      'script-src': [
        "'self'",
        'www.googletagmanager.com/gtm.js',
        'www.google-analytics.com/analytics.js',
      ].concat(
        isMcDevEnv
          ? // Allow webpack to load source maps on runtime when errors occur
            // using script tags
            ['localhost:*', "'unsafe-inline'"]
          : htmlScriptsHashes.map((assetHash) => `'${assetHash}'`)
      ),
      'connect-src': [
        "'self'",
        'app.launchdarkly.com',
        'clientstream.launchdarkly.com',
        'events.launchdarkly.com',
        'app.getsentry.com',
        // Match all attempts to load from any subdomain of `sentry.io`
        '*.sentry.io',
        'www.google-analytics.com',
      ].concat(
        isMcDevEnv ? ['ws:', 'localhost:8080', 'webpack-internal:'] : []
      ),
      'img-src': ['*', 'data:'],
      'style-src': ["'self'", 'fonts.googleapis.com', 'data:'].concat(
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

  // Recursively merge the directives
  const mergedCsp = mergeCspDirectives(
    cspDirectives,
    applicationConfig.headers?.csp ?? {}
  );

  return {
    // Default security headers.
    ...HTTP_SECURITY_HEADERS,

    // The `Content-Security-Policy` header is always generated
    // based on the Custom Application config.
    'Content-Security-Policy': toHeaderString(mergedCsp),

    // Allow to extend the `Strict-Transport-Security` header.
    ...(applicationConfig.headers?.strictTransportSecurity && {
      'Strict-Transport-Security': [
        HTTP_SECURITY_HEADERS['Strict-Transport-Security'],
        ...applicationConfig.headers.strictTransportSecurity,
      ].join('; '),
    }),

    // Allow to extend the `Permissions-Policy` header.
    ...(applicationConfig.headers?.permissionsPolicies && {
      'Permissions-Policy': toStructuredHeaderString(
        applicationConfig.headers.permissionsPolicies as TCspDirective
      ),
    }),
  };
};

export default processHeaders;
