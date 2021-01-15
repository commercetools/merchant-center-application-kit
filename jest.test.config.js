module.exports = {
  preset: './packages/jest-preset-mc-app/jest-preset-for-typescript',
  moduleDirectories: [
    'application-templates',
    'packages',
    'packages-backend',
    'playground',
    'node_modules',
  ],
  modulePathIgnorePatterns: ['build', 'dist', 'public/', 'examples'],
  transformIgnorePatterns: [
    // Transpile also our local packages as they are only symlinked.
    'node_modules/(?!(@commercetools-[frontend|backend]+)/)',
  ],
  testEnvironment: 'jsdom',
};
