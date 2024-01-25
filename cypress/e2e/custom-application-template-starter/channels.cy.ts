import {
  ENTRY_POINT_TEMPLATE_STARTER,
  URL_TEMPLATE_STARTER,
} from '../../support/urls';

describe('Channels', () => {
  beforeEach(() => {
    cy.loginToMerchantCenter({
      entryPointUriPath: ENTRY_POINT_TEMPLATE_STARTER,
      initialRoute: URL_TEMPLATE_STARTER,
    });
  });
  it('should render page', () => {
    cy.findByText('Fetching channels').click();
    cy.get('main').within(() => {
      cy.findByText('Channels list').should('exist');
    });
    cy.findByText('Store Berlin').should('exist');
    cy.findByText('Store Munich').should('exist').click();
    cy.findByRole('dialog', { name: 'Store Munich' }).should('exist');
    cy.get('[role=dialog]').within(() => {
      cy.findByLabelText(/channel key/i).should('have.value', 'store-munich');
    });
    cy.title().should(
      'eq',
      `Store Munich - Template-starter - ${Cypress.env(
        'PROJECT_KEY'
      )} - Merchant Center`
    );
  });
});
