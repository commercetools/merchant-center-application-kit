import { URL_STATE_MACHINES, URL_STATE_MACHINES_ID } from '../../support/urls';

describe('State machines', () => {
  it('should render list view', () => {
    cy.login({ redirectToUri: URL_STATE_MACHINES });
    cy.getByText('State Machines').should('exist');
    cy.getAllByText('Initial').should('exist');
    cy.percySnapshot();
  });
  it('should render list view and go to details page', () => {
    cy.login({ redirectToUri: URL_STATE_MACHINES });
    // Go to details page
    cy.getAllByText('Initial')
      .first()
      .click();
    cy.url().should('include', URL_STATE_MACHINES_ID);
    cy.getByText('LineItemState').should('exist');
    cy.percySnapshot();
  });
});
