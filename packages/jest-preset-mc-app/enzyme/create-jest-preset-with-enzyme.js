const path = require('path');

const resolveRelativePath = (relativePath) =>
  path.resolve(__dirname, relativePath);

const createJestPresetForEnzyme = ({ enzymeAdapterVersion, jestPreset }) => {
  switch (enzymeAdapterVersion) {
    case 16:
    case 17:
      break;
    default:
      throw new Error(
        `Invalid Enzyme adapter version "${enzymeAdapterVersion}". Supported versions are "16", "17".`
      );
  }
  return {
    // Use default preset
    ...jestPreset,
    snapshotSerializers: [
      ...(jestPreset.snapshotSerializers || []),
      'enzyme-to-json/serializer',
    ],
    setupFilesAfterEnv: [
      ...(jestPreset.setupFilesAfterEnv || []),
      resolveRelativePath(
        `./setup-test-framework-for-enzyme-${enzymeAdapterVersion}.js`
      ),
    ],
  };
};

module.exports = createJestPresetForEnzyme;
