import { URL_EXAMPLES_STARTER_CHANNELS } from '../../support/urls';

describe('Channels', () => {
  it('should render page', () => {
    cy.login({ redirectToUri: URL_EXAMPLES_STARTER_CHANNELS });
    cy.viewport(1030, 2200);
    cy.findByText('Channels list').should('exist');
    cy.findByText('Store Berlin').should('exist');
    cy.findByText('Store Munich').should('exist');
    cy.percySnapshot();
  });
});
