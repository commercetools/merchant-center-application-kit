# Jira Tickets for ESLint Flat Config Migration

## Epic

**Title**: Migrate merchant-center-application-kit to ESLint 9 Flat Config

**Description**:
Migrate the merchant-center-application-kit repository from ESLint's legacy `.eslintrc` format to the modern flat config format (`eslint.config.js`). This migration enables ESLint 9 compatibility while maintaining backward compatibility for external consumers of the `eslint-config-mc-app` package.

**Scope**:

- Fix current CI failures
- Add dual export support to `eslint-config-mc-app` package (legacy + flat)
- Complete root config migration
- Clean up remaining `.eslintrc` files (except templates)
- Document changes and add changeset

**Success Criteria**:

- CI is green
- All linting passes (`pnpm lint:js`)
- `eslint-config-mc-app` supports both ESLint 8.x and 9.x consumers
- No breaking changes for external package consumers
- 10-20% performance improvement expected

---

## Phase 0: Fix CI Failures

### Story 1: Fix Missing GraphQL Plugin Dependency

**Title**: [ESLint Migration] Fix missing eslint-plugin-graphql dependency blocking CI

**Type**: Bug

**Priority**: Highest (Blocker)

**Description**:
The current `eslint.config.js` (commit a3c6d69f1) requires `eslint-plugin-graphql` on line 4, but this dependency is not installed. This causes all linting to fail and blocks CI.

**Acceptance Criteria**:

- [ ] Investigate whether GraphQL linting is actively used
- [ ] Choose and implement one of the following options:
  - Option A: Install `eslint-plugin-graphql` as dependency
  - Option B: Switch to `@graphql-eslint/eslint-plugin` (already installed)
  - Option C: Remove GraphQL linting temporarily
- [ ] Verify `eslint.config.js` loads without errors
- [ ] Document the decision and any trade-offs

**Technical Notes**:

- Check if any `.graphql` files exist in the repository
- Review existing usage of `@graphql-eslint/eslint-plugin`
- Option B or C recommended for faster unblocking

**Estimate**: 2 story points

---

### Story 2: Fix jest-runner-eslint Flat Config Compatibility

**Title**: [ESLint Migration] Ensure jest-runner-eslint detects and uses flat config

**Type**: Task

**Priority**: High

**Description**:
After fixing the GraphQL plugin issue, verify that `jest-runner-eslint` properly detects and uses the flat config format. The current version (2.3.0) may need configuration updates to work with `eslint.config.js`.

**Acceptance Criteria**:

- [ ] Verify jest-runner-eslint version supports flat config
- [ ] Test that `pnpm lint:js` uses `eslint.config.js`
- [ ] Add explicit config if needed:
  - Environment variable (`ESLINT_USE_FLAT_CONFIG=true`)
  - OR jest-runner-eslint.config.js update (`overrideConfigFile: 'eslint.config.js'`)
- [ ] Update package.json scripts if needed
- [ ] CI linting job passes

**Technical Notes**:

- Check jest-runner-eslint changelog for flat config support
- Test locally before pushing to CI
- Consider updating to latest version if current doesn't support flat config

**Estimate**: 3 story points

**Dependencies**: Blocked by Story 1 (GraphQL plugin fix)

---

## Phase 1: Dual Export Support

### Story 3: Add Flat Config Export to eslint-config-mc-app Package

**Title**: [ESLint Migration] Add flat config export to eslint-config-mc-app

**Type**: Feature

**Priority**: High

**Description**:
Enable the `eslint-config-mc-app` package to support both legacy (ESLint 8.x) and flat config (ESLint 9.x) consumers through dual exports. This is critical for maintaining backward compatibility while enabling internal repositories to use flat config.

**Acceptance Criteria**:

- [ ] Create `packages/eslint-config-mc-app/flat.js` with native flat config export
- [ ] Update `packages/eslint-config-mc-app/package.json`:
  - Add `exports` field for dual export pattern
  - Add `globals@^15.0.0` dependency
  - Add `@eslint/eslintrc@^3.0.0` dependency
  - Update peerDependencies to support ESLint 8 and 9
- [ ] Convert `env` to `languageOptions.globals` using `globals` package
- [ ] Reuse existing helpers (`has-jsx-runtime.js`, `rules-presets.js`, `eslint.js`)
- [ ] Do NOT use `@rushstack/eslint-patch` in flat config
- [ ] Keep `index.js` unchanged (legacy format)
- [ ] Update README.md with usage examples for both formats

**Technical Notes**:

- Export flat config array format (not object)
- Ensure proper file pattern matching for TypeScript, test files, React/JSX
- Prettier config should be last in the array
- Reference implementation in plan: Section 1.1

**Estimate**: 8 story points

**Dependencies**: None (can start after Phase 0 complete)

---

### Story 4: Add Tests for eslint-config-mc-app Dual Export

**Title**: [ESLint Migration] Add test coverage for eslint-config-mc-app dual exports

**Type**: Task

**Priority**: High

**Description**:
Create test fixtures and test suites to verify both legacy and flat config exports work correctly and produce equivalent results.

**Acceptance Criteria**:

- [ ] Create test fixtures:
  - `valid.tsx` (should pass)
  - `invalid.tsx` (should trigger `@typescript-eslint/no-explicit-any`)
  - `test.spec.tsx` (should trigger `jest/no-focused-tests`)
- [ ] Create `legacy-config.test.js` for testing with ESLint v8
- [ ] Create `flat-config.test.js` for testing with ESLint v9
- [ ] Verify both formats produce equivalent linting results
- [ ] Test TypeScript, Jest, React, and has-jsx-runtime helper
- [ ] All tests pass in CI

**Technical Notes**:

- Use both ESLint 8.x and 9.x in devDependencies for testing
- Compare rule violations between legacy and flat formats
- Document any intentional differences

**Estimate**: 5 story points

**Dependencies**: Blocked by Story 3

---

## Phase 2: Complete Root Migration

### Story 5: Optimize Root eslint.config.js to Use Flat Import

**Title**: [ESLint Migration] Optimize root config to import flat config directly

**Type**: Improvement

**Priority**: Medium

**Description**:
Update the root `eslint.config.js` to attempt importing the flat config export directly from `eslint-config-mc-app/flat` with graceful fallback to FlatCompat. This improves performance by 10-20% compared to using FlatCompat.

**Acceptance Criteria**:

- [ ] Update root `eslint.config.js` with try/catch pattern:
  - Try: Import `@commercetools-frontend/eslint-config-mc-app/flat`
  - Catch: Fallback to FlatCompat for legacy format
- [ ] Ensure FlatCompat initialization includes `baseDirectory` and `resolvePluginsRelativeTo`
- [ ] Fix any remaining GraphQL plugin references
- [ ] Verify config loads correctly
- [ ] Test linting performance (document baseline vs optimized)

**Technical Notes**:

- This is an OPTIMIZATION, not required for backward compatibility
- Expected 10-20% performance improvement with native flat config
- Reference implementation: Section 2.7 of plan

**Estimate**: 3 story points

**Dependencies**: Blocked by Story 3 (flat.js must exist)

---

### Story 6: Remove Non-Template .eslintrc Files

**Title**: [ESLint Migration] Consolidate per-package configs into root eslint.config.js

**Type**: Task

**Priority**: Medium

**Description**:
Remove remaining `.eslintrc` files from playground, visual-testing-app, website-components-playground, and cypress. Migrate any package-specific overrides to the root `eslint.config.js`. Keep template `.eslintrc` files for user compatibility.

**Acceptance Criteria**:

- [ ] Remove the following files (migrate overrides to root):
  - `cypress/.eslintrc.yaml`
  - `playground/.eslintrc.js`
  - `visual-testing-app/.eslintrc.js`
  - `website-components-playground/.eslintrc.js`
  - `packages/mc-html-template/html-scripts/.eslintrc.yaml`
- [ ] Keep template files unchanged:
  - `application-templates/starter/.eslintrc.js`
  - `application-templates/starter-typescript/.eslintrc.js`
  - `custom-views-templates/starter/.eslintrc.js`
  - `custom-views-templates/starter-typescript/.eslintrc.js`
- [ ] Add file-pattern-based overrides to root config if needed
- [ ] Add comments to template files about flat config availability
- [ ] Verify linting works for all affected directories
- [ ] No regression in linting error counts

**Technical Notes**:

- Use file patterns like `files: ['playground/**/*.js']` for overrides
- Template files kept in legacy format for broader ESLint v8 compatibility
- Test each removed config to ensure rules still apply

**Estimate**: 5 story points

**Dependencies**: Blocked by Story 5

---

## Documentation & Release

### Story 7: Add Changeset and Update Documentation

**Title**: [ESLint Migration] Add changeset and update migration documentation

**Type**: Task

**Priority**: Medium

**Description**:
Create a changeset for the migration and update relevant documentation to guide users on the new flat config support.

**Acceptance Criteria**:

- [ ] Create `.changeset/eslint-flat-config.md`:
  - Package: `@commercetools-frontend/eslint-config-mc-app`
  - Version: Minor (backward-compatible feature addition)
  - Document dual export support and migration path
- [ ] Update `packages/eslint-config-mc-app/README.md`:
  - Usage examples for both legacy and flat config
  - Migration guide from legacy to flat
  - ESLint version compatibility notes
- [ ] Update root documentation if needed
- [ ] Add comments about flat config to template README files

**Technical Notes**:

- This is a MINOR version bump, not major (no breaking changes)
- Legacy format is completely unchanged
- External consumers continue working without modifications

**Estimate**: 3 story points

**Dependencies**: Blocked by Stories 3-6

---

### Story 8: Verify CI and Publish Release

**Title**: [ESLint Migration] Final verification and publish eslint-config-mc-app

**Type**: Task

**Priority**: High

**Description**:
Final end-to-end verification that all linting passes, CI is green, and no regressions were introduced. Publish the new version of `eslint-config-mc-app` with dual export support.

**Acceptance Criteria**:

- [ ] All linting passes locally (`pnpm lint:js`)
- [ ] CI pipeline is green
- [ ] Run performance comparison (document results)
- [ ] No increase in linting errors/warnings
- [ ] Verify external package consumers won't be affected
- [ ] Publish new version to npm
- [ ] Merge PR and tag release

**Technical Notes**:

- Test with both `pnpm lint:js` and full CI run
- Compare linting time before/after optimization
- Check that template projects still work
- Announce release to team

**Estimate**: 2 story points

**Dependencies**: Blocked by Story 7

---

## Summary

**Total Stories**: 8
**Total Story Points**: 31

**Story Point Distribution**:

- Phase 0 (Fix CI): 5 points (2 stories)
- Phase 1 (Dual Export): 13 points (2 stories)
- Phase 2 (Complete Migration): 8 points (2 stories)
- Documentation & Release: 5 points (2 stories)

**Critical Path**:
Story 1 → Story 2 → Story 3 → Story 4 → Story 5 → Story 6 → Story 7 → Story 8

**Notes**:

- Stories 1-2 are BLOCKERS and must be completed first
- Story 3 is the core feature work
- Stories 4-6 can be parallelized after Story 3 if multiple developers available
- Stories 7-8 are release preparation
