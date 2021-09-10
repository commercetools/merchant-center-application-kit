import { URL_EXAMPLES_STARTER_CHANNELS } from '../../support/urls';

describe('Channels', () => {
  it('should render page', () => {
    cy.viewport(1024, 1024);
    cy.login({ redirectToUri: URL_EXAMPLES_STARTER_CHANNELS });
    cy.findByText('Channels list').should('exist');
    cy.findByText('Store Berlin').should('exist');
    cy.findByText('Store Munich').should('exist');
    cy.percySnapshot();
  });
});
