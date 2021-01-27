import type { CommandLoginByOidcOptions } from './dist/commercetools-frontend-cypress-add-commands.cjs';

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Log into the Custom Application using the OIDC workflow.
     * @example
     *    cy.loginByOidc({ entryPointUriPath: 'examples-starter' })
     */
    loginByOidc(options?: CommandLoginByOidcOptions): Chainable<Subject>;
  }
}
