---
'@commercetools-frontend/application-shell': patch
---

Fix Merchant Center applications sometimes crashing to a blank page when the navigation menu shows a group marked as "New", most often right after switching from another application. Unexpected errors in the application shell now show the unexpected error page and are reported to Sentry, instead of leaving a blank page with only a misleading `[React Intl] Could not find required intl object` error in the console.
