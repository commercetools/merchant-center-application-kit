---
'@commercetools-frontend/cypress': minor
---

Add new command `cy.loginByForm`.

This command uses the [Cypress functionality to test across origins](https://cypress.io/blog/2022/04/25/cypress-9-6-0-easily-test-multi-domain-workflows-with-cy-origin/), available from Cypress `v9.6.0`.

For Custom Applications it allows to authenticate the user via the login form (instead of authenticating the user in the background using the API), by following the redirect to the login page (different origin), filling out the form and redirecting back to `localhost`.

In addition to that, both commands `cy.loginByForm` and `cy.loginByOidc` implement [`cy.session`](https://www.cypress.io/blog/2021/08/04/authenticate-faster-in-tests-cy-session-command/), which caches and restores the user session between test runs.
This ultimately results in subsequent tests to run much faster as the test starts as if the user is already authenticated.

Make sure to have the option `experimentalSessionAndOrigin` turned on to benefit from using `cy.session` and `cy.origin`.
If the option is turned off:

- The `cy.loginByOidc` command will log a warning and fall back to not using `cy.session`.
- The `cy.loginByForm` command will fail to run.
