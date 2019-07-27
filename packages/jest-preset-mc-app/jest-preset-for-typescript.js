const defaultPreset = require('./jest-preset');

module.exports = {
  ...defaultPreset,
  moduleFileExtensions: ['ts', 'tsx', ...defaultPreset.moduleFileExtensions],
  testRegex: '\\.spec\\.[j|t]sx?$',
  transform: {
    ...defaultPreset.transform,
    '^.+\\.tsx?$': 'ts-jest',
  },
};
