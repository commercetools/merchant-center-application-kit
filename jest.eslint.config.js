module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'eslint',
  modulePathIgnorePatterns: ['dist', 'public'],
  testMatch: ['<rootDir>/**/*.js', '<rootDir>/**/*.ts', '<rootDir>/**/*.tsx'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-master'],
};
