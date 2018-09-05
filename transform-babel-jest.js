const getBabePresetConfigForMcApp = require('@commercetools-frontend/babel-preset-mc-app');
const jestBabelPreset = require('babel-preset-jest');

const mcAppBabelConfig = getBabePresetConfigForMcApp();

const jestBabelConfig = {
  ...mcAppBabelConfig,
  plugins: [...mcAppBabelConfig.plugins, ...jestBabelPreset.plugins],
};

module.exports = require('babel-jest').createTransformer(jestBabelConfig);
