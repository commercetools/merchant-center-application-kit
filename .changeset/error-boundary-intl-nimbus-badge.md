---
'@commercetools-frontend/application-shell': patch
---

Fix apps crashing to a blank page when the navbar shows a menu group with a "New" badge. The badge now renders within its own `NimbusProvider`, since the navbar can render before the shell's Nimbus provider has loaded, and it is skipped when Nimbus is not installed. `ErrorApologizer` now also renders without an `IntlProvider` in the tree (falling back to the default English messages), so errors caught by the top-level error boundary show the apologizer page and are reported to Sentry instead of being masked by a `[React Intl] Could not find required intl object` error.
