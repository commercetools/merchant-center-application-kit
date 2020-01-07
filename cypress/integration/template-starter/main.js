import { URL_EXAMPLES_STARTER } from '../../support/urls';

describe('Main view', () => {
  it('should render page', () => {
    cy.login();
    cy.get('[data-test=top-navigation').should('exist');
    cy.visit(`${Cypress.config('baseUrl')}${URL_EXAMPLES_STARTER}`);
    cy.url().should('include', URL_EXAMPLES_STARTER);
    cy.findByText('Hello, world').should('exist');
    cy.percySnapshot();
  });
});
