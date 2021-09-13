import { URL_EXAMPLES_STARTER_CHANNELS } from '../../support/urls';

describe('Channels', () => {
  it('should render page', () => {
    cy.login({
      redirectToUri: URL_EXAMPLES_STARTER_CHANNELS,
      isForcedMenuOpen: false,
    });

    cy.findByText('Channels list').should('exist');
    cy.findByText('Store Berlin').should('exist');
    cy.findByText('Store Munich').should('exist');
    cy.percySnapshot();
  });
});
