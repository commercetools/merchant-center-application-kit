module.exports = {
  runner: 'jest-runner-stylelint',
  displayName: 'stylelint',
  moduleFileExtensions: ['css'],
  modulePathIgnorePatterns: ['dist', 'examples'],
  testMatch: ['<rootDir>/**/*.css'],
  watchPlugins: ['jest-plugin-filename', 'jest-watch-master'],
};
