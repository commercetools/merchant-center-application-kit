import { URL_EXAMPLES_STARTER } from '../../support/urls';

describe('Main view', () => {
  it('should render page', () => {
    cy.login({ redirectToUri: URL_EXAMPLES_STARTER });
    cy.getByText('Hello, world').should('exist');
  });
});
