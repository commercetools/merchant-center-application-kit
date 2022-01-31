const create = require('./create');

module.exports = function getBabePresetConfigForMcAppForProduction(api, opts) {
  return create(api, opts, 'production');
};
