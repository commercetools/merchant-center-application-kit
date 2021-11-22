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

const replaceHtmlPlaceholders = (indexHtmlContent, options) =>
  indexHtmlContent
    .replace(
      new RegExp('__CSP__', 'g'),
      options.headers && options.cliFlags && options.cliFlags.inlineCsp
        ? options.headers['Content-Security-Policy']
        : ''
    )
    .replace(
      new RegExp('__CDN_URL__', 'g'),
      options.env.cdnUrl
        ? // Ensure there is a trailing slash
          `${trimTrailingSlash(options.env.cdnUrl)}/`
        : ''
    )
    .replace(
      new RegExp('__MC_API_URL__', 'g'),
      trimTrailingSlash(options.env.mcApiUrl)
    )
    .replace(
      new RegExp('__APP_ENVIRONMENT__', 'g'),
      sanitizeAppEnvironment(options.env)
    )
    .replace(
      new RegExp('__GTM_SCRIPT__', 'g'),
      getGtmTrackingScript(options.env.trackingGtm)
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
