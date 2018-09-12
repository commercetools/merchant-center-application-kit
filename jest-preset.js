const path = require('path');

// Resolve the absolute path of the caller location.
const rootPath = process.cwd();
const resolveRelativePath = relativePath =>
  path.resolve(__dirname, relativePath);

module.exports = {
  displayName: 'test',
  globals: {
    'process.env': {
      NODE_ENV: 'test',
    },
  },
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': resolveRelativePath(
      './transform-file.js'
    ),
    '\\.css$': 'identity-obj-proxy',
  },
  rootDir: rootPath,
  setupFiles: [
    'raf/polyfill',
    resolveRelativePath('./setup-tests.js'),
    'jest-localstorage-mock',
  ],
  setupTestFrameworkScriptFile: resolveRelativePath(
    './setup-test-framework.js'
  ),
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'jsdom',
  testURL: 'https://mc.commercetools.com/',
  testPathIgnorePatterns: ['node_modules', 'cypress'],
  testRegex: '\\.spec\\.js$',
  transform: {
    '^.+\\.js$': resolveRelativePath('./transform-babel-jest.js'),
    '^.+\\.graphql$': 'jest-transform-graphql',
    '^.+\\.pegjs$': 'pegjs-jest',
  },
  transformIgnorePatterns: [
    // This option tells Jest to ignore specific folders from being transpiled
    // (e.g. with babel).
    // However we need to instruct jest to actually transpile some packages.
    // NOTE: this might not be necessary anymore once we ship packages already
    // transpiled.
    'node_modules/(?!(@commercetools-frontend)/)',
  ],
  watchPlugins: ['jest-plugin-filename', 'jest-watch-master'],
};
