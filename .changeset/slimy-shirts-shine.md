---
'@commercetools-frontend/babel-preset-mc-app': major
---

fix(security): move `babel-plugin-istanbul` to optional peer dependency to resolve SNYK-JS-INFLIGHT-6095116

The `babel-plugin-istanbul` package transitively depends on the deprecated and vulnerable `inflight@1.0.6` via `test-exclude → glob@7 → inflight`. By moving it from a direct dependency to an optional peer dependency, consumers of `@commercetools-frontend/babel-preset-mc-app` will no longer inherit this vulnerability in their dependency tree.

**Breaking change:** Projects that use `ENABLE_BABEL_PLUGIN_ISTANBUL=true` for code coverage instrumentation must now explicitly install `babel-plugin-istanbul` as a dev dependency:

```sh
pnpm add -D babel-plugin-istanbul
```

A runtime check has been added that provides a clear error message if coverage is enabled but the plugin is not installed. Projects that do not use Istanbul coverage instrumentation are not affected.
