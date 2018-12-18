module.exports = {
  preset: './packages/jest-preset-mc-app',
  moduleDirectories: ['packages', 'playground', 'node_modules'],
  modulePathIgnorePatterns: ['examples'],
  transformIgnorePatterns: [
    // This option tells Jest to ignore specific folders from being transpiled
    // (e.g. with babel).
    // However we need to instruct jest to actually transpile our local shared
    // dependencies (e.g. `packages`) which are symlinked as dependencies
    // in node_modules. Since the name of those packages are scoped with
    // `@commercetools-local` we simply match the JS files within those folders.
    'node_modules/@commercetools-frontend/ui-kit',
    'node_modules/(?!(@commercetools-frontend)/)',
  ],
};
