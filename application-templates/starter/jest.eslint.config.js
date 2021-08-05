/**
 * @type {import('@jest/types').Config.ProjectConfig}
 */
module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'eslint',
  moduleFileExtensions: ['js'],
  modulePathIgnorePatterns: ['.yarn', '.cache', 'build/', 'dist/', 'public/'],
  testMatch: ['<rootDir>/**/*.js'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-runner-eslint/watch-fix',
  ],
};
