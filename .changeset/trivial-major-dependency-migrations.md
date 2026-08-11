---
'@commercetools-frontend/mc-scripts': patch
'@commercetools-frontend/codemod': patch
'@commercetools-frontend/application-shell': patch
'@commercetools-frontend/sdk': patch
'@commercetools-frontend/browser-history': patch
'@commercetools-frontend/react-notifications': patch
'@commercetools-frontend/jest-preset-mc-app': patch
'@commercetools-frontend/cypress': patch
---

Trivial ecosystem-churn dependency migrations pass: bumped several major-version dependencies whose API surface is either unchanged for our usage or only needed a mechanical import fix, verified via the full test/typecheck/build suite (see PR description for the per-dependency breakdown and the ones that were dropped after turning out not to be mechanical).

- `glob` 10.x → 13.x (`mc-scripts`, `codemod`)
- `dotenv` 16.x → 17.x (`mc-scripts`)
- `fs-extra` 10.x → 11.x (`mc-scripts`)
- `jwt-decode` 3.x → 4.x (`mc-scripts`, `application-shell`) — named export migration
- `open` 10.x → 11.x (`mc-scripts`)
- `webpackbar` 5.x → 7.x (`mc-scripts`)
- `thread-loader` 3.x → 4.x (`mc-scripts`)
- `svg-url-loader` 7.x → 8.x (`mc-scripts`)
- `jscodeshift` 0.16.x → 17.x (`codemod`) — versioning-scheme renumbering, not a real breaking jump
- `downshift` 6.x → 9.x (`application-shell`)
- `fuse.js` 6.x → 7.x (`application-shell`)
- `memoize-one` 5.x → 6.x (`application-shell`)
- `qss` 2.x → 3.x (`application-shell`, `sdk`, `browser-history`)
- `unfetch` 4.x → 5.x (`application-shell`, `sdk`, `jest-preset-mc-app`)
- `reselect` 4.x → 5.x (`react-notifications`)
- `@manypkg/get-packages` 1.x → 3.x (`cypress`)
