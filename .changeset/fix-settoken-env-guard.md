---
'@commercetools-frontend/mc-scripts': patch
---

Fix `setToken` silently discarding credentials when `MC_ACCESS_TOKEN` environment variable is set. Previously, running `mc-scripts login --force` with the env var set would complete successfully but not persist the token. The env var guard is now removed from `setToken`, and file creation logic is extracted so `setToken` works regardless of whether the credentials file already exists.
