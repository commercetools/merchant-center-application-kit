/**
 * NOTE:
 *   This file generates hashes used by the `mc-http-server` for CSP.
 *   Without these headers we would not allow the scripts to execute
 *   as we don't want to execute any JavaScript which might have been
 *   tampered with.
 */
const createAssetHash = require('./create-asset-hash');
const getAssets = require('./get-assets');

const assets = getAssets();

module.exports = () => [
  createAssetHash(assets.dataLayerScript),
  createAssetHash(assets.loadingScreenScript),
];
