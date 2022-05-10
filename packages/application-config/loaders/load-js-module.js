/**
 * This script file is used to load and parse a JS module in a child process,
 * to isolate the Babel configuration from the main program and avoid causing
 * unnecessary issues.
 *
 * NOTE: keep this file as a `.js` file, as we want to be able to run this
 * in any Node environment.
 */

const get = require('lodash/get');

function requireModule(filePath) {
  // Load JS modules using Babel, as we need to load
  // the config synchronously with `require`, no `await import`.
  require('@babel/register')({
    babelrc: false,
    extensions: ['.js', '.cjs', '.mjs', '.ts'],
    presets: [
      require.resolve('@commercetools-frontend/babel-preset-mc-app/production'),
    ],
  });

  // Require the module. It's expected that the module exports the application config
  const moduleExport = require(filePath);
  // In case we are loading an ES module, we need to pick the `default` export.
  return get(moduleExport, 'default', moduleExport);
}

module.exports = requireModule;
