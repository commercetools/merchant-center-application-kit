---
'@commercetools-frontend/actions-global': patch
'@commercetools-frontend/application-components': patch
'@commercetools-frontend/application-config': patch
'@commercetools-frontend/application-shell': patch
'@commercetools-frontend/application-shell-connectors': patch
'@commercetools-frontend/browser-history': patch
'@commercetools-frontend/constants': patch
'@commercetools-frontend/i18n': patch
'@commercetools-frontend/l10n': patch
'@commercetools-frontend/mc-html-template': patch
'@commercetools-frontend/mc-scripts': patch
'@commercetools-frontend/notifications': patch
'@commercetools-frontend/permissions': patch
'@commercetools-frontend/react-notifications': patch
'@commercetools-frontend/sdk': patch
'@commercetools-frontend/sentry': patch
'@commercetools-frontend/url-utils': patch
---

Scope the `rollup` pnpm override to `rollup@^4` so it only affects Rollup 4.x consumers.

The unscoped `"rollup": "^4.59.0"` override introduced in 27.5.3 forced `@preconstruct/cli`'s `rollup@^2` dependency to resolve to Rollup 4.x. Rollup 4 no longer emits `Object.defineProperty(exports, '__esModule', { value: true })` in CJS output by default, which broke `jest.spyOn` on namespace imports (`import * as X from 'module'`) in downstream consumers.
