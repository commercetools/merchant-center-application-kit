# mc-html-template

## Purpose

Generates and compiles the `index.html` for Merchant Center Custom Applications, handling CDN URL placeholder replacement, CSP headers, and runtime configuration injection.

## Key Context

- Two preconstruct entrypoints: `index.ts` (exports `compileHtml`, `generateTemplate`, `processHeaders`, `replaceHtmlPlaceholders`) and `webpack-html-template.ts` (Webpack `html-webpack-plugin` template function).
- The `compileHtml` function reads application config via `@commercetools-frontend/application-config`, computes security headers, and produces the final HTML — this is the runtime path used by `mc-scripts compile-html` and `mc-scripts serve`.
- Several `.js`/`.d.ts` loader files (`load-html-docs.js`, `load-html-scripts.js`, `load-html-styles.js`) exist alongside the TypeScript source and are consumed directly.

## How To Work Here

Root commands apply. The test file is `process-headers.spec.ts`.

## Gotchas

- HTML placeholders like `__CDN_URL__` are replaced at compile time — adding or renaming placeholders requires coordinated changes in `replace-html-placeholders.ts` and downstream `mc-scripts` commands.
