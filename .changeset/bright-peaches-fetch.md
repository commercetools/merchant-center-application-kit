---
'@commercetools-frontend/cypress': minor
---

Implement [`cy.session`](https://www.cypress.io/blog/2021/08/04/authenticate-faster-in-tests-cy-session-command/) in the login commands, which caches and restores the user session between test runs.
This ultimately results in subsequent tests to run much faster (by restoring the previous session) and makes the test behave as if the user is already authenticated.

Make sure to have the option `experimentalSessionAndOrigin` turned on (in your Cypress config) to enable that.

Additionally, there is a new command `cy.loginToMerchantCenter` as a replacement of `cy.loginByOidc` (marked as _deprecated_).

The `cy.loginToMerchantCenter` command detects whether the application is running on localhost or on production and chooses the appropriate login mechanism.

- When the application runs locally, the same mechanism used in the `cy.loginByOidc` is used.
- When the application runs on production, a normal login flow is used where the user credentials are typed into the login form.
