import { ENTRY_POINT_TEMPLATE_STARTER } from '../../support/urls';

describe('Channels', () => {
  beforeEach(() => {
    cy.loginByOidc({ entryPointUriPath: ENTRY_POINT_TEMPLATE_STARTER });
  });
  it('should render page', () => {
    cy.findByText('Fetching channels').click();
    cy.get('main').within(() => {
      cy.findByText('Channels list').should('exist');
    });
    cy.findByText('Store Berlin').should('exist');
    cy.findByText('Store Munich').should('exist').click();
    cy.title().should(
      'eq',
      'Store Munich - Template-starter - mc-e2e-app-kit-01 - Merchant Center'
    );
    cy.percySnapshot();
  });
});
