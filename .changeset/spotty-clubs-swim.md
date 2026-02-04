---
'@commercetools-backend/eslint-config-node-flat': major
'@commercetools-backend/eslint-config-node': major
'@commercetools-frontend/eslint-config-mc-app-flat': major
'@commercetools-frontend/eslint-config-mc-app': major
'@commercetools-frontend/application-shell': major
'@commercetools-backend/express': major
'@commercetools-frontend/permissions': major
---

Migrate to ESLint 9 with new flat config packages

## Overview

This release introduces new ESLint 9 flat config packages while maintaining full backwards compatibility with ESLint 8. **For the time being, existing projects using the legacy packages will continue to work without any changes.** Migration to ESLint 9 is recommended when you're ready, but not required immediately.

## New Packages

- **`@commercetools-frontend/eslint-config-mc-app-flat`** - ESLint 9 flat config for Merchant Center applications
- **`@commercetools-backend/eslint-config-node-flat`** - ESLint 9 flat config for Node.js backend services

## Deprecated Packages

The following packages are now **deprecated** and support ESLint 8.x only:

- `@commercetools-frontend/eslint-config-mc-app`
- `@commercetools-backend/eslint-config-node`

These packages will receive security fixes only. Please migrate to the new `-flat` packages for ESLint 9 support.

## Breaking Changes

### ESLint 9 Required

- Minimum ESLint version: **`^9.0.0`**
- Flat config format only (`.eslintrc.js` no longer supported)
- `.eslintignore` replaced with `ignores` array in config

### Updated Dependencies

- `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser`: **v8.x** (previously v5.62.0)
- `eslint-plugin-jest`: **v28.x** (previously v27.2.3)
- `eslint-plugin-react-hooks`: **v5.x** (previously v4.6.0)
- `eslint-plugin-testing-library`: **v6.x** (previously v5.11.1)
- `globals`: **v15.15.0** (new dependency for explicit global definitions)

### Configuration Changes

- Must use `eslint.config.js` instead of `.eslintrc.js`
- Plugin registration syntax changed (objects instead of strings)
- File targeting uses `files` property instead of `overrides`
- GraphQL linting now uses helper function for schema type mapping

## Migration Guide

### Frontend Applications

1. **Update dependencies:**

```bash
pnpm add -D eslint@^9.0.0 @commercetools-frontend/eslint-config-mc-app-flat
pnpm remove @commercetools-frontend/eslint-config-mc-app
```

2. **Replace `.eslintrc.js` with `eslint.config.js`:**

```javascript
process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

module.exports = require('@commercetools-frontend/eslint-config-mc-app-flat');
```

3. **Remove `.eslintignore`** and add ignores to config if needed
4. **Update package.json scripts** if they reference `.eslintrc.js`

### Backend Services

1. **Update dependencies:**

```bash
pnpm add -D eslint@^9.0.0 @commercetools-backend/eslint-config-node-flat
pnpm remove @commercetools-backend/eslint-config-node
```

2. **Replace `.eslintrc.js` with `eslint.config.js`:**

```javascript
module.exports = require('@commercetools-backend/eslint-config-node-flat');
```

3. **Remove `.eslintignore`** and add ignores to config if needed

For detailed migration instructions and examples, see the README files in the new packages.
