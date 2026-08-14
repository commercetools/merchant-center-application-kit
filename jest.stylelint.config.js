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
    'coverage',
    '.cache',
    '.vercel',
    '.spec.js',
    '.vercel',
    'packages/jest-stylelint-runner/',
    'test-utils',
  ],
  testMatch: ['<rootDir>/**/*.css'],
  watchPlugins: ['jest-watch-typeahead/filename'],
};
