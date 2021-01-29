---
"@commercetools-frontend/application-shell": patch
---

refactor(test-utils): to use flopflip test provider

In this release we use the `TestProviderFlopFlip` when using our `test-utils` or the `SetupFlipFlip` component. 
This change just not affect consumers of those packages. You can remove any `adapter` you may have passed to any `react-testing-library` renderer. These are not needed anymore.
