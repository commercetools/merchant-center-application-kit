import {
  URL_APP_KIT_PLAYGROUND_NOTIFICATIONS,
  ENTRY_POINT_APP_KIT_PLAYGROUND,
} from '../../support/urls';

describe('Notifications', () => {
  beforeEach(() => {
    cy.loginToMerchantCenter({
      entryPointUriPath: ENTRY_POINT_APP_KIT_PLAYGROUND,
      initialRoute: URL_APP_KIT_PLAYGROUND_NOTIFICATIONS,
    });
  });
  it('should adjust layout when notifications are open', () => {
    cy.findByLabelText('Open modal 1');
    cy.findByLabelText('Global notification').click();
    cy.findByText('hello').should('exist');

    cy.findByLabelText('Page notification').click();
    cy.findByLabelText('Page notification').click();
    cy.findAllByText('oops').should('have.length', 2);

    cy.findByLabelText('Side notification').click();
    cy.findByLabelText('Side notification').click();
    cy.findAllByText('ok').should('have.length', 2);
  });

  it('should adjust layout for modals when notifications are open', () => {
    // Open modal
    cy.findByLabelText('Open modal 1').click();
    // Open a second modal
    cy.findByLabelText('Open modal 2').click();

    cy.findByLabelText('Modal page 2').within(() => {
      cy.findByLabelText('Global notification').click();

      cy.findByLabelText('Page notification').click();
      cy.findByLabelText('Page notification').click();

      cy.findByLabelText('Side notification').click();
      cy.findByLabelText('Side notification').click();
    });

    cy.findByText('hello').should('exist');
    cy.findAllByText('oops').should('have.length', 2);
    cy.findAllByText('ok').should('have.length', 2);
    // be.visible, not exist: the bar renders collapsed until its query resolves.
    cy.findByLabelText('Modal page 2').within(() => {
      cy.findByText('Custom Views:').should('be.visible');
    });
  });
});

describe('Stacking layers', () => {
  beforeEach(() => {
    cy.loginToMerchantCenter({
      entryPointUriPath: ENTRY_POINT_APP_KIT_PLAYGROUND,
    });
  });
  it('should correctly stack modal pages', () => {
    cy.visit(URL_APP_KIT_PLAYGROUND_NOTIFICATIONS);
    cy.findByLabelText('Open modal 1').should('be.visible').click();
    cy.findByLabelText('Open modal 2').should('be.visible').click();
    cy.findByLabelText('Open modal 3').should('be.visible').click();
    cy.findByLabelText('Open modal 4').should('be.visible').click();

    cy.findByLabelText('Modal page 4').within(() => {
      cy.findByText('Custom Views:').should('be.visible');
    });

    cy.findByLabelText('Open dialog 5').should('be.visible').click();
  });

  it('should correctly stack modal pages when opening nested page', () => {
    cy.visit(`${URL_APP_KIT_PLAYGROUND_NOTIFICATIONS}/1/2/3/4/5`);

    // Five of these mount at once here, so scope to the one on screen.
    cy.findByLabelText('Modal page 5').within(() => {
      cy.findByText('Custom Views:').should('be.visible');
    });

    cy.findByLabelText('Open dialog 6').should('be.visible').click();
  });
});
