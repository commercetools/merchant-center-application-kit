const htmlScripts = require('../load-html-scripts');
const htmlStyles = require('../load-html-styles');
const sanitizeAppEnvironment = require('./sanitize-app-environment');

const trimTrailingSlash = (value) => value.replace(/\/$/, '');

const getGtmTrackingScript = (gtmId) => {
  if (!gtmId) return '';
  const url = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  return `
<script async type="text/javascript" src="${url}" referrerpolicy="no-referrer"></script>
  `;
};

const replaceHtmlPlaceholders = (
  indexHtmlContent,
  runtimeEnv,
  compiledHeaders
) =>
  indexHtmlContent
    .replace(
      new RegExp('__CSP__', 'g'),
      compiledHeaders ? compiledHeaders['Content-Security-Policy'] : ''
    )
    .replace(
      new RegExp('__CDN_URL__', 'g'),
      runtimeEnv.cdnUrl
        ? // Ensure there is a trailing slash
          `${trimTrailingSlash(runtimeEnv.cdnUrl)}/`
        : ''
    )
    .replace(
      new RegExp('__MC_API_URL__', 'g'),
      trimTrailingSlash(runtimeEnv.mcApiUrl)
    )
    .replace(
      new RegExp('__APP_ENVIRONMENT__', 'g'),
      sanitizeAppEnvironment(runtimeEnv)
    )
    .replace(
      new RegExp('__GTM_SCRIPT__', 'g'),
      getGtmTrackingScript(runtimeEnv.trackingGtm)
    )
    .replace(new RegExp('__DATALAYER_JS__', 'g'), htmlScripts.dataLayer)
    .replace(
      new RegExp('__LOADING_SCREEN_JS__', 'g'),
      htmlScripts.loadingScreen
    )
    .replace(
      new RegExp('__LOADING_SCREEN_CSS__', 'g'),
      htmlStyles.loadingScreen
    );

module.exports = replaceHtmlPlaceholders;
