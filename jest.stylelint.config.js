module.exports = {
  runner: 'jest-runner-stylelint',
  displayName: 'stylelint',
  moduleFileExtensions: ['css'],
  modulePathIgnorePatterns: ['dist'],
  testMatch: ['<rootDir>/packages/**/*.css', '<rootDir>/playground/**/*.css'],
  watchPlugins: ['jest-plugin-filename', 'jest-watch-master'],
};
