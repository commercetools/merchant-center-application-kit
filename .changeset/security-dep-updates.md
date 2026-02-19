---
'@commercetools-frontend/application-config': patch
'@commercetools-frontend/application-shell': patch
'@commercetools-frontend/application-components': patch
---

fix(security): update `ajv` to 8.18.0 (ReDoS fix) and `@flopflip/*` to 15.1.7 (resolves transitive `lodash` prototype pollution via 4.17.23).

The remaining reported vulnerabilities (`minimatch` via `serve-handler` and `inflight` via `react-dev-utils`) have no upstream fix available. Both are transitive dependencies of `mc-scripts` dev-only build tooling and pose negligible security risk as they are not included in production bundles.
