import {
  ENTRY_POINT_APP_KIT_PLAYGROUND,
  URL_APP_KIT_PLAYGROUND,
} from '../../support/urls';

describe('Custom View: Notifications inside iframe', () => {
  beforeEach(() => {
    cy.loginToMerchantCenter({
      entryPointUriPath: ENTRY_POINT_APP_KIT_PLAYGROUND,
      initialRoute: URL_APP_KIT_PLAYGROUND,
    });
  });

  it('should open the Demo Custom View and display a success notification triggered from within the iframe', () => {
    cy.findByRole('button', { name: /Demo Custom View/i })
      .should('be.visible')
      .click();

    cy.get('iframe[title="Custom View: Demo Custom View"]').should('exist');

    cy.get('iframe[title="Custom View: Demo Custom View"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .within(() => {
        cy.findByRole('button', { name: /Show Success Notification/i }).click();
        cy.findByText(/Operation completed successfully!/i).should('exist');
      });

    cy.percySnapshot();
  });
});
