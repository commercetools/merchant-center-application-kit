import { encode } from 'qss';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import {
  URL_BASE,
  URL_STATE_MACHINES,
  ENTRY_POINT_STATE_MACHINES,
} from '../../support/urls';

describe('when user is authenticated', () => {
  beforeEach(() => {
    cy.loginByOidc({ entryPointUriPath: ENTRY_POINT_STATE_MACHINES });
  });
  it('should log out with reason "user"', () => {
    cy.findByRole('button', { name: /open user settings menu/i }).click();

    const queryParams = encode({
      reason: LOGOUT_REASONS.USER,
    });
    cy.findByRole('link', { name: /logout/i }).should(
      'have.attr',
      'href',
      `/logout?${queryParams}`
    );
  });
  describe('when navigating to an unknown route', () => {
    it('should render a not found page', () => {
      cy.visit(`${URL_BASE}/a-non-existing-route`);
      cy.findByText('We could not find what you are looking for').should(
        'exist'
      );
      cy.percySnapshot();
    });
  });
});

describe('navigation menu', () => {
  beforeEach(() => {
    cy.loginByOidc({ entryPointUriPath: ENTRY_POINT_STATE_MACHINES });
  });
  it('should stay collapsed for small viewports', () => {
    cy.viewport(900, 800);
    cy.findAllByText('Initial').should('exist');
    cy.percySnapshot(cy.state('runnable').fullTitle(), {
      widths: [900],
    });
  });
  it('should expand menu when clicking on the expand button', () => {
    cy.findAllByText('Initial').should('exist');
    cy.findByTestId('menu-expander').click();
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.window().then((win) =>
      expect(win.localStorage.getItem('isForcedMenuOpen')).to.equal('true')
    );
    cy.percySnapshot();
  });
});

describe('failed OIDC authentication', () => {
  describe('when sessionToken is missing', () => {
    it('should show oidc callback error page', () => {
      cy.visit(`/${URL_STATE_MACHINES}/oidc/callback`);
      cy.findByText('Authentication error');
      cy.findByText(/missing sessionToken/i);
      cy.percySnapshot();
    });
  });
  describe('when sessionToken is invalid', () => {
    it('should show oidc callback error page', () => {
      cy.visit(`/${URL_STATE_MACHINES}/oidc/callback#sessionToken=123`);
      cy.findByText('Authentication error');
      cy.findByText(/invalid token specified/i);
      cy.percySnapshot();
    });
  });
});
