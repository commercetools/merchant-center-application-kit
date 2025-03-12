import type { Config } from 'jest';

const config: Config = {
  displayName: 'test-node',
  testEnvironment: 'node',
  moduleDirectories: ['packages-backend/', 'node_modules'],
  modulePathIgnorePatterns: [
    '.cache',
    'build/',
    'dist/',
    'packages/',
    'application-templates/',
    'custom-views-templates/',
    'playground/',
    'visual-testing-app/',
  ],
  testMatch: ['**/*.spec.js', '**/*.spec.ts'],
  watchPlugins: ['jest-watch-typeahead/filename'],
  reporters: [['github-actions', { silent: false }], 'default'],
};

export default config;
