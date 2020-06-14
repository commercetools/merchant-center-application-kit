/* eslint-disable jest/valid-expect-in-promise */
import { encode } from 'qss';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import { URL_BASE, URL_STATE_MACHINES } from '../../support/urls';

describe('when user is authenticated', () => {
  it('should log out with reason "user"', () => {
    cy.login({ redirectToUri: URL_STATE_MACHINES });

    cy.findByRole('button', { name: /open user settings menu/i }).click();
    cy.findByText('Logout').click();

    const queryParams = encode({
      reason: LOGOUT_REASONS.USER,
    });
    cy.url().should('include', `/logout?${queryParams}`);
    cy.findByText('This is the logout page for local development.').should(
      'exist'
    );
  });
  describe('when navigating to an unknown route', () => {
    it('should render a not found page', () => {
      cy.login({ redirectToUri: URL_STATE_MACHINES });
      cy.visit(`${URL_BASE}/a-non-existing-route`);
      cy.findByText('We could not find what you are looking for').should(
        'exist'
      );
    });
  });
});

describe('navigation menu', () => {
  it('should stay collapsed for small viewports', () => {
    cy.login({ redirectToUri: URL_STATE_MACHINES });
    cy.viewport(900, 800);
    cy.findAllByText('Initial').should('exist');
    cy.percySnapshot(cy.state('runnable').fullTitle(), {
      widths: [900],
    });
  });
  it('should expand menu when clicking on the expand button', () => {
    cy.login({ redirectToUri: URL_STATE_MACHINES });
    cy.findAllByText('Initial').should('exist');
    cy.findByTestId('menu-expander').click();
    cy.window().then((win) =>
      // eslint-disable-next-line jest/valid-expect
      expect(win.localStorage.getItem('isForcedMenuOpen')).to.equal('true')
    );
    cy.percySnapshot();
  });
});
