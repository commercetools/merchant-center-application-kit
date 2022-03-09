/**
 * This script file is used to load and parse a JS module in a child process,
 * to isolate the Babel configuration from the main program and avoid causing
 * unnecessary issues.
 *
 * NOTE: keep this file as a `.js` file, as we want to be able to run this
 * in any Node environment.
 */

// Ensure there is a babel/node environment variable set, otherwise the
// babel preset throws an error.
process.env.BABEL_ENV = 'development';

const get = require('lodash/get');

// Load JS modules using Babel, as we need to load
// the config synchronously with `require`, no `await import`.
require('@babel/register')({
  babelrc: false,
  extensions: ['.js', '.cjs', '.mjs', '.ts'],
  presets: ['@commercetools-frontend/babel-preset-mc-app'],
});

// The file to `require` is passed as the main argument to this script file.
const [filePath] = process.argv.slice(2);

// Require the module. It's expected that the module exports the application config
const moduleExport = require(filePath);

// In case we are loading an ES module, we need to pick the `default` export.
const result = get(moduleExport, 'default', moduleExport);

// Write the application config to `stdout`so that the main program can read it.
process.stdout.write(JSON.stringify(result));
