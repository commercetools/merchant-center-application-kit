module.exports = {
  runner: '@commercetools-frontend/jest-stylelint-runner',
  displayName: 'stylelint',
  moduleFileExtensions: ['css', 'js'],
  modulePathIgnorePatterns: [
    'build',
    'dist',
    'public/',
    '.spec.js',
    '.visualspec.js',
    '.visualroute.js',
    'packages/jest-stylelint-runner/',
    'test-utils',
  ],
  testMatch: [
    '<rootDir>/**/*.css',
    '<rootDir>/packages/**/*.js',
    '<rootDir>/website/**/*.js',
  ],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-master'],
};
