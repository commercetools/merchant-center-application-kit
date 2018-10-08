module.exports = {
  preset: './packages/jest-preset-mc-app',
  moduleDirectories: [
    'src',
    'packages',
    'node_modules',
  ],
  transformIgnorePatterns: [
    // This option tells Jest to ignore specific folders from being transpiled
    // (e.g. with babel).
    // However we need to instruct jest to actually transpile our local shared
    // dependencies (e.g. `packages`) which are symlinked as dependencies
    // in node_modules. Since the name of those packages are scoped with
    // `@commercetools-local` we simply match the JS files within those folders.
    '/node_modules/',
    'node_modules/(?!(@commercetools-frontend/actions-global)/)',
    'node_modules/(?!(@commercetools-frontend/application-shell)/)',
    'node_modules/(?!(@commercetools-frontend/application-shell-connectors)/)',
    'node_modules/(?!(@commercetools-frontend/babel-preset-mc-app)/)',
    'node_modules/(?!(@commercetools-frontend/browser-history)/)',
    'node_modules/(?!(@commercetools-frontend/constants)/)',
    'node_modules/(?!(@commercetools-frontend/eslint-config-mc-app)/)',
    'node_modules/(?!(@commercetools-frontend/i18n)/)',
    'node_modules/(?!(@commercetools-frontend/jest-preset-mc-app)/)',
    'node_modules/(?!(@commercetools-frontend/l10n)/)',
    'node_modules/(?!(@commercetools-frontend/mc-html-template)/)',
    'node_modules/(?!(@commercetools-frontend/mc-http-server)/)',
    'node_modules/(?!(@commercetools-frontend/mc-scripts)/)',
    'node_modules/(?!(@commercetools-frontend/notifications)/)',
    'node_modules/(?!(@commercetools-frontend/permissions)/)',
    'node_modules/(?!(@commercetools-frontend/react-notifications)/)',
    'node_modules/(?!(@commercetools-frontend/sdk)/)',
    'node_modules/(?!(@commercetools-frontend/sentry)/)',
    'node_modules/(?!(@commercetools-frontend/storage)/)',
    'node_modules/(?!(@commercetools-frontend/url-utils)/)',
  ],
};
