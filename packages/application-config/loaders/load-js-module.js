const get = require('lodash/get');

/**
 * Custom JS module loader.
 * This loader is used to load Custom Application config files that are not JSON files,
 * for example any JS or TS files.
 * To load the file, we need to make sure that we use our Babel preset to allow parsing
 * the file with the supported features. TypeScript files are also loaded via the preset.
 * Futhermore, we need to load the config file as a module, meaning that the exported
 * Custom Application config can potentially contain JS functions and these should be preserved.
 * To do that, we use `@babel/register` and ensure the Babel preset is used.
 */
function loadJsModule(filePath) {
  // Skip registering Babel for tests, as Babel is alrady configured.
  if (process.env.NODE_ENV !== 'test') {
    require('@babel/register')({
      babelrc: false,
      extensions: ['.js', '.cjs', '.mjs', '.ts'],
      presets: ['@commercetools-frontend/babel-preset-mc-app'],
    });
  }

  // Require the module. It's expected that the module exports the application config.
  const moduleExport = require(filePath);

  // In case we are loading an ES module, we need to pick the `default` export.
  return get(moduleExport, 'default', moduleExport);
}

module.exports = loadJsModule;
