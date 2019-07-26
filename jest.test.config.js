const vendorsToTranspile = require('./packages/jest-preset-mc-app/vendors-to-transpile');

module.exports = {
  preset: './packages/jest-preset-mc-app',
  moduleDirectories: [
    'application-templates',
    'packages',
    'playground',
    'node_modules',
  ],
  modulePathIgnorePatterns: ['examples'],
  transformIgnorePatterns: [
    // Transpile also our local packages as they are only symlinked.
    // Exclude ui-kit from being transpiled though.
    'node_modules/@commercetools-frontend/ui-kit',
    `node_modules/(?!(${vendorsToTranspile}|@commercetools-frontend)/)`,
  ],
};
