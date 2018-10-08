module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'eslint',
  testMatch: ['<rootDir>/packages/**/*.js'],
  watchPlugins: ['jest-plugin-filename', 'jest-watch-master'],
};
