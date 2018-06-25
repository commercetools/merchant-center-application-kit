const path = require('path');
const createWebpackConfigForDevelopment = require('@commercetools-frontend/mc-scripts/config/create-webpack-config-for-development');

const distPath = path.resolve(__dirname, 'dist');
const entryPoint = path.resolve(__dirname, 'src/index.js');
const sourceFolders = [
  path.resolve(__dirname, 'src'),
  path.resolve(__dirname, 'node_modules/@commercetools-frontend'),
];

module.exports = createWebpackConfigForDevelopment({
  distPath,
  entryPoint,
  sourceFolders,
});
