process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

/**
 * @type {import('@jest/types').Config.ProjectConfig}
 */
module.exports = {
  preset: '@commercetools-frontend/jest-preset-mc-app/typescript',
  moduleDirectories: [
    'application-templates/',
    'custom-views-templates/',
    'packages/',
    'playground/',
    'node_modules/',
  ],
  modulePathIgnorePatterns: [
    '.cache',
    'build',
    'dist',
    'public/',
    'examples',
    'packages-backend/',
  ],
  transformIgnorePatterns: [
    // Transpile also our local packages as they are only symlinked.
    'node_modules/(?!(@commercetools-[frontend|backend]+)/)',
  ],
  testEnvironment: 'jsdom',
};
