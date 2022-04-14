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

    cy.percySnapshot();
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
    cy.percySnapshot();
  });
});
