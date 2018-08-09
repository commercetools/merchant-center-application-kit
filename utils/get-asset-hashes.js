const createAssetHash = require('./create-asset-hash');
const getAssets = require('./get-assets');

const assets = getAssets();

module.exports = () => [
  createAssetHash(assets.dataLayerScript),
  createAssetHash(assets.loadingScreenScript),
];
