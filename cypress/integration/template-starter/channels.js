import { ENTRY_POINT_TEMPLATE_STARTER } from '../../support/urls';

describe('Channels', () => {
  beforeEach(() => {
    cy.loginByOidc({ entryPointUriPath: ENTRY_POINT_TEMPLATE_STARTER });
  });
  it('should render page', () => {
    cy.get('main').within(() => {
      cy.findByText('Channels list').should('exist');
    });
    cy.findByText('Store Berlin').should('exist');
    cy.findByText('Store Munich').should('exist');
    cy.percySnapshot();
  });
});
