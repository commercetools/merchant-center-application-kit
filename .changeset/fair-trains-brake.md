---
'@commercetools-frontend/application-shell': patch
---

We've fixed a bug with the login flow when working on a Custom Application locally when a user updated the [initialProjectKey](https://docs.commercetools.com/custom-applications/api-reference/application-config#envdevelopmentinitialprojectkey) configuration value but the application was still using the old.
