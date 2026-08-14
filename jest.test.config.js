process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

const {
  watchPlugins: _watchPlugins,
  ...nodeTestPreset
} = require('./packages/jest-preset-mc-app/typescript/jest-preset');

/**
 * This config uses Jest "projects" to run three test suites in a single
 * `pnpm test` invocation, each with its own environment:
 *
 *  - "test"         — the main suite (jsdom). Uses the MC app preset which
 *                     sets up window.app, localStorage mocks, etc.
 *  - "application-config" — Node-only config processing tests. Static files
 *                     must not be replaced by the browser preset's stubs.
 *  - "eslint-rules" — ESLint config and rule tests (node). These use ESLint's
 *                     RuleTester which requires `structuredClone` (available
 *                     in Node but not in jsdom) and has no DOM dependencies.
 *                     The MC app preset's setup files also assume jsdom
 *                     (they write to `global.window`), so these tests cannot
 *                     run under the main project.
 *
 * If you add more custom ESLint rules under
 * packages/eslint-config-mc-app/rules/, their *.spec.js files will be
 * picked up automatically by the "eslint-rules" project.
 *
 * @type {import('@jest/types').Config.InitialOptions}
 */

module.exports = {
  projects: [
    // Main application test suite — jsdom environment.
    {
      displayName: 'test',
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
      testPathIgnorePatterns: [
        '/node_modules/',
        // These Node-only tests need real static files rather than the preset's
        // moduleNameMapper file stubs (see the dedicated project below).
        'packages/application-config/test/',
        // Excluded here because these tests need the node environment (see below).
        'packages/eslint-config-mc-app/rules/',
        'packages/eslint-config-mc-app/index.spec.js',
      ],
      transformIgnorePatterns: [
        // Transpile local symlinked packages and ESM-only deps (uuid,
        // @faker-js/faker — the latter is pulled in transitively by
        // @commercetools/composable-commerce-test-data and dropped its
        // CommonJS build starting with v10).
        'node_modules/(?!\\.pnpm/(uuid@|@faker-js\\+faker@))(?!(@commercetools-[frontend|backend]+|uuid|@faker-js/faker)/)',
      ],
      testEnvironment: 'jsdom',
    },
    // application-config reads files referenced by `${path:...}` placeholders.
    // Run its tests without the browser preset's asset mapper so SVG paths
    // resolve to their real contents and missing modules still throw.
    {
      ...nodeTestPreset,
      displayName: 'application-config',
      testEnvironment: 'node',
      testRegex: 'packages/application-config/test/.*\\.spec\\.[jt]s$',
      moduleNameMapper: {},
      modulePathIgnorePatterns: ['build', 'dist'],
      setupFiles: [],
      setupFilesAfterEnv: [],
    },
    // Custom ESLint rule tests — node environment, no preset/setup files.
    // `transform: {}` disables Babel so the MC app preset's babel-plugin-istanbul
    // doesn't conflict with Jest's own coverage instrumentation.
    {
      displayName: 'eslint-rules',
      testEnvironment: 'node',
      testMatch: [
        '<rootDir>/packages/eslint-config-mc-app/rules/**/*.spec.js',
        '<rootDir>/packages/eslint-config-mc-app/index.spec.js',
      ],
      transform: {},
    },
  ],
};
