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
    // NOTE: this is an optional dependency, we can keep the transform config here though
    '^.+\\.pegjs$': 'pegjs-jest',
  },
  transformIgnorePatterns: ['node_modules'],
  watchPlugins: ['jest-plugin-filename', 'jest-watch-master'],
};
