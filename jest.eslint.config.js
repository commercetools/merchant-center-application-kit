module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'eslint',
  testMatch: [
    '<rootDir>/*.js',
    '<rootDir>/packages/**/*.js',
    '<rootDir>/playground/**/*.js',
    '<rootDir>/scripts/*.js',
  ],
  watchPlugins: ['jest-plugin-filename', 'jest-watch-master'],
};
