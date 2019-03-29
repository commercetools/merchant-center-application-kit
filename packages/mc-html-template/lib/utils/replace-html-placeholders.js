const htmlScripts = require('../html-scripts');
const htmlStyles = require('../html-styles');
const sanitizeAppEnvironment = require('./sanitize-app-environment');

const getGtmTrackingScript = gtmId => {
  if (!gtmId) return '';
  const url = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  return `
<script async type="text/javascript" src="${url}"></script>
  `;
};

const replaceHtmlPlaceholders = (indexHtmlContent, config) =>
  indexHtmlContent
    .replace(
      new RegExp('__CDN_URL__', 'g'),
      config.cdnUrl
        ? // Ensure there is a trailing slash
          `${config.cdnUrl.replace(/\/$/, '')}/`
        : ''
    )
    .replace(new RegExp('__MC_API_URL__', 'g'), config.mcApiUrl)
    .replace(
      new RegExp('__APP_ENVIRONMENT__', 'g'),
      sanitizeAppEnvironment(config)
    )
    .replace(
      new RegExp('__GTM_SCRIPT__', 'g'),
      getGtmTrackingScript(config.trackingGtm)
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
