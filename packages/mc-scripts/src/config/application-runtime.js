/* eslint-disable */
// Dynamically inject webpack `publicPath`, for resolving assets locations.
// https://webpack.js.org/guides/public-path/#on-the-fly
// https://webpack.js.org/configuration/output/#output-publicpath
if (process.env.NODE_ENV !== 'test') {
  const basePath = `${window.app.cdnUrl.replace(/\/$/, '')}/`;

  // Webpack
  __webpack_public_path__ = basePath;

  // Vite
  window.__dynamicImportHandler__ = function (importer) {
    return basePath + importer;
  };
  window.__dynamicImportPreload__ = function (preloads) {
    return preloads.map((preload) => basePath + preload);
  };
}
