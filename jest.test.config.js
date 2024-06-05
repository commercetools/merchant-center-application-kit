process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

/**
 * @type {import('@jest/types').Config.ProjectConfig}
 */
module.exports = {
  preset: '@commercetools-frontend/jest-preset-mc-app/typescript',
  globals: {
    // This is required for the `jose` library to work in the test environment.
    // We use it in the packages-backend/express package.
    // Reference: https://github.com/jestjs/jest/issues/4422#issuecomment-770274099
    Uint8Array: Uint8Array,
  },
  moduleDirectories: [
    'application-templates',
    'packages',
    'packages-backend',
    'playground',
    'node_modules',
  ],
  modulePathIgnorePatterns: ['.cache', 'build', 'dist', 'public/', 'examples'],
  transformIgnorePatterns: [
    // Transpile also our local packages as they are only symlinked.
    'node_modules/(?!(@commercetools-[frontend|backend]+)/)',
  ],
  testEnvironment: 'jsdom',
};
