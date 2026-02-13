# @commercetools-frontend/eslint-config-mc-app

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/eslint-config-mc-app"><img src="https://badgen.net/npm/v/@commercetools-frontend/eslint-config-mc-app" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/eslint-config-mc-app"><img src="https://badgen.net/npm/v/@commercetools-frontend/eslint-config-mc-app/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/eslint-config-mc-app"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/eslint-config-mc-app" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/main/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

ESLint flat config (v9+) for Merchant Center customizations.

## Requirements

- ESLint 9.x or higher
- Node.js 18.x, 20.x, or >=22.0.0

## Install

```bash
pnpm add -D eslint @commercetools-frontend/eslint-config-mc-app
```

## Usage

Create an `eslint.config.js` file in your project root:

```js
// eslint.config.js
const mcAppConfig = require('@commercetools-frontend/eslint-config-mc-app');

module.exports = [
  ...mcAppConfig,
  // Add your custom config overrides here
];
```

> **Note**: This package uses ESLint's flat config format introduced in ESLint 9. If you're migrating from ESLint 8, you'll need to replace your `.eslintrc.js` file with `eslint.config.js`.
