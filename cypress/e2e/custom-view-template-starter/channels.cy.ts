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
      });
  });
});
