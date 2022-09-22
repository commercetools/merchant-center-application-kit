declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Log into the Custom Application using the login form.
     * @example
     *    cy.loginByForm({  entryPointUriPath: 'template-starter' })
     */
    loginByForm(
      // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html#import-types
      options?: import('./dist/commercetools-frontend-cypress-add-commands.cjs').CommandLoginByFormOptions
    ): Chainable<Subject>;
    /**
     * Log into the Custom Application using the OIDC workflow.
     * @example
     *    cy.loginByOidc({ entryPointUriPath: 'template-starter' })
     */
    loginByOidc(
      // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html#import-types
      options?: import('./dist/commercetools-frontend-cypress-add-commands.cjs').CommandLoginByOidcOptions
    ): Chainable<Subject>;
  }
}
