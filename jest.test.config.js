module.exports = {
  testEnvironment: 'jest-environment-jsdom-sixteen',
  preset: './packages/jest-preset-mc-app/jest-preset-for-typescript',
  moduleDirectories: [
    'application-templates',
    'packages',
    'playground',
    'node_modules',
  ],
  modulePathIgnorePatterns: ['examples'],
  transformIgnorePatterns: [
    // Transpile also our local packages as they are only symlinked.
    'node_modules/(?!(@commercetools-frontend)/)',
  ],
};
