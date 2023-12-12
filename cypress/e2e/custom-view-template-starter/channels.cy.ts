import {
  ENTRY_POINT_CUSTOM_VIEW_TEMPLATE_STARTER,
  URL_CUSTOM_VIEW_TEMPLATE_STARTER,
} from '../../support/urls';

describe('Channels', () => {
  beforeEach(() => {
    cy.loginToMerchantCenter({
      entryPointUriPath: ENTRY_POINT_CUSTOM_VIEW_TEMPLATE_STARTER,
      initialRoute: URL_CUSTOM_VIEW_TEMPLATE_STARTER,
    });
  });
  it('should render page', () => {
    cy.findByText('Open the Custom View').click();
    cy.get('#custom-view-TODO')
      .getIframeBody()
      .within(() => {
        cy.findByText('Channels list').should('exist');
        cy.findByText('Store Berlin').should('exist');
        // ℹ️ routing within the iframe does not work
        // cy.findByText('Store Munich').should('exist').click();
        // cy.findByRole('dialog', { name: 'Store Munich' }).should('exist');
        // cy.get('[role=dialog]').within(() => {
        //   cy.findByLabelText(/channel key/i).should(
        //     'have.value',
        //     'store-munich'
        //   );
        // });
        // cy.title().should(
        //   'eq',
        //   `Store Munich - Template-starter - ${Cypress.env(
        //     'PROJECT_KEY'
        //   )} - Merchant Center`
        // );
      });
  });
});
