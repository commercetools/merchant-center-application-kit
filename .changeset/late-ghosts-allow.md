---
'@commercetools-frontend/mc-scripts': minor
---

The CLI `mc-scripts login` command now performs the authentication via Identity. The opt-in flag `ENABLE_EXPERIMENTAL_IDENTITY_AUTH_FLOW` is not needed anymore.

Additionally, the `login` command accepts the following new CLI options to allow it to be executed from any directory.
Previously, the command required to be executed within a project workspace with a Merchant Center Customization configuration file.

- `--mc-api-url <url>`: The URL of the Merchant Center API. If not provided, the command will try to read it from the environment variable `MC_API_URL` or the Merchant Center Customization configuration file. In this case, the command needs to be executed from the folder where the Merchant Center Customization configuration file is located.
- `--project-key <key>`: The project key to issue an API access token for. If not provided, the command will try to read it from the environment variable `CTP_PROJECT_KEY` or the Merchant Center Customization configuration file. In this case, the command needs to be executed from the folder where the Merchant Center Customization configuration file is located.
- `--oauth-scope <scope...>`: The OAuth Scope to request when generating an API access token. Multiple flags are allowed. If not provided, the command will try to read it from the environment variable `CTP_OAUTH_SCOPES` (comma-separated list) or the Merchant Center Customization configuration file. In this case, the command needs to be executed from the folder where the Merchant Center Customization configuration file is located.

Example usage:

```
npx mc-scripts login
npx mc-scripts login --mc-api-url=https://mc-api.europe-west1.gcp.commercetools.com
npx mc-scripts login --mc-api-url=https://mc-api.europe-west1.gcp.commercetools.com --project-key=my-project --oauth-scope=view_products
```
