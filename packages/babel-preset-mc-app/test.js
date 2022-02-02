const create = require('./create');

module.exports = function getBabePresetConfigForMcAppForTest(api, opts) {
  return create(api, opts, 'test');
};
