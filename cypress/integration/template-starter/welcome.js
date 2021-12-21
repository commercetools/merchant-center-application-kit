import { ENTRY_POINT_TEMPLATE_STARTER } from '../../support/urls';

describe('Welcome', () => {
  beforeEach(() => {
    cy.loginByOidc({ entryPointUriPath: ENTRY_POINT_TEMPLATE_STARTER });
  });
  it('should render page', () => {
    cy.findByText('Develop applications for the Merchant Center').should(
      'exist'
    );
    cy.findByText('Processing...').should('not.exist');
    cy.percySnapshot();
  });
});
