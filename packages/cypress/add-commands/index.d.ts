type CommandLoginOidcOptions = {
  entryPointUriPath: string;
};

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Log into the Custom Application using the OIDC workflow.
     * @example
     *    cy.loginByOidc({ entryPointUriPath: 'examples-starter' })
     */
    loginByOidc(options?: CommandLoginOidcOptions): Chainable<Subject>;
  }
}
