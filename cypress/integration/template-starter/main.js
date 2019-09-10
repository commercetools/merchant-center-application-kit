import { URL_EXAMPLES_STARTER } from '../../support/urls';

describe('Main view', () => {
  it('should render page', () => {
    cy.login({ redirectToUri: URL_EXAMPLES_STARTER });
    cy.findByText('Hello, world').should('exist');
    cy.percySnapshot();
  });
});
