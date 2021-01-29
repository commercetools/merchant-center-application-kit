---
"@commercetools-frontend/application-shell": patch
---

refactor(test-utils): to use flopflip test provider

When using `@commercetools-frontend/application-shell/test-utils`, we now render a `TestProviderFlopFlip` instead of the normal `ConfigureFlopFlip` with the `memory` adapter.<br/>
This change simplifies how feature flags are propagated during tests and should not affect the usage of the test-utils.

> In the very unlikely case that you have been passing the `adapter` option to the test-utils, you can remove that as it's not necessary anymore.
