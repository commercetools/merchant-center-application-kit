module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'eslint',
  testMatch: ['<rootDir>/src/**/*.js'],
  watchPlugins: ['jest-plugin-filename'],
};
