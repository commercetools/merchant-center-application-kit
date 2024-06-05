const path = require('path');

// Resolve the absolute path of the caller location.
const rootPath = process.cwd();
const resolveRelativePath = (relativePath) =>
  path.resolve(__dirname, relativePath);

const defaultTransformFile = resolveRelativePath('./transform-file.js');
const defaultSetupTests = resolveRelativePath('./setup-tests.js');
const defaultSetupTestFramework = resolveRelativePath(
  './setup-test-framework.js'
);
const defaultTransformBabelJest = resolveRelativePath(
  './transform-babel-jest.js'
);
const defaultTransformGraphQL = resolveRelativePath('./transform-graphql.js');
const defaultModuleExportsResolver = resolveRelativePath(
  './module-exports-resolver.js'
);

module.exports = {
  displayName: 'test',
  globals: {
    'process.env': {
      NODE_ENV: 'test',
    },
  },
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'json'],
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      defaultTransformFile,
    '\\.css$': 'identity-obj-proxy',
  },
  resolver: defaultModuleExportsResolver,
  rootDir: rootPath,
  setupFiles: ['raf/polyfill', defaultSetupTests, 'jest-localstorage-mock'],
  setupFilesAfterEnv: [defaultSetupTestFramework],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'https://mc.europe-west1.gcp.commercetools.com/',
  },
  testPathIgnorePatterns: ['node_modules', 'cypress'],
  testRegex: '\\.spec\\.jsx?$',
  transform: {
    '^.+\\.(js|jsx|mjs|ts|tsx)$': defaultTransformBabelJest,
    '^.+\\.graphql$': defaultTransformGraphQL,
  },
  watchPlugins: ['jest-watch-typeahead/filename'],
};
