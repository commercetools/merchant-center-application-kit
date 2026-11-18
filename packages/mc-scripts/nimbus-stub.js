// Empty stub that the mc-scripts Nimbus fallback redirects `@commercetools/nimbus`
// imports to when the package is NOT installed, so production/dev builds resolve.
//
// Empty CJS is load-bearing: named imports interop to `undefined` instead of
// failing the build with a missing-export error. Consuming code must guard
// against `undefined` before using anything from Nimbus — see the application-shell
// splitter's `hasNimbus` flag, which renders a passthrough when Nimbus is absent.
//
// The exports must not be an object literal (`module.exports = {}`): since webpack
// 5.110.0, CommonJS object literal exports are analyzed statically, so named imports
// fail with "export 'X' was not found" under `strictExportPresence`.
// `Object.create(null)` keeps the exports dynamic.
//
// This mirrors `@commercetools/nimbus/plugins/stub`, but ships from mc-scripts so
// it is resolvable even when `@commercetools/nimbus` (which owns that stub and the
// bundler plugin that would redirect to it) is not installed at all.
module.exports = Object.create(null);
