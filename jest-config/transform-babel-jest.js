const babelJest = require('babel-jest');
const getBabelPresetForMcApp = require('@commercetools-frontend/babel-preset-mc-app');

const babelConfig = getBabelPresetForMcApp();
const { presets, plugins } = babelConfig;

module.exports = babelJest.createTransformer({
  babelrc: false,
  presets,
  plugins,
});
