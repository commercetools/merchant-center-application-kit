module.exports = {
  runner: '@commercetools-frontend/jest-preset-mc-app/stylelint-runner',
  displayName: 'stylelint',
  moduleFileExtensions: ['css', 'js'],
  modulePathIgnorePatterns: [
    'dist',
    '.spec.js',
    '.visualspec.js',
    '.visualroute.js',
    'website/public',
    'packages/mc-http-server/public/',
  ],
  testMatch: [
    '<rootDir>/**/*.css',
    '<rootDir>/packages/**/*.js',
    '<rootDir>/website/**/*.js',
  ],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-master'],
};
