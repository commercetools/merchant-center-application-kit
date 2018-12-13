module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'eslint',
  modulePathIgnorePatterns: ['dist', 'examples'],
  testMatch: ['<rootDir>/**/*.js'],
  watchPlugins: ['jest-plugin-filename', 'jest-watch-master'],
};
