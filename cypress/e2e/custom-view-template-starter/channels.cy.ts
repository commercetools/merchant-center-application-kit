describe('Channels', () => {
  beforeEach(() => {
    cy.loginToMerchantCenterForCustomView();
  });
  it('should render page', () => {
    cy.findByText('Open the Custom View').click();
    cy.get('#custom-view-TODO')
      .getIframeBody()
      .within(() => {
        cy.findByText('Channels list').should('exist');
        cy.findByText('Store Berlin').should('exist');
      });
  });
});
