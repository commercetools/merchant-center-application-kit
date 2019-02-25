const path = require('path');
const createWebpackConfigForProduction = require('@commercetools-frontend/mc-scripts/config/create-webpack-config-for-production');

const distPath = path.resolve(__dirname, 'dist');
const entryPoint = path.resolve(__dirname, 'src/index.js');
const sourceFolders = [path.resolve(__dirname, 'src')].concat([
  'node_modules/omit-empty',
]);

module.exports = createWebpackConfigForProduction({
  distPath,
  entryPoint,
  sourceFolders,
});
