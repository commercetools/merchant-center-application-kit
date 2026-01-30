# @commercetools-frontend/eslint-config-mc-app-flat

ESLint flat config (v9+) for Merchant Center customizations.

## Requirements

- ESLint v9.0.0 or higher
- Node.js 18.x, 20.x, or 22.x+

## Install

```bash
npm install --save-dev @commercetools-frontend/eslint-config-mc-app-flat eslint@^9.0.0
```

## Usage

Create an `eslint.config.js` file in your project root:

```js
// eslint.config.js
process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

const mcAppConfig = require('@commercetools-frontend/eslint-config-mc-app-flat');

module.exports = [
  ...mcAppConfig,

  // Add your custom rules here
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Your overrides
    },
  },
];
```

## Migration from Legacy Config

If you're using `@commercetools-frontend/eslint-config-mc-app`:

1. **Update ESLint**: `npm install --save-dev eslint@^9.0.0`
2. **Install new package**: `npm install --save-dev @commercetools-frontend/eslint-config-mc-app-flat`
3. **Replace `.eslintrc.js`** with `eslint.config.js`:

**Before** (`.eslintrc.js`):

```js
module.exports = {
  extends: ['@commercetools-frontend/eslint-config-mc-app'],
};
```

**After** (`eslint.config.js`):

```js
process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';
const mcAppConfig = require('@commercetools-frontend/eslint-config-mc-app-flat');
module.exports = [...mcAppConfig];
```

4. **Remove `.eslintignore`** and use `ignores` in config instead:

```js
module.exports = [
  {
    ignores: ['dist/', 'build/', 'node_modules/'],
  },
  ...mcAppConfig,
];
```

## Features

- ✅ TypeScript support with @typescript-eslint
- ✅ React and JSX rules with hooks support
- ✅ Jest and Testing Library rules
- ✅ Cypress support
- ✅ Import ordering and resolution
- ✅ Prettier integration
- ✅ Accessibility rules (jsx-a11y)

## License

MIT
