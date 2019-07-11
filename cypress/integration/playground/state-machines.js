import { URL_STATE_MACHINES } from '../../support/urls';

describe('State machines', () => {
  describe('List view', () => {
    it('should render page', () => {
      cy.login({ redirectToUri: URL_STATE_MACHINES });
      cy.getByText('State Machines').should('exist');
    });
  });
});
