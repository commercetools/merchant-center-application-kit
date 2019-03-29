/* eslint-disable */
// Dynamically inject webpack `publicPath`, for resolving assets locations.
// https://webpack.js.org/guides/public-path/#on-the-fly
// https://webpack.js.org/configuration/output/#output-publicpath
if (process.env.NODE_ENV !== 'test')
  __webpack_public_path__ = `${window.app.cdnUrl.replace(/\/$/, '')}/`;
