import {
  ENTRY_POINT_CUSTOM_VIEW_TEMPLATE_STARTER,
  URL_CUSTOM_VIEW_TEMPLATE_STARTER,
} from '../../support/urls';

describe('Welcome', () => {
  beforeEach(() => {
    cy.loginToMerchantCenter({
      entryPointUriPath: ENTRY_POINT_CUSTOM_VIEW_TEMPLATE_STARTER,
      initialRoute: URL_CUSTOM_VIEW_TEMPLATE_STARTER,
    });
  });
  it('should render page', () => {
    cy.findByText('Custom View loader').should('exist');
    cy.findByText('Processing...').should('not.exist');
  });
});
