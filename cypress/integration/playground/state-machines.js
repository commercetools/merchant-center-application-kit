import { URL_BASE } from '../../support/urls';

describe('State machines', () => {
  describe('List view', () => {
    it('should render page', () => {
      cy.setDesktopViewport();
      cy.login();
      cy.visit(`${URL_BASE}/state-machines`);

      cy.getByText('State Machines').should('exist');
    });
  });
});
