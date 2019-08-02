const defaultPreset = require('./jest-preset');

module.exports = {
  ...defaultPreset,
  moduleFileExtensions: ['ts', 'tsx', ...defaultPreset.moduleFileExtensions],
  testRegex: '\\.spec\\.[j|t]sx?$',
  transform: {
    ...defaultPreset.transform,
    '^.+\\.tsx?$': 'ts-jest',
  },
  // Without this option, somehow CI fails to run the tests with the following error:
  //   TypeError: Unable to require `.d.ts` file.
  //   This is usually the result of a faulty configuration or import. Make sure there is a `.js`, `.json` or another executable extension available alongside `core.ts`.
  // Fix is based on this comment:
  // - https://github.com/kulshekhar/ts-jest/issues/805#issuecomment-456055213
  // - https://github.com/kulshekhar/ts-jest/blob/master/docs/user/config/isolatedModules.md
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
