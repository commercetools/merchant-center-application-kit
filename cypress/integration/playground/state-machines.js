import { URL_BASE } from '../../support/urls';

describe('State machines', () => {
  describe('List view', () => {
    beforeEach(() => {
      cy.setDesktopViewport();
      cy.login();
      cy.visit(`${URL_BASE}/state-machines`);
    });
    it('should render page', () => {
      cy.getByText('State Machines').should('exist');
    });
  });
});
