# ESLint Flat Config Migration Plan - Complete Strategy

## Executive Summary

This plan outlines the migration of three interconnected repositories from ESLint's legacy `.eslintrc` format to the modern flat config format (`eslint.config.js`). The migration must maintain backwards compatibility for external consumers while enabling internal repositories to adopt ESLint 9's required flat config format.

### Current State: merchant-center-application-kit

This repository has a **partially completed** migration (commit a3c6d69f1):

- ✅ Root converted to `eslint.config.js`
- ❌ **CI FAILING**: `eslint.config.js` line 4 requires `eslint-plugin-graphql` but it's not installed
- ❌ `eslint-config-mc-app` package: Still in legacy format, no flat config support
- ⚠️ Multiple `.eslintrc.js` files remain in playground/visual-testing-app/website-components-playground
- ✅ Template `.eslintrc.js` files preserved (intentional for user compatibility)

### Critical Issues to Resolve (merchant-center-application-kit)

1. **BLOCKER**: Fix missing `eslint-plugin-graphql` dependency in `eslint.config.js` line 4 (breaks all linting)
2. **CORE WORK**: Add dual export support to `eslint-config-mc-app` package
3. **CLEANUP**: Migrate remaining non-template `.eslintrc.js` files
4. **DOCUMENTATION**: Add changeset and update docs

### Critical Success Factors

1. **Phase 0 FIRST**: Fix CI failures before proceeding (GraphQL plugin + jest-runner-eslint compatibility)
2. **Backward compatibility**: eslint-config-mc-app package must support dual exports (legacy + flat)
3. **Root config**: Already in flat config format, optimization (not requirement) to import flat directly
4. **Minor version bump**: This is a backward-compatible feature addition, not a breaking change
5. **Performance gain**: Expected 10-20% improvement with native flat config vs FlatCompat

### Key Clarifications

- **@rushstack/eslint-patch**: NOT needed in flat config (only for legacy format)
- **globals package**: REQUIRED dependency (^15.0.0) for converting env to languageOptions.globals
- **jest-runner-eslint**: May need updates or configuration to detect flat config
- **Template files**: Keep in legacy format for broader compatibility

## Repositories Involved

**Note**: This plan covers THREE repositories. When working on merchant-center-application-kit only, focus on Phases 0-2. Phases 3a and 3b apply to other repositories.

1. **merchant-center-application-kit** (Phases 0-2)

   - Contains `eslint-config-mc-app` package (shared config)
   - Root migration partially complete (commit a3c6d69f1), CI failing
   - ~4 files changed (+157 -144 lines)

2. **ui-kit** (Phase 3a - separate repository)

   - Simple root config, no per-package configs
   - ESLint 9.17.0 already installed
   - ~42 packages in monorepo

3. **merchant-center-frontend** (Phase 3b - separate repository)
   - Complex hierarchical config (14 .eslintrc.cjs files)
   - Custom ESLint plugin with 4 architectural rules
   - ~44 packages across 4 package groups
   - GraphQL validation for 5 schema types

## Critical Dependency Chain

```
eslint-config-mc-app (dual export support)
         ↓
merchant-center-application-kit (complete PR #3213)
         ↓
    ┌────┴────┐
ui-kit    merchant-center-frontend
```

**Key constraint**: eslint-config-mc-app must support BOTH legacy and flat config formats simultaneously since external consumers cannot be controlled.

## CRITICAL: Backward Compatibility Clarification

**Where backward compatibility is required:**

1. **eslint-config-mc-app package** (Phase 1) - **CRITICAL**

   - Must support dual export: legacy format (index.js) + flat config (flat.js)
   - External consumers depend on this and cannot be controlled
   - This is the KEY requirement for the entire migration

2. **Root eslint.config.js** (Phase 2) - **Already compatible**
   - Already in flat config format and works correctly
   - Currently uses FlatCompat to load legacy package
   - Optimization (not requirement): Import flat config directly when available
   - No breaking changes needed here

## Phase 0: Fix CI Failures (HIGHEST PRIORITY)

**MUST BE COMPLETED FIRST** before proceeding to Phase 1.

### Current Issue

The root eslint.config.js exists (commit a3c6d69f1) but CI is failing. There are two critical issues:

1. **IMMEDIATE BLOCKER**: `eslint.config.js` line 4 requires `eslint-plugin-graphql` but it's not installed
2. **jest-runner-eslint compatibility**: May need configuration updates to detect flat config

### 0.0 Fix GraphQL Plugin Dependency (IMMEDIATE)

**Problem**: `eslint.config.js` line 4 requires `eslint-plugin-graphql` but it's not installed
**Impact**: All linting is broken, CI fails immediately

**Options**:

- **Option A**: Install `eslint-plugin-graphql` as dependency
- **Option B**: Switch to `@graphql-eslint/eslint-plugin` (already installed)
- **Option C**: Remove GraphQL linting temporarily to unblock migration

**Recommended approach**: Check if GraphQL linting is actively used, then choose Option B or C to move forward quickly.

### 0.1 Investigate jest-runner-eslint Compatibility

**Specific issues to check:**

1. **Version compatibility**:

   ```bash
   # Check current version
   cat package.json | grep jest-runner-eslint
   # Current: 2.3.0 - verify if it supports flat config
   ```

2. **Automatic detection**:

   - jest-runner-eslint may not automatically detect eslint.config.js
   - May still be looking for .eslintrc.js

3. **Environment variable**:

   - May need `ESLINT_USE_FLAT_CONFIG=true`
   - Check if this needs to be set in CI or package.json scripts

4. **Configuration updates**:
   - jest-runner-eslint.config.js may need explicit config pointing to eslint.config.js
   - May need `overrideConfigFile: 'eslint.config.js'` option

### 0.2 Fix CI Configuration

**Option A: Update jest-runner-eslint**

```bash
# Check for newer version with better flat config support
pnpm update jest-runner-eslint@latest
```

**Option B: Add environment variable**

```json
// package.json
{
  "scripts": {
    "lint:js": "ESLINT_USE_FLAT_CONFIG=true jest --projects jest.eslint.config.js"
  }
}
```

**Option C: Temporarily keep both configs**

```bash
# Keep .eslintrc.js alongside eslint.config.js during transition
# Remove .eslintrc.js only after confirming jest-runner-eslint works with flat config
```

**Option D: Explicit configuration**

```javascript
// jest-runner-eslint.config.js
module.exports = {
  cliOptions: {
    overrideConfigFile: 'eslint.config.js',
    format: 'stylish',
  },
};
```

### 0.3 Verify CI Passes

```bash
# Test locally first
pnpm lint:js

# Check CI logs
# Ensure no linting errors
# Confirm jest-runner-eslint is using eslint.config.js

# Only proceed to Phase 1 after CI is green
```

## Phase 1: eslint-config-mc-app Dual Export Strategy

### Location

`merchant-center-application-kit/packages/eslint-config-mc-app/`

### Objective

Enable dual exports so internal repos can use flat config while external consumers continue using legacy format.

**CRITICAL**: This is where backward compatibility is essential. External consumers cannot be controlled.

### Implementation

#### 1.1 Create Flat Config Export

**New file**: `flat.js`

**Important notes:**

- Convert legacy config to native flat config (not using FlatCompat)
- Reuse existing helpers: `has-jsx-runtime.js`, `rules-presets.js`, `eslint.js`
- **@rushstack/eslint-patch is NOT needed** in flat config (only required for legacy format in index.js)
- Must use `globals` package to convert `env` to `languageOptions.globals`

Export flat config array format:

```javascript
// flat.js
const babelParser = require('@babel/eslint-parser');
const typescriptParser = require('@typescript-eslint/parser');
const globals = require('globals'); // REQUIRED for env conversion
// ... import all plugins

// Reuse existing helpers
const { statusCode, allSupportedExtensions } = require('./helpers/eslint');
const hasJsxRuntime = require('./helpers/has-jsx-runtime');
const { craRules } = require('./helpers/rules-presets');

module.exports = [
  // Base config for all files
  {
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        sourceType: 'module',
        requireConfigFile: false,
        babelOptions: {
          presets: [
            require.resolve(
              '@commercetools-frontend/babel-preset-mc-app/production'
            ),
          ],
        },
      },
      ecmaVersion: 2020,
      // Convert env to globals (REQUIRED)
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es2015,
        ...globals.node,
      },
    },
    plugins: {
      /* import, prettier, jsx-a11y, etc. */
    },
    rules: {
      /* base rules from craRules.base */
    },
  },

  // Test files
  {
    files: ['**/*.spec.*', '**/*.test.*'],
    plugins: { jest, 'jest-dom': jestDom, 'testing-library': testingLibrary },
    languageOptions: {
      globals: {
        ...globals.jest, // Use globals package
      },
    },
    rules: {
      /* test-specific rules from craRules.jest */
    },
  },

  // TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    plugins: { '@typescript-eslint': typescriptPlugin },
    rules: {
      /* TS rules from craRules.typescript */
    },
  },

  // React/JSX files
  {
    files: ['**/*.js', '**/*.jsx', '**/*.tsx'],
    plugins: { react, 'react-hooks': reactHooks },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      /* React rules */
      // Use hasJsxRuntime() helper for conditional rules
      ...(hasJsxRuntime() && {
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
      }),
    },
  },

  // TSX specific
  {
    files: ['**/*.tsx'],
    rules: {
      /* TSX overrides */
    },
  },

  // Prettier last
  prettierConfig,
];
```

#### 1.2 Update package.json

```json
{
  "name": "@commercetools-frontend/eslint-config-mc-app",
  "version": "25.1.0",
  "main": "index.js",
  "exports": {
    ".": "./index.js",
    "./flat": "./flat.js"
  },
  "dependencies": {
    // NEW: Required for flat config
    "@eslint/eslintrc": "^3.0.0",
    "globals": "^15.0.0", // REQUIRED for converting env to languageOptions.globals

    // Existing dependencies (unchanged)
    "@babel/core": "^7.22.17",
    "@babel/eslint-parser": "^7.22.15",
    "@typescript-eslint/eslint-plugin": "^5.62.0",
    "@typescript-eslint/parser": "^5.62.0"
    // ... other plugins
  },
  "peerDependencies": {
    "eslint": ">=8.57.0 <10.0.0" // Support both v8 and v9
  },
  "devDependencies": {
    "eslint": "^9.0.0" // Test with ESLint v9
    // ... other dev deps
  },
  "scripts": {
    "test": "jest"
  }
}
```

**Key changes:**

- Add `globals@^15.0.0` as dependency (REQUIRED for flat config)
- Add `@eslint/eslintrc@^3.0.0` (for FlatCompat utilities if needed)
- Update peerDependencies to support both ESLint 8 and 9
- Update devDependencies to test with ESLint 9

#### 1.3 Keep index.js Unchanged

Legacy format remains completely unchanged for backwards compatibility:

```javascript
// index.js - NO CHANGES except JSDoc
/**
 * @type {import("eslint").Linter.Config}
 * @deprecated Use flat config by importing from '@commercetools-frontend/eslint-config-mc-app/flat'
 */
module.exports = {
  extends: [
    /* ... */
  ],
  // ... existing config unchanged
};
```

#### 1.4 Testing Strategy

**Create test fixtures:**

Files to create:

```
packages/eslint-config-mc-app/
├── __tests__/
│   ├── fixtures/
│   │   ├── valid.tsx           # Valid TypeScript React component
│   │   ├── invalid.tsx         # Should trigger @typescript-eslint/no-explicit-any
│   │   └── test.spec.tsx       # Should trigger jest/no-focused-tests
│   ├── legacy-config.test.js   # Test legacy format with ESLint v8
│   └── flat-config.test.js     # Test flat format with ESLint v9
```

**Test coverage:**

- [ ] Legacy format (index.js) works with ESLint v8
- [ ] Flat format (flat.js) works with ESLint v9
- [ ] Both formats produce equivalent linting results on same files
- [ ] TypeScript rules apply correctly in both formats
- [ ] Jest rules apply to test files in both formats
- [ ] React rules apply correctly in both formats
- [ ] has-jsx-runtime() helper works in flat config
- [ ] All helpers (eslint.js, rules-presets.js) work in both formats

#### 1.5 Documentation

**README.md update**:

````markdown
## Usage

### Flat Config (ESLint 9.x, recommended)

```javascript
// eslint.config.js
const mcAppConfig = require('@commercetools-frontend/eslint-config-mc-app/flat');

module.exports = [
  ...mcAppConfig,
  // Your overrides
];
```
````

### Legacy Config (ESLint 8.x)

```javascript
// .eslintrc.js
module.exports = {
  extends: ['@commercetools-frontend/eslint-config-mc-app'],
};
```

````

**Critical Files**:
- `packages/eslint-config-mc-app/flat.js` (create)
- `packages/eslint-config-mc-app/package.json` (update exports)
- `packages/eslint-config-mc-app/README.md` (update usage)
- `packages/eslint-config-mc-app/index.js` (reference only)

## Phase 2: Complete merchant-center-application-kit PR #3213

### Current State
- Draft PR with root config partially migrated
- CI failing with linting errors at https://github.com/commercetools/merchant-center-application-kit/actions/runs/21256973262/job/61174152080?pr=3213
- GraphQL plugin reference error (critical blocker)
- Missing changeset

### Implementation

#### 2.1 Diagnose Current CI Errors

**Step 1**: Access the CI logs to identify specific errors:
```bash
# Option A: View in GitHub Actions UI
# Navigate to: https://github.com/commercetools/merchant-center-application-kit/actions/runs/21256973262/job/61174152080?pr=3213
# Look for the "Running linters" step output

# Option B: Clone and run locally
cd /path/to/merchant-center-application-kit
git fetch origin pull/3213/head:pr-3213
git checkout pr-3213
pnpm install
pnpm lint:js 2>&1 | tee lint-errors.txt
````

**Step 2**: Categorize errors into:

- **Config loading errors**: eslint.config.js fails to load or parse
- **Plugin errors**: Missing or incompatible plugins
- **Rule errors**: Rules applied incorrectly or to wrong file types
- **File matching errors**: Files not being linted or wrong configs applied

**Common flat config migration errors to look for**:

1. **Module resolution errors**:

   ```
   Error: Cannot find module 'eslint-plugin-graphql'
   Error: Failed to load plugin 'X' declared in eslint.config.js
   ```

2. **Invalid config structure**:

   ```
   Error: Invalid config object
   Error: Config must export an array
   ```

3. **Parser errors**:

   ```
   Error: Failed to load parser '@typescript-eslint/parser'
   Error: Parsing error: Unexpected token
   ```

4. **Rule configuration errors**:
   ```
   Error: Rule 'X' was not found
   Error: Rule 'X' requires parserOptions
   ```

#### 2.2 Fix Critical GraphQL Plugin Error

**File**: `eslint.config.js` (root)

**Problem**: Line 4 likely imports `eslint-plugin-graphql` but project uses `@graphql-eslint/eslint-plugin`

**Diagnosis**:

```bash
# Check what GraphQL plugin is installed
cat package.json | grep graphql
# Look for: "@graphql-eslint/eslint-plugin" or "eslint-plugin-graphql"

# Check what's imported in config
head -20 eslint.config.js | grep -i graphql
```

**Solution A - Remove GraphQL linting** (Recommended for initial migration):

```javascript
// eslint.config.js
// Remove or comment out:
// const graphqlPlugin = require('eslint-plugin-graphql');

// Remove any config blocks that use graphqlPlugin
// This allows the migration to proceed while GraphQL linting is reconsidered
```

**Solution B - Fix @graphql-eslint usage** (If keeping GraphQL linting):

```javascript
// eslint.config.js
const graphqlPlugin = require('@graphql-eslint/eslint-plugin');

// Use the processor-based approach for .graphql files
export default [
  {
    files: ['**/*.graphql'],
    plugins: {
      '@graphql-eslint': graphqlPlugin,
    },
    processor: '@graphql-eslint/graphql',
    rules: {
      '@graphql-eslint/known-type-names': 'error',
      // ... other GraphQL rules
    },
  },
  // For GraphQL in template literals (if needed)
  {
    files: ['**/*.{js,ts,tsx}'],
    plugins: {
      '@graphql-eslint': graphqlPlugin,
    },
    rules: {
      '@graphql-eslint/naming-convention': 'error',
    },
  },
];
```

**Recommendation**: Use Solution A initially to unblock the migration, then add Solution B in a follow-up PR if needed.

#### 2.3 Fix FlatCompat Initialization Errors

**Problem**: FlatCompat may not be properly initialized, causing plugin resolution failures.

**Check for errors like**:

```
Error: Failed to load config "@commercetools-frontend/eslint-config-mc-app"
Error: Cannot resolve plugin "react" relative to ...
```

**Solution**:

```javascript
// eslint.config.js
const { FlatCompat } = require('@eslint/eslintrc');
const path = require('path');

// CRITICAL: Must provide baseDirectory
const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

// Use it to load legacy configs
module.exports = [
  ...compat.extends('@commercetools-frontend/eslint-config-mc-app'),
  // ... other configs
];
```

#### 2.4 Fix File Pattern Matching Errors

**Problem**: Files might not be matched correctly by the new config, causing either too many or too few files to be linted.

**Check for**:

- Files that should be linted but aren't
- Files that shouldn't be linted but are
- Wrong rules applied to certain file types

**Diagnosis**:

```bash
# Test which files match a pattern
npx eslint --print-config packages/some-file.js

# List all files that will be linted
npx eslint --debug packages/ 2>&1 | grep "Linting"

# Check if ignores are working
npx eslint dist/some-file.js  # Should be ignored
```

**Common fixes**:

1. **Ignores not working**:

```javascript
// Must be first config object, with ONLY ignores property
module.exports = [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      // Use ** prefix for recursive matching
    ],
  },
  // ... other configs
];
```

2. **File patterns too narrow**:

```javascript
// BAD - misses .cjs and .mjs files
{
  files: ['**/*.js', '**/*.ts'];
}

// GOOD - includes all JS/TS extensions
{
  files: ['**/*.{js,jsx,ts,tsx,cjs,mjs}'];
}
```

3. **Override order issues**:

```javascript
// Later configs override earlier ones
// WRONG - TS rules never apply
module.exports = [
  {
    files: ['**/*.ts'],
    rules: { '@typescript-eslint/no-explicit-any': 'error' },
  },
  { files: ['**/*'], rules: { '@typescript-eslint/no-explicit-any': 'off' } }, // Overrides TS config!
];

// CORRECT - specific configs after general ones
module.exports = [
  { files: ['**/*'], rules: { '@typescript-eslint/no-explicit-any': 'off' } },
  {
    files: ['**/*.ts'],
    rules: { '@typescript-eslint/no-explicit-any': 'error' },
  }, // Properly overrides
];
```

#### 2.5 Fix Specific Linting Errors

Once the config loads correctly, address any new linting errors that appear:

**Step 1**: Run linter and collect errors:

```bash
pnpm lint:js --format json > lint-errors.json
# Review the JSON output to categorize errors
```

**Step 2**: Common error categories:

**A. Rules not found**:

```
Error: Definition for rule 'some-plugin/some-rule' was not found
```

- Solution: Ensure plugin is loaded in the config block where rule is used

```javascript
{
  files: ['**/*.test.js'],
  plugins: {
    jest: require('eslint-plugin-jest'),  // Must be here if using jest/* rules
  },
  rules: {
    'jest/expect-expect': 'off',
  },
}
```

**B. Parser not set for TypeScript**:

```
Parsing error: Unexpected token (in .ts files)
```

- Solution: Ensure TypeScript parser is set for .ts/.tsx files

```javascript
{
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: require('@typescript-eslint/parser'),
  },
  plugins: {
    '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
  },
}
```

**C. Globals not defined**:

```
'describe' is not defined
'it' is not defined
```

- Solution: Add globals to test file config

```javascript
{
  files: ['**/*.{spec,test}.{js,ts}'],
  languageOptions: {
    globals: {
      ...require('globals').node,
      ...require('globals').jest,
    },
  },
}
```

**D. Import resolution errors**:

```
Unable to resolve path to module 'some-package'
```

- Solution: Configure import resolver in settings

```javascript
{
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
}
```

#### 2.6 Iterative Error Resolution Process

**Workflow**:

```bash
# 1. Run linter
pnpm lint:js 2>&1 | head -50  # Review first 50 errors

# 2. Identify most common error
# 3. Fix in eslint.config.js
# 4. Re-run linter
pnpm lint:js 2>&1 | head -50

# 5. Repeat until all errors resolved
```

**Priority order**:

1. Config loading/parsing errors (blocks everything)
2. Plugin loading errors (affects multiple files)
3. Parser errors for file types (affects all files of that type)
4. Rule configuration errors (affects specific rules)
5. Individual linting violations (can be fixed or suppressed)

**Document changes**:
Keep a log of what was fixed:

```markdown
## PR #3213 Error Resolution Log

1. Fixed GraphQL plugin import (removed temporarily)
2. Added baseDirectory to FlatCompat
3. Fixed TypeScript parser for .ts files
4. Added jest globals to test files
5. Updated ignore patterns to use \*\* prefix
6. Reordered configs for proper precedence
```

#### 2.7 Optimize Root Config (Optional Performance Improvement)

**Note**: This is an OPTIMIZATION, not required for backward compatibility. The root file already works correctly with FlatCompat.

**File**: `eslint.config.js`

**Current state**: Uses FlatCompat to load legacy eslint-config-mc-app
**Optimized approach**: Try flat config import first, fallback to FlatCompat

```javascript
// eslint.config.js
const { FlatCompat } = require('@eslint/eslintrc');

let mcAppConfig;
try {
  // Try importing flat config directly (better performance)
  mcAppConfig = require('@commercetools-frontend/eslint-config-mc-app/flat');
} catch (e) {
  // Fallback to FlatCompat for legacy format (backward compatibility)
  const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname,
  });
  mcAppConfig = compat.extends('@commercetools-frontend/eslint-config-mc-app');
}

module.exports = [
  // ... ignores
  ...mcAppConfig,
  // ... other configs
];
```

**Benefits**:

- Better performance when flat export is available (10-20% faster)
- Maintains backward compatibility with legacy export
- Graceful fallback if flat export not available

#### 2.8 Complete Root Migration

Current `eslint.config.js` needs:

- Fix GraphQL plugin reference (Section 2.2)
- Proper FlatCompat initialization with baseDirectory (Section 2.3)
- Ensure all file patterns are correct (Section 2.4)
- Verify ignore patterns cover all directories (Section 2.4)
- Optionally optimize to use flat import (Section 2.7)

#### 2.9 Migrate Per-Package Configs

**Files to remove** (migrate overrides to root):

- ❌ `cypress/.eslintrc.yaml` → Add to root as Cypress config block
- ❌ `playground/.eslintrc.js` → Remove (add overrides to root if needed)
- ❌ `visual-testing-app/.eslintrc.js` → Remove (add overrides to root if needed)
- ❌ `website-components-playground/.eslintrc.js` → Remove (add overrides to root if needed)
- ❌ `packages/mc-html-template/html-scripts/.eslintrc.yaml` → Remove (add overrides to root if needed)

**Template files to keep** (legacy format for user compatibility):

- ✅ `application-templates/starter/.eslintrc.js` - Keep, add comment about future migration
- ✅ `application-templates/starter-typescript/.eslintrc.js` - Keep, add comment
- ✅ `custom-views-templates/starter/.eslintrc.js` - Keep, add comment
- ✅ `custom-views-templates/starter-typescript/.eslintrc.js` - Keep, add comment

**Rationale for keeping template files in legacy format**:

- Templates are used as starting points for new projects
- External users may still be on ESLint v8
- Broader compatibility during transition period
- Can be migrated in future once flat config is widely adopted
- Add comments documenting that flat config is available for ESLint v9+ users

#### 2.10 Add Changeset

Create `.changeset/eslint-flat-config.md`:

```markdown
---
'@commercetools-frontend/eslint-config-mc-app': minor
---

Add ESLint flat config format support with dual exports

**New feature**: ESLint 9.x flat config support via new `/flat` export
**Backward compatible**: Legacy format (default export) remains unchanged
**No breaking changes**: Existing consumers continue working without changes

New exports:

- `@commercetools-frontend/eslint-config-mc-app` - Legacy format (unchanged)
- `@commercetools-frontend/eslint-config-mc-app/flat` - New flat config format

Migration path:

- ESLint v8 users: No changes required
- ESLint v9 users: Can optionally import from `/flat` export for better performance
```

**Important**: This is a **minor** version bump, not major, because:

- Legacy format is completely unchanged
- No breaking changes for existing consumers
- Adds new functionality (flat config support) without removing anything
- Backward compatible with ESLint v8

#### 2.5 Update CI/Workflows

Verify GitHub Actions workflows reference correct files and commands.

**Critical Files**:

- `eslint.config.js` (fix GraphQL error)
- `packages/eslint-config-mc-app/flat.js` (create dual export)
- `.changeset/eslint-flat-config.md` (create)
- `cypress/.eslintrc.yaml` (migrate to root)

## Phase 3: ui-kit Migration

### Current State

- Root `.eslintrc.js` extends eslint-config-mc-app@24.8.0
- ESLint 9.17.0 already installed
- jest-runner-eslint 2.3.0 (flat config compatible)
- Simple structure: 1 config file, no per-package configs

### Blocker

Cannot migrate until eslint-config-mc-app releases flat config support (Phase 1 complete).

### Implementation

#### 3.1 Update Dependency

```bash
cd /Users/valorie/Documents/ui-kit
yarn upgrade @commercetools-frontend/eslint-config-mc-app@^25.1.0
```

#### 3.2 Install Flat Config Dependencies

```bash
yarn add -D @eslint/eslintrc @eslint/js globals
```

#### 3.3 Create eslint.config.js

**Approach**: Use FlatCompat to load eslint-config-mc-app flat export until native support available.

```javascript
// eslint.config.js
process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

const mcAppConfig = require('@commercetools-frontend/eslint-config-mc-app/flat');

module.exports = [
  // Global ignores (from .eslintignore)
  {
    ignores: [
      '**/dist/',
      '**/node_modules/',
      '**/vendors/',
      '**/raw-components/',
      'generators/**',
      'proxy_exports/**/*.js',
    ],
  },

  // Base config from mc-app
  ...mcAppConfig,

  // Override testing-library rules
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    rules: {
      'testing-library/no-node-access': 'off',
      'testing-library/no-container': 'off',
    },
  },

  // Visual routes and docs
  {
    files: ['**/*.visualroute.js', '**/docs/**/*.js'],
    rules: {
      'react/display-name': 'off',
    },
  },

  // Visual spec files
  {
    files: ['**/*.visualspec.js'],
    languageOptions: {
      globals: {
        page: 'readonly',
        HOST: 'readonly',
        globalThis: 'readonly',
      },
    },
  },

  // Version files
  {
    files: ['**/version.js', '**/version.ts'],
    rules: {
      'import/no-anonymous-default-export': 'off',
    },
  },
];
```

#### 3.4 Update jest-runner-eslint.config.js

Move inline rules to main eslint.config.js:

```javascript
// jest-runner-eslint.config.js
module.exports = {
  cliOptions: {
    format: 'stylish',
    // Rules moved to eslint.config.js
  },
};
```

Add to eslint.config.js:

```javascript
{
  files: ['**/*.js', '**/*.ts', '**/*.tsx'],
  rules: {
    'import/no-unresolved': 'error',
    'prettier/prettier': [
      'error',
      { trailingComma: 'es5', singleQuote: true },
    ],
  },
}
```

#### 3.5 Remove Legacy Files

```bash
rm .eslintrc.js .eslintignore
```

#### 3.6 Testing

```bash
# Test config loads
npx eslint --print-config eslint.config.js

# Test specific file types
npx eslint packages/components/avatar/src/avatar.visualspec.js
npx eslint packages/components/fields/creatable-select-field/version.js

# Full lint run
yarn lint:js

# CI simulation
yarn run jest --projects jest.{eslint,test,ts-test,bundle}.config.js
```

#### 3.7 Update Documentation

Update `CONTRIBUTING.md` with flat config information and usage examples.

**Critical Files**:

- `eslint.config.js` (create)
- `.eslintrc.js` (remove)
- `.eslintignore` (remove)
- `jest-runner-eslint.config.js` (update)
- `CONTRIBUTING.md` (update)

## Phase 4: merchant-center-frontend Migration

### Current State

- Complex: 14 .eslintrc.cjs files in hierarchy
- Custom ESLint plugin: @commercetools-local/eslint-plugin-custom-rules
- GraphQL validation for 5 schema types
- Architectural enforcement (cross-application imports)
- ESLint 8.48.0

### Blocker

Cannot migrate until eslint-config-mc-app releases flat config support (Phase 1 complete).

### Strategy

**Full Consolidation**: Single root eslint.config.js with file pattern targeting.

### Implementation

#### 4.1 Update Dependencies

```bash
cd /Users/valorie/Documents/merchant-center-frontend
pnpm update eslint@^9.0.0
pnpm add -D @eslint/eslintrc @eslint/js globals
pnpm update @commercetools-frontend/eslint-config-mc-app@^25.1.0
```

#### 4.2 Verify Custom Plugin Compatibility

**File**: `packages-shared/eslint-custom-rules/src/index.js`

Current structure is already compatible (exports rules object). No changes needed.

#### 4.3 Create Root eslint.config.js

**Structure**:

```javascript
import js from '@eslint/js';
import customRulesPlugin from './packages-shared/eslint-custom-rules/src/index.js';
import { readFileSync } from 'fs';
// ... import all plugins

// Load GraphQL schemas
const mcSchema = JSON.parse(readFileSync('./schemas/mc.json', 'utf-8'));
const ctpSchema = JSON.parse(readFileSync('./schemas/ctp.json', 'utf-8'));
// ... other schemas

export default [
  // Global ignores
  { ignores: ['**/dist/**', '**/build/**', '**/node_modules/**'] },

  // Base config (inline or import from mc-app/flat)
  {
    /* base rules for all files */
  },

  // TypeScript files
  { files: ['**/*.{ts,tsx}'] /* TS config */ },

  // React/JSX files
  { files: ['**/*.{jsx,tsx}'] /* React config */ },

  // Test files
  { files: ['**/*.{spec,test}.{js,jsx,ts,tsx}'] /* test rules */ },

  // Cypress files
  { files: ['cypress/**/*.{spec,js,ts}'] /* Cypress rules */ },

  // GraphQL schemas (5 blocks for each schema)
  { files: ['**/*.mc.graphql'] /* MC schema validation */ },
  { files: ['**/*.ctp.graphql'] /* CTP schema validation */ },
  { files: ['**/*.settings.graphql'] /* Settings schema */ },
  { files: ['**/*.dashboard.graphql'] /* Dashboard schema */ },
  { files: ['**/*.pim-indexer.graphql'] /* PIM schema */ },

  // packages-application rules (import ordering)
  {
    files: ['packages-application/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'import/order': [
        /* custom order with pathGroups */
      ],
    },
  },

  // Application src directories (architectural rules)
  {
    files: ['packages-application/application-*/src/**/*.{js,jsx,ts,tsx}'],
    plugins: { '@commercetools-local/custom-rules': customRulesPlugin },
    rules: {
      '@commercetools-local/custom-rules/prefer-react-router-children': 'error',
      '@commercetools-local/custom-rules/prefer-message-definition-file':
        'error',
      '@commercetools-local/custom-rules/no-mocks-export': 'error',
      '@commercetools-local/custom-rules/no-lazy-without-async': 'error',
      'no-restricted-imports': [
        /* cross-app import prevention */
      ],
    },
  },

  // packages-shared rules
  {
    files: ['packages-shared/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'import/order': [
        /* custom order */
      ],
      '@commercetools-local/custom-rules/prefer-message-definition-file':
        'error',
      '@commercetools-local/custom-rules/no-mocks-export': 'warn',
      'no-dupe-keys': 'error',
    },
  },

  // cookie-consent package (stricter rules)
  {
    files: ['packages-shared/cookie-consent/**/*.{js,jsx,ts,tsx}'],
    rules: {
      '@commercetools-local/custom-rules/prefer-message-definition-file':
        'error',
      '@commercetools-local/custom-rules/no-mocks-export': 'error',
      'react/jsx-sort-props': [
        'warn',
        { ignoreCase: true, reservedFirst: true },
      ],
      'no-unused-vars': 'error',
    },
  },

  // Prettier last
  prettierConfig,
];
```

#### 4.4 Remove All .eslintrc.cjs Files

```bash
find . -name ".eslintrc.cjs" -not -path "*/node_modules/*" -delete
```

Total: 14 files to remove from:

- Root
- packages-application/
- packages-shared/
- 11 application-\*/src/ directories
- cookie-consent/

#### 4.5 Update jest.eslint.config.js

Ensure it uses eslint.config.js:

```javascript
module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'eslint',
  // ... existing config
  eslintConfig: {
    overrideConfigFile: 'eslint.config.js',
  },
};
```

#### 4.6 Testing Strategy

**Critical tests**:

1. GraphQL validation for all 5 schemas
2. Custom rules enforcement (4 rules)
3. Architectural rules (cross-app imports blocked)
4. Import ordering across packages
5. Test-specific rules apply
6. Cypress overrides work

Create validation script at `scripts/validate-eslint-migration.mjs`.

#### 4.7 Update Documentation

Create `docs/ESLINT_CONFIG.md` with:

- Overview of flat config structure
- How to add package-specific rules
- Custom rules documentation
- GraphQL validation explanation
- Architectural rules rationale
- Troubleshooting guide

**Critical Files**:

- `eslint.config.js` (create ~500-800 lines)
- All 14 `.eslintrc.cjs` files (remove)
- `jest.eslint.config.js` (update)
- `docs/ESLINT_CONFIG.md` (create)

## Outstanding Questions

### 1. Should we migrate eslint-config-node (backend package)?

**Context**: The repository contains `packages/eslint-config-node` for backend linting.

**Options**:

- **Option A**: Migrate both packages together for consistency
  - Pros: Complete migration, consistent approach
  - Cons: More scope, longer timeline, additional testing
- **Option B**: Focus on eslint-config-mc-app only, migrate backend separately
  - Pros: Focused scope, faster delivery, can learn from frontend migration
  - Cons: Inconsistency during transition

**Recommendation**: **Option B** - Focus on frontend package (eslint-config-mc-app) first. The backend package can be migrated separately after the frontend migration is stable and lessons learned are documented.

### 2. Should internal templates/apps be migrated to flat config?

**Context**: Template packages (starter, starter-typescript) are used as starting points for new projects.

**Recommendation**: Keep templates on legacy format initially for broader compatibility. Migrate later if desired, or provide both legacy and flat config examples.

## Future Work / Out of Scope

The following items are deferred for future work:

1. **eslint-config-node migration** - Can be done separately after frontend migration is stable
2. **Template migration to flat config** - Can be done after core migration is stable, or provide both examples
3. **Comprehensive test coverage** - Basic tests for now, expand later based on needs
4. **ESLint 10 preparation** - Will require removing legacy format support entirely (breaking change)
5. **Performance optimization** - Flat config should be faster by default, but could profile and optimize further if needed
6. **Additional shareable configs** - Consider publishing additional flat config presets for different use cases

## Migration Order & Dependencies

```
Phase 0: Fix CI failures (MUST BE FIRST)
   ↓ (CI green)
Phase 1: eslint-config-mc-app dual export
   ↓ (complete & publish)
Phase 2: merchant-center-application-kit PR #3213 (complete migration)
   ↓ (complete, merge, publish)
Phase 3a: ui-kit migration          Phase 3b: merchant-center-frontend migration
   (can proceed independently once Phase 2 complete)
```

**Estimated Timeline**:

- Phase 0: 0.5-1 day (fix CI, verify jest-runner-eslint compatibility)
- Phase 1: 2-3 days (design, implement, test dual export)
- Phase 2: 1-2 days (optimize root config, migrate per-package configs, add changeset)
- Phase 3a (ui-kit): 2-3 days (simple migration, testing)
- Phase 3b (merchant-center-frontend): 5-7 days (complex consolidation, testing)

**Total**: 11-16 days (~1.5-2 weeks for Phases 0-2, then 1-1.5 weeks for each of Phase 3a/3b)

## Testing & Verification Strategy

### Per-Repository Testing

#### eslint-config-mc-app

- [ ] Legacy import works (test fixture with .eslintrc.js)
- [ ] Flat config import works (test fixture with eslint.config.js)
- [ ] Both produce equivalent linting results
- [ ] Works with ESLint 8.x and 9.x
- [ ] All plugins load correctly
- [ ] TypeScript rules apply
- [ ] Test file rules apply
- [ ] React/JSX rules apply

#### merchant-center-application-kit

- [ ] Root eslint.config.js loads without errors
- [ ] CI linting job passes
- [ ] Template projects still work
- [ ] Cypress linting works
- [ ] No regression in error counts

#### ui-kit

- [ ] Config loads without errors
- [ ] Visual spec files get globals
- [ ] Version files allow anonymous exports
- [ ] Docs files allow missing display names
- [ ] jest-runner-eslint works
- [ ] CI pipeline passes
- [ ] No regression in error counts

#### merchant-center-frontend

- [ ] Config loads without errors
- [ ] All 5 GraphQL schemas validate
- [ ] 4 custom rules enforce correctly
- [ ] Cross-application imports blocked
- [ ] Import ordering works per package
- [ ] Test rules apply to test files
- [ ] Cypress rules apply to Cypress files
- [ ] CI pipeline passes
- [ ] No regression in error counts

### Performance Comparison

**Test performance improvements from flat config:**

```bash
# Before: Using FlatCompat with legacy config
cd merchant-center-application-kit
time pnpm lint:js  # Record baseline time

# After: Using native flat config import
# Update root eslint.config.js to use flat import
time pnpm lint:js  # Compare with baseline

# Expected improvement: 10-20% faster with native flat config
```

**Metrics to track:**

- Total linting time
- Config loading time (visible with `--debug` flag)
- Memory usage
- Number of files linted (should be same)

**Document results:**

```markdown
## Performance Results

### Before (FlatCompat)

- Time: X.XXs
- Files: NNN
- Memory: XXX MB

### After (Native Flat Config)

- Time: X.XXs (XX% improvement)
- Files: NNN (same)
- Memory: XXX MB (XX% reduction)
```

### Integration Testing

After all migrations:

- [ ] ui-kit can upgrade eslint-config-mc-app without issues
- [ ] merchant-center-frontend can upgrade eslint-config-mc-app without issues
- [ ] External consumers (if any) continue working with legacy format
- [ ] Documentation accurate across all repos
- [ ] Performance is equal or better than FlatCompat approach (10-20% improvement expected)

## Documentation Requirements

### Per-Repository Documentation

#### eslint-config-mc-app

- **README.md**: Usage examples for both formats
- **MIGRATION.md**: Step-by-step migration guide from legacy to flat
- **CHANGELOG.md**: Version 25.x.x with breaking changes noted

#### merchant-center-application-kit

- **Root README**: Note about flat config migration
- **Template README**: Clarify ESLint version compatibility
- **PR description**: Complete migration details

#### ui-kit

- **CONTRIBUTING.md**: Update with flat config usage
- **README.md**: Update if ESLint setup mentioned
- **PR description**: Migration details and testing results

#### merchant-center-frontend

- **docs/ESLINT_CONFIG.md**: Comprehensive flat config guide
- **README.md**: Update linting section
- **CONTRIBUTING.md**: Update with new config location
- **PR description**: Migration strategy and consolidation rationale

## Rollback Plans

### eslint-config-mc-app

```bash
git revert <migration-commit>
npm publish --tag previous
```

External consumers unaffected (legacy format unchanged).

### merchant-center-application-kit

```bash
git revert <pr-merge-commit>
# Restore .eslintrc.js files
git checkout HEAD~1 -- .eslintrc.js cypress/.eslintrc.yaml
```

### ui-kit

```bash
rm eslint.config.js
git checkout HEAD~1 -- .eslintrc.js .eslintignore
yarn install  # restore old deps
yarn jest --clearCache
```

### merchant-center-frontend

```bash
rm eslint.config.js
git checkout HEAD~1 -- .eslintrc.cjs packages-*/.eslintrc.cjs
pnpm install
pnpm jest --clearCache
```

## Success Criteria

### merchant-center-application-kit Specific Criteria

- [ ] All linting passes (`pnpm lint:js` succeeds)
- [ ] CI is green
- [ ] `eslint-config-mc-app` supports dual export (legacy + flat)
- [ ] Root config optimized to use flat import
- [ ] Remaining non-template `.eslintrc` files removed
- [ ] Template `.eslintrc` files preserved
- [ ] Changeset added (minor version bump)
- [ ] No breaking changes for external consumers

### Global Success Criteria

- [ ] All 3 repositories using flat config format
- [ ] External eslint-config-mc-app consumers unaffected
- [ ] CI/CD pipelines green across all repos
- [ ] No regression in linting error/warning counts
- [ ] Documentation complete and accurate
- [ ] Teams trained on flat config format

### eslint-config-mc-app Criteria

- [ ] Dual export working (legacy + flat)
- [ ] Tests pass for both formats
- [ ] Published to npm
- [ ] Documentation updated

### merchant-center-application-kit Criteria (detailed)

- [ ] PR #3213 merged
- [ ] CI passing
- [ ] Changeset added
- [ ] Version published

### ui-kit Criteria

- [ ] Single eslint.config.js at root
- [ ] jest-runner-eslint working
- [ ] CI passing
- [ ] No .eslintrc.js or .eslintignore files

### merchant-center-frontend Criteria

- [ ] Single eslint.config.js (14 configs consolidated)
- [ ] All custom rules working
- [ ] GraphQL validation working (5 schemas)
- [ ] Architectural rules enforced
- [ ] CI passing

## Risk Mitigation

### High Risks

**Risk**: CI failures block development

- **Mitigation**: Complete migrations in feature branches, test thoroughly before merge
- **Rollback**: Revert commits, restore legacy configs

**Risk**: External consumers break (eslint-config-mc-app)

- **Mitigation**: Keep legacy export completely unchanged, test dual export
- **Rollback**: Publish previous version with npm tag

**Risk**: Custom rules don't work in flat config (merchant-center-frontend)

- **Mitigation**: Test rules with flat config before migration, update if needed
- **Rollback**: Keep .eslintrc.cjs files in git history

### Medium Risks

**Risk**: jest-runner-eslint incompatible with ESLint 9 or flat config

- **Mitigation**: Verify compatibility early, check for updates
- **Alternative**: Use ESLint CLI directly instead of Jest runner

**Risk**: GraphQL schema validation breaks

- **Mitigation**: Test all 5 schemas thoroughly, use readFileSync instead of require
- **Rollback**: Revert to legacy config with working GraphQL validation

**Risk**: Import ordering rules behave differently

- **Mitigation**: Run with --fix flag after migration, compare before/after
- **Solution**: Adjust pathGroups configuration if needed

## Post-Migration Maintenance

### Immediate (0-2 weeks)

- Monitor CI for failures
- Watch for developer feedback and confusion
- Fix any edge cases discovered
- Update documentation based on feedback

### Short-term (1-3 months)

- Consider ESLint 9 adoption timeline
- Update to latest compatible plugin versions
- Optimize performance (use --timing to identify slow rules)
- Create runbooks for common scenarios

### Long-term (3-6 months)

- Evaluate removing FlatCompat when all plugins have native support
- Consider publishing flat config preset for other commercetools repos
- Set up Renovate/Dependabot for ESLint ecosystem updates
- Share learnings with wider organization

## Key Insights & Recommendations

1. **Dual export is essential**: External consumers of eslint-config-mc-app cannot be controlled, requiring backwards compatibility
2. **Consolidation over distribution**: For merchant-center-frontend, single root config is simpler than distributed configs
3. **Test custom rules early**: Verify @commercetools-local/eslint-plugin-custom-rules works with flat config before migration
4. **GraphQL validation needs adjustment**: Change from require() to readFileSync() + JSON.parse() for schema loading
5. **Order matters**: In flat config arrays, later configs override earlier ones; prettier should be last
6. **No automatic cascading**: Unlike eslintrc, flat configs don't cascade from parent directories
7. **Use file patterns for targeting**: Glob patterns in files arrays replace directory-based override blocks

## Critical Files Summary

### Phase 1: eslint-config-mc-app

- `packages/eslint-config-mc-app/flat.js` (CREATE)
- `packages/eslint-config-mc-app/package.json` (UPDATE)
- `packages/eslint-config-mc-app/README.md` (UPDATE)

### Phase 2: merchant-center-application-kit

- `eslint.config.js` (FIX)
- `packages/eslint-config-mc-app/flat.js` (CREATE)
- `.changeset/eslint-flat-config.md` (CREATE)

### Phase 3a: ui-kit

- `eslint.config.js` (CREATE)
- `.eslintrc.js` (DELETE)
- `.eslintignore` (DELETE)
- `CONTRIBUTING.md` (UPDATE)

### Phase 3b: merchant-center-frontend

- `eslint.config.js` (CREATE)
- All 14 `.eslintrc.cjs` files (DELETE)
- `docs/ESLINT_CONFIG.md` (CREATE)

---

**References**:

- [ESLint Configuration Migration Guide](https://eslint.org/docs/latest/use/configure/migration-guide)
- [ESLint Plugin Migration to Flat Config](https://eslint.org/docs/latest/extend/plugin-migration-flat-config)
- [ESLint Flat Config Introduction](https://eslint.org/blog/2022/08/new-config-system-part-2/)
- [ESLint Configuration Migrator Tool](https://eslint.org/blog/2024/05/eslint-configuration-migrator/)
