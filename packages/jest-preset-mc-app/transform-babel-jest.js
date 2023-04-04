const { createTransformer } = require('babel-jest');
const getJestBabelPreset = require('babel-preset-jest');
const getBabePresetConfigForMcApp = require('@commercetools-frontend/babel-preset-mc-app');
const hasJsxRuntime = require('./has-jsx-runtime');
const loadConfig = require('./load-config');

const jestConfig = loadConfig();

const mcAppBabelConfig = getBabePresetConfigForMcApp(null, {
  runtime: hasJsxRuntime() ? 'automatic' : 'classic',
  disableCoreJs: jestConfig.babelConfig.disableCoreJs,
});

const jestBabelConfig = {
  // Avoid to look for the `babel.config.js`.
  configFile: false,
  ...mcAppBabelConfig,
  plugins: [...mcAppBabelConfig.plugins, ...getJestBabelPreset().plugins],
};

const transformer = createTransformer(jestBabelConfig);

module.exports = transformer;
