import { URL_BASE } from '../../support/urls';

describe('Main view', () => {
  it('should render page', () => {
    cy.setDesktopViewport();
    cy.login();
    cy.visit(`${URL_BASE}/examples-starter`);

    cy.getByText('Hello, world').should('exist');
  });
});
