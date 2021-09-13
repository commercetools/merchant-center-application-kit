import { URL_EXAMPLES_STARTER } from '../../support/urls';

describe('Welcome', () => {
  it('should render page', () => {
    cy.setDesktopViewport();
    cy.login({ redirectToUri: URL_EXAMPLES_STARTER });
    cy.findByText('Develop applications for the Merchant Center').should(
      'exist'
    );
    cy.findByText('Processing...').should('not.exist');
    cy.percySnapshot();
  });
});
