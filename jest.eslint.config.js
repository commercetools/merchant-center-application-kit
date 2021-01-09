module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'eslint',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  modulePathIgnorePatterns: [
    '.yarn',
    '.cache',
    'build',
    'dist',
    'public/',
    'generated',
  ],
  testMatch: ['<rootDir>/**/*.js', '<rootDir>/**/*.ts', '<rootDir>/**/*.tsx'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-master'],
};
