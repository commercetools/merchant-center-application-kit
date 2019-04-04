/* eslint-disable no-console */
const mri = require('mri');
const {
  loadEnv,
  loadHeaders,
} = require('@commercetools-frontend/mc-html-template');

const flags = mri(process.argv.slice(2), { alias: { help: ['h'] } });

if (flags.help) {
  console.log(`
  Usage: mc-http-server [options]

  Options:
  --config=<path>           (required) The path to the environment config (defined as a JSON file, e.g. "env.json").
  --csp=<path>              (optional) The path to the custom CSP directives config (defined as a JSON file, e.g. "csp.json").
  --use-local-assets        (optional) If this option is enabled, the "dist/assets" will be used to start the http-server package. This requires that the assets have been built before running this script.
  `);
}
if (!flags.config) {
  throw new Error('Missing required option "--config"');
}
const configPath = flags.config;
const cspPath = flags.csp;
const useLocalAssets = flags['use-local-assets'];

const env = loadEnv(configPath);
const headers = loadHeaders(env, { cspPath });

module.exports = {
  env,
  headers,
  useLocalAssets,
};
