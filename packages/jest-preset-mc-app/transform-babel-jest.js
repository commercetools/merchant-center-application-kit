const getBabePresetConfigForMcApp = require('@commercetools-frontend/babel-preset-mc-app');
const getJestBabelPreset = require('babel-preset-jest');
const babelJest = require('babel-jest');
const hasJsxRuntime = require('./has-jsx-runtime');

const mcAppBabelConfig = getBabePresetConfigForMcApp(null, {
  runtime: hasJsxRuntime() ? 'automatic' : 'classic',
});

const jestBabelConfig = {
  // Avoid to look for the `babel.config.js`.
  configFile: false,
  ...mcAppBabelConfig,
  plugins: [...mcAppBabelConfig.plugins, ...getJestBabelPreset().plugins],
};

const transformer = babelJest.createTransformer(jestBabelConfig);

module.exports = transformer;
