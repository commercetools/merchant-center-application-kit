const replaceHtmlPlaceholders = require('@commercetools-frontend/mc-http-server-config/utils/replace-html-placeholders');

module.exports = templateParams => {
  const scriptChunks = templateParams.htmlWebpackPlugin.files.js.map(
    fileName => {
      // Trim leading slash, the CDN_URL will ensure to have a trailing slash
      // (see `replaceHtmlPlaceholders`)
      const chunkPath = fileName.replace(/^\//, '');
      return `<script src="__CDN_URL__${chunkPath}"></script>`;
    }
  );

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i' rel='stylesheet' type='text/css'></link>
    <title>Merchant Center</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>

    <div id="app"></div>

    <!-- Application globals -->
    <script>window.app = __APP_ENVIRONMENT__;</script>

    <!-- Tracking scripts (load before application bundles) -->
    __TRACKING_GTM__

    <!-- Main application chunks -->
    ${scriptChunks.join('\n')}

    <!-- NOTE: application chunks will be injected by webpack on runtime -->
  </body>
</html>
  `;

  // If we're running the app locally, replace the placeholders immediately!
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    const localEnv = require('@commercetools-frontend/mc-http-server-config/env');
    return replaceHtmlPlaceholders(htmlContent, localEnv);
  }

  return htmlContent;
};
