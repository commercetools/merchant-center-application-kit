---
'@commercetools-frontend/mc-scripts': patch
'@commercetools-frontend/application-shell': patch
---

Fix Custom Application builds failing with
`Module not found: Can't resolve '@commercetools/nimbus'` when
`@commercetools/nimbus` is not installed (e.g. a fresh
`create-mc-app --template=starter-typescript` project).

`@commercetools/nimbus` is an optional dependency of the application shell.
Previously the build only stayed unaffected when the app already had Nimbus
installed, because the stubbing plugin was loaded from Nimbus itself and could
not run when Nimbus was absent. `mc-scripts` now ships its own build-time
fallback that stubs Nimbus imports when the package is not installed, and the
shell splitter degrades to a passthrough at runtime when Nimbus is absent — so
Nimbus stays genuinely optional for both webpack and Vite builds.
