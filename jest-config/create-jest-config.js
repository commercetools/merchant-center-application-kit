module.exports = ({ resolveRelativePath, rootDir }) => ({
  displayName: 'test',
  globals: {
    'process.env': {
      NODE_ENV: 'test',
    },
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': resolveRelativePath(
      './jest-config/transform-file.js'
    ),
    '\\.(css)$': 'identity-obj-proxy',
  },
  rootDir,
  setupFiles: [
    'raf/polyfill',
    resolveRelativePath('./jest-config/setup-tests.js'),
    'jest-localstorage-mock',
  ],
  setupTestFrameworkScriptFile: resolveRelativePath(
    './jest-config/setup-test-framework.js'
  ),
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'jsdom',
  testURL: 'https://mc.commercetools.com/',
  testPathIgnorePatterns: ['node_modules', 'cypress'],
  testRegex: '\\.spec\\.js$',
  transform: {
    '^.+\\.(graphql)$': 'jest-transform-graphql',
    '^.+\\.pegjs$': 'pegjs-jest',
    '^.+\\.(js|jsx|mjs)$': resolveRelativePath(
      './jest-config/transform-babel-jest.js'
    ),
    '^(?!.*\\.(js|jsx|mjs|css|json|graphql)$)': resolveRelativePath(
      './jest-config/transform-file.js'
    ),
  },
  watchPlugins: ['jest-plugin-filename'],
});
