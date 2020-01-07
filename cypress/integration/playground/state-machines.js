import { URL_STATE_MACHINES, URL_STATE_MACHINES_ID } from '../../support/urls';

describe('State machines', () => {
  it('should render list view', () => {
    cy.login();
    cy.get('[data-test=top-navigation').should('exist');
    cy.visit(`${Cypress.config('baseUrl')}${URL_STATE_MACHINES}`);
    cy.url().should('include', URL_STATE_MACHINES);
    // NOTE: 'State Machines' exists once in the menu
    // and once in `main`.
    cy.get('main').within(() => {
      cy.findByText('State Machines').should('exist');
    });
    cy.findAllByText('Initial').should('exist');
    cy.percySnapshot();
  });
  it('should render list view and go to details page', () => {
    cy.login();
    cy.get('[data-test=top-navigation').should('exist');
    cy.visit(`${Cypress.config('baseUrl')}${URL_STATE_MACHINES}`);
    cy.url().should('include', URL_STATE_MACHINES);
    // Go to details page
    cy.findAllByText('Initial')
      .first()
      .click();
    cy.url().should('include', URL_STATE_MACHINES_ID);
    cy.findByText('LineItemState').should('exist');
    cy.percySnapshot();
  });
});
