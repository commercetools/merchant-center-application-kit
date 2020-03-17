const defaultPreset = require('./jest-preset');

module.exports = {
  ...defaultPreset,
  testEnvironment: 'jest-environment-jsdom-sixteen',
};
