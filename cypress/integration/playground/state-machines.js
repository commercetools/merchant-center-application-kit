import {
  URL_STATE_MACHINES_ID,
  ENTRY_POINT_STATE_MACHINES,
} from '../../support/urls';

describe('State machines', () => {
  beforeEach(() => {
    cy.loginByOidc({ entryPointUriPath: ENTRY_POINT_STATE_MACHINES });
  });
  it('should render list view', () => {
    cy.get('main').within(() => {
      cy.findByText('State Machines').should('exist');
    });
    cy.findAllByText('Initial').should('exist');
    cy.percySnapshot();
  });
  it('should render list view and go to details page', () => {
    // Go to details page
    cy.findAllByText('Initial').first().click();
    cy.url().should('include', URL_STATE_MACHINES_ID);
    cy.findByText('LineItemState').should('exist');
    cy.percySnapshot();
  });
});
