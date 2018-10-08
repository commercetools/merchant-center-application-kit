module.exports = {
  runner: 'jest-runner-stylelint',
  displayName: 'stylelint',
  moduleFileExtensions: ['css'],
  testMatch: ['<rootDir>/packages/**/*.css'],
  watchPlugins: ['jest-plugin-filename', 'jest-watch-master'],
};
