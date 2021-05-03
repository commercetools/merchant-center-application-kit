const path = require('path');

const resolveRelativePath = (relativePath) =>
  path.resolve(__dirname, relativePath);

const createJestPresetForEnzyme = (version, jestPreset) => ({
  // Use default preset
  ...jestPreset,
  snapshotSerializers: [
    ...(jestPreset.snapshotSerializers || []),
    'enzyme-to-json/serializer',
  ],
  setupFilesAfterEnv: [
    ...(jestPreset.setupFilesAfterEnv || []),
    resolveRelativePath(`./setup-test-framework-for-enzyme-${version}.js`),
  ],
});

module.exports = createJestPresetForEnzyme;
