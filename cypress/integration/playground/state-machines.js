import { URL_STATE_MACHINES, URL_STATE_MACHINES_ID } from '../../support/urls';

describe('State machines', () => {
  describe('List view', () => {
    it('should render page', () => {
      cy.login({ redirectToUri: URL_STATE_MACHINES });
      cy.getByText('State Machines').should('exist');
      cy.percySnapshot();

      // Go to details page
      cy.getAllByText('Initial')
        .first()
        .click();
      cy.url().should('include', URL_STATE_MACHINES_ID);
      cy.getByText('LineItemState').should('exist');
      cy.percySnapshot();
    });
  });
});
