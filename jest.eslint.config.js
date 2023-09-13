/**
 * @type {import('@jest/types').Config.ProjectConfig}
 */
module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'eslint',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  modulePathIgnorePatterns: [
    '.cache',
    '.vercel',
    'build/',
    'dist/',
    'public/',
    'generated',
    'compiled-data',
  ],
  testMatch: [
    '<rootDir>/**/*.js',
    '<rootDir>/**/*.jsx',
    '<rootDir>/**/*.ts',
    '<rootDir>/**/*.tsx',
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-runner-eslint/watch-fix',
  ],
};
