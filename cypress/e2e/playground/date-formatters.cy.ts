import {
  ENTRY_POINT_APP_KIT_PLAYGROUND,
  URL_APP_KIT_PLAYGROUND_DATE_FORMATTERS,
} from '../../support/urls';

describe('Date formatters', () => {
  beforeEach(() => {
    cy.loginToMerchantCenter({
      entryPointUriPath: ENTRY_POINT_APP_KIT_PLAYGROUND,
      initialRoute: URL_APP_KIT_PLAYGROUND_DATE_FORMATTERS,
    });
  });
  it('should render date formatters view', () => {
    // This is the latest locale formats card loaded in the view
    cy.findByText(/fr-FR/i);
    cy.percySnapshot();
  });
});
