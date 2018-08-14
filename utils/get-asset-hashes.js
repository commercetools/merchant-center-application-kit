/**
 * NOTE:
 *   This file generates hashes used by the `mc-http-server` for CSP.
 *   Without these headers we would not allow the scripts to execute
 *   as we don't want to execute any JavaScript which might have been
 *   tampered with.
 */
const assets = require('../html-scripts');
const createAssetHash = require('./create-asset-hash');

module.exports = () => [
  createAssetHash(assets.dataLayer),
  createAssetHash(assets.loadingScreen),
];
