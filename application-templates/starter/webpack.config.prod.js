const path = require('path');
const createWebpackConfigForProduction = require('@commercetools-frontend/mc-scripts/config/create-webpack-config-for-production');

const distPath = path.resolve(__dirname, 'dist');
const entryPoint = path.resolve(__dirname, 'src/index.js');
const sourceFolders = [path.resolve(__dirname, 'src')];

module.exports = createWebpackConfigForProduction({
  distPath,
  entryPoint,
  sourceFolders,
});
