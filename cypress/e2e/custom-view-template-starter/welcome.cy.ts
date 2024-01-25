describe('Welcome', () => {
  beforeEach(() => {
    cy.loginToMerchantCenterForCustomView();
  });
  it('should render page', () => {
    cy.findByText('Custom View loader').should('exist');
    cy.findByText('Processing...').should('not.exist');
  });
});
