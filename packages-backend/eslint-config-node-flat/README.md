# @commercetools-backend/eslint-config-node-flat

ESLint flat config (v9+) for Node.js backend projects.

## Requirements

- ESLint v9.0.0 or higher
- Node.js 18.x, 20.x, or 22.x+

## Install

```bash
npm install --save-dev @commercetools-backend/eslint-config-node-flat eslint@^9.0.0
```

## Usage

Create an `eslint.config.js` file in your project root:

```js
// eslint.config.js
const nodeConfig = require('@commercetools-backend/eslint-config-node-flat');

module.exports = [...nodeConfig];
```

### Custom Overrides

To add custom rules or overrides:

```js
// eslint.config.js
const nodeConfig = require('@commercetools-backend/eslint-config-node-flat');

module.exports = [
  ...nodeConfig,

  // Your custom config
  {
    files: ['**/*.{js,ts}'],
    rules: {
      'no-console': 'warn',
    },
  },
];
```

## Migration from Legacy Config

If you're using `@commercetools-backend/eslint-config-node`:

1. **Update ESLint**: `npm install --save-dev eslint@^9.0.0`
2. **Install new package**: `npm install --save-dev @commercetools-backend/eslint-config-node-flat`
3. **Replace `.eslintrc.js`** with `eslint.config.js`:

**Before** (`.eslintrc.js`):

```js
module.exports = {
  extends: ['@commercetools-backend/eslint-config-node'],
};
```

**After** (`eslint.config.js`):

```js
const nodeConfig = require('@commercetools-backend/eslint-config-node-flat');
module.exports = [...nodeConfig];
```

4. **Remove `.eslintignore`** and use `ignores` in config instead:

```js
module.exports = [
  {
    ignores: ['dist/', 'build/', 'node_modules/'],
  },
  ...nodeConfig,
];
```

## Features

- ✅ TypeScript support with @typescript-eslint
- ✅ Jest testing rules
- ✅ Node.js specific rules (eslint-plugin-n)
- ✅ Import ordering and resolution
- ✅ Prettier integration

## Differences from Frontend Config

This backend config:

- Uses Node.js globals only (no browser globals)
- Excludes React, JSX, and accessibility rules
- Uses eslint-plugin-n instead of Cypress
- Supports .js, .ts, .cjs, .mjs files (no .jsx, .tsx)
- Simplified test configuration (Jest only, no Testing Library)

## License

MIT
