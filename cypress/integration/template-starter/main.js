import { URL_BASE } from '../../support/urls';

describe('Main view', () => {
  beforeEach(() => {
    cy.setDesktopViewport();
    cy.login();
    cy.visit(`${URL_BASE}/examples-starter`);
  });
  it('should render page', () => {
    cy.getByText('Hello, world').should('exist');
  });
});
