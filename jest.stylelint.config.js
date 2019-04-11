module.exports = {
  runner: 'jest-runner-stylelint',
  displayName: 'stylelint',
  moduleFileExtensions: ['css'],
  modulePathIgnorePatterns: ['dist'],
  testMatch: ['<rootDir>/**/*.css'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-master'],
};
