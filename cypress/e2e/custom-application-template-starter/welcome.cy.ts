import {
  ENTRY_POINT_TEMPLATE_STARTER,
  URL_TEMPLATE_STARTER,
} from '../../support/urls';

describe('Welcome', () => {
  beforeEach(() => {
    cy.loginToMerchantCenter({
      entryPointUriPath: ENTRY_POINT_TEMPLATE_STARTER,
      initialRoute: URL_TEMPLATE_STARTER,
    });
  });
  it('should render page', () => {
    cy.findByText('Develop applications for the Merchant Center').should(
      'exist'
    );
    cy.findByText('Processing...').should('not.exist');
    cy.findByText('Fetching channels').should('exist');
  });
});
