const sanitizeAppEnvironment = require('./sanitize-app-environment');

const getGtmTrackingScripts = tracking => {
  const gtmId = tracking.gtm;
  if (gtmId === 'false') return '';
  const url = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  return `
<script>dataLayer = [{ 'gtm.start': new Date().getTime(), event: 'gtm.js' }];</script>
<script async type="text/javascript" src="${url}"></script>
  `;
};

const replaceHtmlPlaceholders = (indexHtmlContent, config) =>
  indexHtmlContent
    .replace(
      new RegExp('__CDN_URL__', 'g'),
      // Ensure there is a trailing slash
      `${config.cdnUrl.replace(/\/$/, '')}/`
    )
    .replace(
      new RegExp('__MC_API_URL__', 'g'),
      `${config.mcApiUrl.replace(/\/$/, '')}`
    )
    .replace(
      new RegExp('__APP_ENVIRONMENT__', 'g'),
      sanitizeAppEnvironment(config)
    )
    .replace(
      new RegExp('__TRACKING_GTM__', 'g'),
      getGtmTrackingScripts(config.tracking)
    );

module.exports = replaceHtmlPlaceholders;
