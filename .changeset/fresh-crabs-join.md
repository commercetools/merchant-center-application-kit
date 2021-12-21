---
'merchant-center-application-template-starter': major
'@commercetools-frontend/application-config': major
'@commercetools-frontend/application-shell': major
'playground': major
'@commercetools-local/visual-testing-app': major
---

Following breaking changes were introduced:

- New required fields in the Custom Application config.
- Menu links structure in Custom Application config changed a bit.
- The `ENABLE_OIDC_FOR_DEVELOPMENT` is now the default behavior.
- The deprecated `menu.json` file and the `DEV_ONLY_` props have been removed.

Note that if you were testing your Custom Application with Cypress, you need to use the `@commercetools-frontend/cypress` package to be able to use the `cy.loginByOidc` command.

For more information see [Release notes v21](https://docs.commercetools.com/custom-applications/releases/2022-01-25-custom-applications-v21).
