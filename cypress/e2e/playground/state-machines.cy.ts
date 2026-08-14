import {
  URL_APP_KIT_PLAYGROUND_STATE_MACHINES_ID,
  ENTRY_POINT_APP_KIT_PLAYGROUND,
  URL_APP_KIT_PLAYGROUND,
} from '../../support/urls';

describe('State machines', () => {
  beforeEach(() => {
    cy.loginToMerchantCenter({
      entryPointUriPath: ENTRY_POINT_APP_KIT_PLAYGROUND,
      initialRoute: URL_APP_KIT_PLAYGROUND,
    });
  });
  it('should render list view', () => {
    cy.get('main').within(() => {
      cy.findByText('State Machines').should('exist');
    });
    cy.findAllByText('Initial').should('exist');
    cy.findByText('Processing...').should('not.exist');
    // be.visible, not exist: the bar renders collapsed until its query resolves.
    cy.findByText('Custom Views:').should('be.visible');
  });
  it('should render list view and go to details page', () => {
    // Go to details page
    cy.findAllByText('Initial').first().click();
    cy.url().should('include', URL_APP_KIT_PLAYGROUND_STATE_MACHINES_ID);
    cy.findByText('LineItemState').should('exist');
    cy.findByText('Processing...').should('not.exist');
    // The details modal has no bar; this waits on the list page behind it.
    cy.findByText('Custom Views:').should('be.visible');
  });
});
