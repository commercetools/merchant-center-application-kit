# Migrating to ESLint 9 Flat Config

This guide covers migrating from ESLint 8 (legacy `.eslintrc` format) to ESLint 9 (flat config) for projects using `@commercetools-frontend/eslint-config-mc-app`.

> **AI agents**: This document is structured as step-by-step instructions that can be followed automatically. Read the existing config files before generating new ones.

## Step 1: Discover existing config

Find and read all ESLint-related files in the project:

- `.eslintrc.js`, `.eslintrc.json`, `.eslintrc.yaml`, `.eslintrc.yml`, or `.eslintrc`
- `.eslintignore`
- `package.json` (for dependencies and lint scripts)

## Step 2: Analyze the legacy config

Extract the following from the existing `.eslintrc.*`:

1. **`extends`** — which configs are extended
2. **`plugins`** — registered as strings (e.g., `['@graphql-eslint']`)
3. **`rules`** — top-level rule overrides
4. **`overrides`** — with their `files`, `parser`, `parserOptions`, `plugins`, and `rules`
5. **`env`** — environment globals (e.g., `browser: true`, `node: true`)
6. **`settings`** — ESLint settings (e.g., React version)
7. **Environment variables** — any `process.env` assignments before `module.exports` (e.g., `ENABLE_NEW_JSX_TRANSFORM`)

Also collect all patterns from `.eslintignore` if it exists.

## Step 3: Create `eslint.config.js`

### Base structure

```js
// Preserve any process.env assignments from the old config
process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

// Plugins are now imported as objects, not strings
const somePlugin = require('some-eslint-plugin');

// The commercetools config exports a flat config array
const mcAppConfig = require('@commercetools-frontend/eslint-config-mc-app');

module.exports = [
  // Ignores replace .eslintignore
  { ignores: ['dist/', 'build/'] },

  // Spread the base config
  ...mcAppConfig,

  // Project-specific overrides follow...
];
```

### Converting `extends`

Remove the commercetools config from `extends` — it's now spread as `...mcAppConfig`. If other shared configs were extended, import and spread them too (check that they support flat config).

### Converting `plugins`

Plugins registered as strings become imported objects:

```js
// Before (legacy):
//   plugins: ['@graphql-eslint']

// After (flat config):
const graphqlPlugin = require('@graphql-eslint/eslint-plugin');
// Use in config as:
//   plugins: { '@graphql-eslint': graphqlPlugin }
```

### Converting `overrides`

Each `overrides` entry becomes a separate object in the config array:

```js
// Before (legacy):
overrides: [
  {
    files: ['**/*.graphql'],
    parser: '@graphql-eslint/eslint-plugin',
    parserOptions: {
      graphQLConfig: { schema: './schema.json' },
    },
    rules: {
      '@graphql-eslint/known-type-names': 'error',
    },
  },
]

// After (flat config):
{
  files: ['**/*.graphql'],
  plugins: { '@graphql-eslint': graphqlPlugin },
  languageOptions: {
    parser: graphqlPlugin,
    parserOptions: {
      graphQLConfig: { schema: './schema.json' },
    },
  },
  rules: {
    '@graphql-eslint/known-type-names': 'error',
  },
}
```

Key property mappings:

| Legacy (`.eslintrc`)               | Flat config (`eslint.config.js`)                          |
| ---------------------------------- | --------------------------------------------------------- |
| `parser` (string)                  | `languageOptions.parser` (imported module)                |
| `parserOptions`                    | `languageOptions.parserOptions`                           |
| `env: { browser: true }`           | `languageOptions.globals` (use the `globals` npm package) |
| `plugins: ['name']` (string array) | `plugins: { name: importedPlugin }` (object)              |
| `files`                            | `files` (unchanged)                                       |
| `rules`                            | `rules` (unchanged)                                       |

### Converting top-level rules

Top-level rule overrides become a config object after the spread:

```js
module.exports = [
  ...mcAppConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // your rule overrides here
      'react/prop-types': 'off',
    },
  },
];
```

### Converting `.eslintignore`

Each ignore pattern becomes an entry in the `ignores` array. Directory patterns should end with `/`:

```js
// .eslintignore had:
//   dist
//   build
//   node_modules

// Becomes:
{
  ignores: ['dist/', 'build/', 'node_modules/'];
}
```

## Step 4: Update `package.json`

Update dependencies:

```diff
- "eslint": "8.57.1",
+ "eslint": "^9.0.0",

- "@commercetools-frontend/eslint-config-mc-app": "^25.0.0",
+ "@commercetools-frontend/eslint-config-mc-app": "^26.0.0",
```

Remove dependencies that are no longer needed:

- `@rushstack/eslint-patch` — not needed in flat config

Check `scripts` in `package.json` for any references to `.eslintrc` and update them if needed.

## Step 5: Clean up

- Delete `.eslintrc.js` (or `.eslintrc.json`, `.eslintrc.yaml`, whichever legacy config format was used)
- Delete `.eslintignore`

## Step 6: Verify

Run the project's lint command (e.g., `npm run lint` or `npx eslint .`) and check for:

- **Configuration errors** — fix the generated `eslint.config.js`
- **New lint violations** — the dependency upgrades may flag new issues:
  - `@typescript-eslint` v5→v8 (stricter type checking)
  - `eslint-plugin-jest` v27→v28 (new rules)
  - `eslint-plugin-react-hooks` v4→v5 (improved detection)
  - `eslint-plugin-testing-library` v5→v7 (new best practices)

Address any new violations or add rule overrides if needed.

## Complete examples

### Example 1: With GraphQL overrides

**Before** (`.eslintrc.js`):

```js
process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

module.exports = {
  extends: ['@commercetools-frontend/eslint-config-mc-app'],
  plugins: ['@graphql-eslint'],
  overrides: [
    {
      files: ['**/*.ctp.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      parserOptions: {
        graphQLConfig: { schema: './schemas/ctp.json' },
      },
      rules: {
        '@graphql-eslint/known-type-names': 'error',
        '@graphql-eslint/known-argument-names': 'error',
      },
    },
  ],
};
```

**After** (`eslint.config.js`):

```js
process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

const graphqlPlugin = require('@graphql-eslint/eslint-plugin');
const mcAppConfig = require('@commercetools-frontend/eslint-config-mc-app');

module.exports = [
  ...mcAppConfig,
  {
    files: ['**/*.ctp.graphql'],
    plugins: { '@graphql-eslint': graphqlPlugin },
    languageOptions: {
      parser: graphqlPlugin,
      parserOptions: {
        graphQLConfig: { schema: './schemas/ctp.json' },
      },
    },
    rules: {
      '@graphql-eslint/known-type-names': 'error',
      '@graphql-eslint/known-argument-names': 'error',
    },
  },
];
```

### Example 2: Simplest case (no custom overrides)

**Before** (`.eslintrc.js`):

```js
process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';
module.exports = {
  extends: ['@commercetools-frontend/eslint-config-mc-app'],
};
```

**After** (`eslint.config.js`):

```js
process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';
module.exports = require('@commercetools-frontend/eslint-config-mc-app');
```

### Example 3: With custom rules and ignores

**Before** (`.eslintrc.js`):

```js
module.exports = {
  extends: ['@commercetools-frontend/eslint-config-mc-app'],
  rules: {
    'react/prop-types': 'off',
    'import/order': ['error', { alphabetize: { order: 'asc' } }],
  },
};
```

**Before** (`.eslintignore`):

```
dist
build
coverage
```

**After** (`eslint.config.js`):

```js
const mcAppConfig = require('@commercetools-frontend/eslint-config-mc-app');

module.exports = [
  { ignores: ['dist/', 'build/', 'coverage/'] },
  ...mcAppConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'react/prop-types': 'off',
      'import/order': ['error', { alphabetize: { order: 'asc' } }],
    },
  },
];
```

## Troubleshooting

### Error: "Cannot find module 'some-eslint-plugin'"

Plugins must now be installed as direct dependencies. If you see this error, install the plugin:

```bash
npm install --save-dev some-eslint-plugin
```

### Error: "context.getScope is not a function"

This indicates an incompatible plugin version. Update the plugin to its latest major version that supports ESLint 9.

### Lint violations in test files

The testing-library plugin v7 has stricter rules. Common issues:

- **`testing-library/no-node-access`**: Don't use `.click()` directly on elements. Use `fireEvent.click()` or `userEvent.click()` instead.
- **`testing-library/no-wait-for-side-effects`**: Don't put actions inside `waitFor()`. Only assertions belong in `waitFor()`.

Example fix:

```js
// Before (violates rules):
await waitFor(() => {
  screen.getByText('Submit').click();
  expect(onSubmit).toHaveBeenCalled();
});

// After (correct):
const button = await screen.findByText('Submit');
fireEvent.click(button);
await waitFor(() => {
  expect(onSubmit).toHaveBeenCalled();
});
```

## Additional resources

- [ESLint Flat Config Documentation](https://eslint.org/docs/latest/use/configure/configuration-files)
- [Migration Guide (Official ESLint)](https://eslint.org/docs/latest/use/configure/migration-guide)
- [TypeScript ESLint v8 Release Notes](https://typescript-eslint.io/blog/announcing-typescript-eslint-v8)
