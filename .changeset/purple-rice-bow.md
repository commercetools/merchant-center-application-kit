---
'@commercetools-frontend/babel-preset-mc-app': minor
'@commercetools-frontend/mc-scripts': minor
---

Add `babel-plugin-formatjs` to avoid bloating bundles with useless data from `formatjs` messages (`description`, `defaultMessage` props). Opt-in flags:

- i18nAst: pre-parse defaultMessage into AST for faster runtime perf
- i18nRemoveDefaultMessage: remove defaultMessage field in generated js after extraction
