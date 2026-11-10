---
'@commercetools-frontend/create-mc-app': patch
---

Fix `create-mc-app` crashing with `Invalid version` when run with npm 12, whose `npm view --json` always returns an array. The latest-version lookup now only drives the "new version available" hint and never stops the CLI. Dependencies declared as `workspace:` in the template are now pinned to the cloned template's own version, so `--template-version` also gets matching App Kit packages.
