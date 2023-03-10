const babelJest = require('babel-jest');
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

/**
 * NOTE:
 *  In `babel-jest` v27 the export has changed
 *  from: `babelJest.createTransformer`
 *  to `babelJest.default.createTransformer`.
 *  In order to remain backwards compatible the
 *  type of the export is checked.
 */
const createTransformer =
  typeof babelJest.createTransformer === 'function'
    ? babelJest.createTransformer
    : babelJest.default.createTransformer;

const transformer = createTransformer(jestBabelConfig);

module.exports = transformer;
