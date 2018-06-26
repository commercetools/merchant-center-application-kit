module.exports = {
  preset: '@commercetools-frontend/jest-preset-mc-app',
  moduleDirectories: ['src', 'node_modules'],
  transformIgnorePatterns: [
    // This option tells Jest to ignore specific folders from being transpiled
    // (e.g. with babel).
    // However we need to instruct jest to actually transpile some packages.
    '/node_modules/(?!(@commercetools-frontend.*?\\.(js|graphql)$))',
  ],
};
