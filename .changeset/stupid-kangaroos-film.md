---
'@commercetools-frontend/mc-scripts': minor
---

Add a new CLI command `mc-scripts login`.

This command enables users to log in to their Merchant Center account through the CLI. An interactive prompt will be displayed asking the user to enter the login credentials.

Upon login, an API token is stored in the user's home directory `$HOME/.commercetools/mc-credentials.json`. The API token will be used by other CLI commands that require a valid API token.
