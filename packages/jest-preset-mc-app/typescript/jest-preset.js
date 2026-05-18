const defaultPreset = require('../jest-preset');

module.exports = {
  ...defaultPreset,
  moduleFileExtensions: [
    'ts',
    'tsx',
    ...defaultPreset.moduleFileExtensions.filter(
      (ext) => ext !== 'ts' && ext !== 'tsx'
    ),
  ],
  testRegex: '\\.spec\\.[j|t]sx?$',
};
