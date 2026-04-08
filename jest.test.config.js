process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

/**
 * This config uses Jest "projects" to run two test suites in a single
 * `pnpm test` invocation, each with its own environment:
 *
 *  - "test"         — the main suite (jsdom). Uses the MC app preset which
 *                     sets up window.app, localStorage mocks, etc.
 *  - "eslint-rules" — custom ESLint rule tests (node). These use ESLint's
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
        // Excluded here because these tests need the node environment (see below).
        'packages/eslint-config-mc-app/rules/',
      ],
      transformIgnorePatterns: [
        // Transpile also our local packages as they are only symlinked.
        'node_modules/(?!(@commercetools-[frontend|backend]+)/)',
      ],
      testEnvironment: 'jsdom',
    },
    // Custom ESLint rule tests — node environment, no preset/setup files.
    // `transform: {}` disables Babel so the MC app preset's babel-plugin-istanbul
    // doesn't conflict with Jest's own coverage instrumentation.
    {
      displayName: 'eslint-rules',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/packages/eslint-config-mc-app/rules/**/*.spec.js'],
      transform: {},
    },
  ],
};
