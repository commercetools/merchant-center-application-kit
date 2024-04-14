---
"@commercetools-frontend/application-components": patch
"@commercetools-frontend/application-shell": patch
"@commercetools-local/playground": patch
"@commercetools-local/visual-testing-app": patch
---

Update all flopflip packages to v14 (major)

In addition the the update to v14 the `merchant-center-application-kit` now uses a localStorage cache and an so called lazy `cacheMode`. This implies that `floplfip` will cause less flickering as a result of remote flags being resolved late and then applied after the application initially rendered. Instead cached flags are used and silently (lazily) updated in the background and their possibly changed value takes effect upon the next mounting of `flipflip` or upon reconfiguration.
