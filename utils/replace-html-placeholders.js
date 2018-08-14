const assets = require('../html-scripts');
const env = require('../env');
const sanitizeAppEnvironment = require('./sanitize-app-environment');

const getGtmTrackingScript = tracking => {
  const gtmId = tracking.gtm;
  if (gtmId === 'false') return '';
  const url = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  return `
<script async type="text/javascript" src="${url}"></script>
  `;
};

const replaceHtmlPlaceholders = indexHtmlContent =>
  indexHtmlContent
    .replace(
      new RegExp('__CDN_URL__', 'g'),
      // Ensure there is a trailing slash
      `${env.cdnUrl.replace(/\/$/, '')}/`
    )
    .replace(new RegExp('__MC_API_URL__', 'g'), env.mcApiUrl)
    .replace(
      new RegExp('__APP_ENVIRONMENT__', 'g'),
      sanitizeAppEnvironment(env)
    )
    .replace(
      new RegExp('__GTM_SCRIPT__', 'g'),
      getGtmTrackingScript(env.tracking)
    )
    .replace(new RegExp('__DATALAYER_JS__', 'g'), assets.dataLayer)
    .replace(new RegExp('__LOADING_SCREEN_JS__', 'g'), assets.loadingScreen);

module.exports = replaceHtmlPlaceholders;
