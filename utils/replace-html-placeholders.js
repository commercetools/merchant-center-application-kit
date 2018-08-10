const getAssets = require('./get-assets');
const sanitizeAppEnvironment = require('./sanitize-app-environment');

const getGtmTrackingScript = tracking => {
  const gtmId = tracking.gtm;
  if (gtmId === 'false') return '';
  const url = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  return `
<script async type="text/javascript" src="${url}"></script>
  `;
};

const replaceHtmlPlaceholders = (indexHtmlContent, config) => {
  const assets = getAssets();

  return indexHtmlContent
    .replace(
      new RegExp('__CDN_URL__', 'g'),
      // Ensure there is a trailing slash
      `${config.cdnUrl.replace(/\/$/, '')}/`
    )
    .replace(new RegExp('__MC_API_URL__', 'g'), config.mcApiUrl)
    .replace(
      new RegExp('__APP_ENVIRONMENT__', 'g'),
      sanitizeAppEnvironment(config)
    )
    .replace(
      new RegExp('__GTM_SCRIPT__', 'g'),
      getGtmTrackingScript(config.tracking)
    )
    .replace(new RegExp('__DATALAYER_JS__', 'g'), assets.dataLayerScript)
    .replace(
      new RegExp('__LOADING_SCREEN_JS__', 'g'),
      assets.loadingScreenScript
    );
};

module.exports = replaceHtmlPlaceholders;
