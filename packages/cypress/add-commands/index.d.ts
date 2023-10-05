declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Log into the Custom Application.
     * The command detects whether the application is running on localhost or on production
     * and chooses the appropriate login mechanism.
     *
     * @example
     *    cy.loginToMerchantCenter({ entryPointUriPath: 'template-starter' })
     */
    loginToMerchantCenter(
      // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html#import-types
      options?: import('./dist/commercetools-frontend-cypress-add-commands.cjs').CommandLoginOptions
    ): Chainable<Subject>;
    /**
     * Log into the Custom Application using the OIDC workflow.
     * The command only works for testing an application running on localhost.
     *
     * @example
     *    cy.loginByOidc({ entryPointUriPath: 'template-starter' })
     *
     * @deprecated Use the more generic {@link cy.loginToMerchantCenter} command as it automatically detects which login mechanism to use.
     */
    loginByOidc(
      // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html#import-types
      options?: import('./dist/commercetools-frontend-cypress-add-commands.cjs').CommandLoginOptions
    ): Chainable<Subject>;

    /**
     * Triggers a `hover` (real) event on the subject.
     *
     * @example
     *    cy.findByText('text_matcher').hover()
     */
    hover(): Chainable<Subject>;

    /**
     * Triggers a `hover` (real) event on the navigation menu item found using the given text matcher.
     * It will make the submenu links panel to appear.
     *
     * @example
     *    cy.navigationMenuHover('navigation_item_menu_text_matcher')
     */
    navigationMenuHover(
      // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html#import-types
      options?: import('./dist/commercetools-frontend-cypress-add-commands.cjs').Matcher
    ): Chainable<Subject>;
  }
}
