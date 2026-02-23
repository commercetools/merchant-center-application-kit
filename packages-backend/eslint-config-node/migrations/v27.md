# Migrating to ESLint 9 Flat Config

This guide covers migrating from ESLint 8 (legacy `.eslintrc` format) to ESLint 9 (flat config) for projects using `@commercetools-backend/eslint-config-node`.

> **AI agents**: This document is structured as step-by-step instructions that can be followed automatically. Read the existing config files before generating new ones.

## Step 1: Discover existing config

Find and read all ESLint-related files in the project:

- `.eslintrc.js`, `.eslintrc.json`, `.eslintrc.yaml`, `.eslintrc.yml`, or `.eslintrc`
- `.eslintignore`
- `package.json` (for dependencies and lint scripts)

## Step 2: Analyze the legacy config

Extract the following from the existing `.eslintrc.*`:

1. **`extends`** — which configs are extended
2. **`plugins`** — registered as strings
3. **`rules`** — top-level rule overrides
4. **`overrides`** — with their `files`, `parser`, `parserOptions`, `plugins`, and `rules`
5. **`env`** — environment globals (e.g., `node: true`, `jest: true`)
6. **`settings`** — ESLint settings

Also collect all patterns from `.eslintignore` if it exists.

## Step 3: Create `eslint.config.js`

### Base structure

```js
// The commercetools config exports a flat config array
const nodeConfig = require('@commercetools-backend/eslint-config-node');

module.exports = [
  // Ignores replace .eslintignore
  { ignores: ['dist/', 'build/'] },

  // Spread the base config
  ...nodeConfig,

  // Project-specific overrides follow...
];
```

### Converting `extends`

Remove the commercetools config from `extends` — it's now spread as `...nodeConfig`. If other shared configs were extended, import and spread them too (check that they support flat config).

### Converting `plugins`

Plugins registered as strings become imported objects (if you have custom plugins beyond what's in the base config):

```js
// Before (legacy):
//   plugins: ['some-plugin']

// After (flat config):
const somePlugin = require('eslint-plugin-some-plugin');
// Use in config as:
//   plugins: { 'some-plugin': somePlugin }
```

### Converting `overrides`

Each `overrides` entry becomes a separate object in the config array:

```js
// Before (legacy):
overrides: [
  {
    files: ['*.ts'],
    parserOptions: {
      project: './tsconfig.json',
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
]

// After (flat config):
{
  files: ['*.ts'],
  languageOptions: {
    parserOptions: {
      project: './tsconfig.json',
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
  },
}
```

Key property mappings:

| Legacy (`.eslintrc`)               | Flat config (`eslint.config.js`)                          |
| ---------------------------------- | --------------------------------------------------------- |
| `parser` (string)                  | `languageOptions.parser` (imported module)                |
| `parserOptions`                    | `languageOptions.parserOptions`                           |
| `env: { node: true }`              | `languageOptions.globals` (use the `globals` npm package) |
| `plugins: ['name']` (string array) | `plugins: { name: importedPlugin }` (object)              |
| `files`                            | `files` (unchanged)                                       |
| `rules`                            | `rules` (unchanged)                                       |

### Converting top-level rules

Top-level rule overrides become a config object after the spread:

```js
module.exports = [
  ...nodeConfig,
  {
    files: ['**/*.{js,ts}'],
    rules: {
      // your rule overrides here
      'no-console': 'warn',
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

- "@commercetools-backend/eslint-config-node": "^25.0.0",
+ "@commercetools-backend/eslint-config-node": "^26.0.0",
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

Address any new violations or add rule overrides if needed.

## Complete examples

### Example 1: Simplest case (no custom overrides)

**Before** (`.eslintrc.js`):

```js
module.exports = {
  extends: ['@commercetools-backend/eslint-config-node'],
};
```

**After** (`eslint.config.js`):

```js
module.exports = require('@commercetools-backend/eslint-config-node');
```

### Example 2: With custom rules

**Before** (`.eslintrc.js`):

```js
module.exports = {
  extends: ['@commercetools-backend/eslint-config-node'],
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
```

**After** (`eslint.config.js`):

```js
const nodeConfig = require('@commercetools-backend/eslint-config-node');

module.exports = [
  ...nodeConfig,
  {
    files: ['**/*.{js,ts}'],
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
```

### Example 3: With custom rules and ignores

**Before** (`.eslintrc.js`):

```js
module.exports = {
  extends: ['@commercetools-backend/eslint-config-node'],
  rules: {
    'n/no-missing-import': 'off',
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
const nodeConfig = require('@commercetools-backend/eslint-config-node');

module.exports = [
  { ignores: ['dist/', 'build/', 'coverage/'] },
  ...nodeConfig,
  {
    files: ['**/*.{js,ts}'],
    rules: {
      'n/no-missing-import': 'off',
    },
  },
];
```

### Example 4: With TypeScript-specific overrides

**Before** (`.eslintrc.js`):

```js
module.exports = {
  extends: ['@commercetools-backend/eslint-config-node'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        '@typescript-eslint/strict-boolean-expressions': 'error',
      },
    },
  ],
};
```

**After** (`eslint.config.js`):

```js
const nodeConfig = require('@commercetools-backend/eslint-config-node');

module.exports = [
  ...nodeConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/strict-boolean-expressions': 'error',
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

### TypeScript errors with `@typescript-eslint` v8

TypeScript ESLint v8 is stricter than v5. Common issues:

- **`@typescript-eslint/no-explicit-any`**: Consider adding proper types instead of `any`
- **`@typescript-eslint/no-unused-vars`**: Remove unused variables or prefix with `_` if intentionally unused

If you need to relax rules temporarily, add overrides:

```js
{
  files: ['**/*.ts'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn', // downgrade from error
  },
}
```

## Additional resources

- [ESLint Flat Config Documentation](https://eslint.org/docs/latest/use/configure/configuration-files)
- [Migration Guide (Official ESLint)](https://eslint.org/docs/latest/use/configure/migration-guide)
- [TypeScript ESLint v8 Release Notes](https://typescript-eslint.io/blog/announcing-typescript-eslint-v8)
