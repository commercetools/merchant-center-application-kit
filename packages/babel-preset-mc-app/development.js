const create = require('./create');

module.exports = function getBabePresetConfigForMcAppForDevelopment(api, opts) {
  return create(api, opts, 'development');
};
