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
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
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
  setupFilesAfterEnv: [resolveRelativePath('./setup-test-framework.ts')],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'jsdom',
  testURL: 'https://mc.commercetools.com/',
  testPathIgnorePatterns: ['node_modules', 'cypress'],
  testRegex: '\\.spec\\.[j|t]sx?$',
  transform: {
    '^.+\\.js$': resolveRelativePath('./transform-babel-jest.js'),
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.graphql$': 'jest-transform-graphql',
  },
  transformIgnorePatterns: ['node_modules'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-master'],
};
