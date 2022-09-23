import {
  URL_APP_KIT_PLAYGROUND_NOTIFICATIONS,
  ENTRY_POINT_APP_KIT_PLAYGROUND,
} from '../../support/urls';

describe('Notifications', () => {
  beforeEach(() => {
    cy.loginByOidc({
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

    cy.percySnapshot(
      // @ts-ignore
      cy.state('runnable').fullTitle(),
      {
        // NOTE: Attempt to help making the test more stable to allow the notifications
        // to "push down" the page layout.
        enableJavaScript: true,
      }
    );
  });

  it.only('should adjust layout for modals when notifications are open', () => {
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
    cy.percySnapshot();
  });
});

describe('Stacking layers', () => {
  beforeEach(() => {
    cy.loginByOidc({
      entryPointUriPath: ENTRY_POINT_APP_KIT_PLAYGROUND,
      initialRoute: URL_APP_KIT_PLAYGROUND_NOTIFICATIONS,
    });
  });
  it('should correctly stack modal pages', () => {
    cy.findByLabelText('Open modal 1').should('be.visible').click();
    cy.findByLabelText('Open modal 2').should('be.visible').click();
    cy.findByLabelText('Open modal 3').should('be.visible').click();
    cy.findByLabelText('Open modal 4').should('be.visible').click();

    cy.findByLabelText('Open dialog 5').should('be.visible').click();
    cy.percySnapshot();
  });

  it('should correctly stack modal pages when opening nested page', () => {
    cy.visit(`${URL_APP_KIT_PLAYGROUND_NOTIFICATIONS}/1/2/3/4/5`);

    cy.findByLabelText('Open dialog 6').should('be.visible').click();
    cy.percySnapshot();
  });
});
