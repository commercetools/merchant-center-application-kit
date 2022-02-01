/**
 * @type {import('@jest/types').Config.ProjectConfig}
 */
module.exports = {
  runner: '@commercetools-frontend/jest-stylelint-runner',
  displayName: 'stylelint',
  moduleFileExtensions: ['css'],
  modulePathIgnorePatterns: [
    'build',
    'dist',
    'public/',
    'compiled',
    '.cache',
    '.spec.js',
    '.visualspec.js',
    '.visualroute.js',
    'packages/jest-stylelint-runner/',
    'test-utils',
  ],
  testMatch: ['<rootDir>/**/*.css'],
  watchPlugins: ['jest-watch-typeahead/filename'],
};
