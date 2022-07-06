/**
 * NOTE: This file is pre-evaluated during build time, using `babel-plugin-preval`.
 * This is ok as the loaded files are static anyway and it prevents possible
 * loading issues when files are required through Webpack own context.
 */
const {
  getListOfSupportedMomentLocales,
} = require('../../../l10n/moment-utils');

module.exports = getListOfSupportedMomentLocales();
