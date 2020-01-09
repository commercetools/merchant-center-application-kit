/* eslint-disable jest/valid-expect-in-promise */
import { encode } from 'qss';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import { URL_BASE, URL_STATE_MACHINES } from '../../support/urls';

describe('when user is authenticated', () => {
  it('should log out with reason "user"', () => {
    cy.login({ redirectToUri: URL_STATE_MACHINES });
    cy.findByLabelText('open menu').click();
    cy.findByText('Logout').click();
    const queryParams = encode({
      reason: LOGOUT_REASONS.USER,
    });
    cy.url().should('include', `/logout?${queryParams}`);
    cy.findByText('This is the logout page for local development.').should(
      'exist'
    );
  });
  describe('when going to an unknown route', () => {
    it('should render page not found', () => {
      cy.login({ redirectToUri: URL_STATE_MACHINES });
      cy.visit(`${URL_BASE}/a-non-existing-route`);
      cy.findByText('We could not find what you are looking for').should(
        'exist'
      );
    });
  });
});
