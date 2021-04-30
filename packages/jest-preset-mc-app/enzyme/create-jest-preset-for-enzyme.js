const path = require('path');
const defaultPreset = require('../jest-preset');

const resolveRelativePath = (relativePath) =>
  path.resolve(__dirname, relativePath);

const createJestPresetForEnzyme = (version) => ({
  ...defaultPreset,
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: [
    resolveRelativePath('../setup-test-framework.js'),
    resolveRelativePath(`./setup-test-framework-for-enzyme-${version}.js`),
  ],
});

module.exports = createJestPresetForEnzyme;
