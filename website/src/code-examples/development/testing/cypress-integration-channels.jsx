import { entryPointUriPath } from '../support/constants';

describe('Channels', () => {
  beforeEach(() => {
    cy.loginByOidc({ entryPointUriPath });
  });
  it('should render page', () => {
    cy.findByText('Channels list').should('exist');
  });
});
