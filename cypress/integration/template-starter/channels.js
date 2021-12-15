import { URL_TEMPLATE_STARTER_CHANNELS } from '../../support/urls';

describe('Channels', () => {
  it('should render page', () => {
    cy.login({ redirectToUri: URL_TEMPLATE_STARTER_CHANNELS });
    cy.findByText('Channels list').should('exist');
    cy.findByText('Store Berlin').should('exist');
    cy.findByText('Store Munich').should('exist');
    cy.percySnapshot();
  });
});
