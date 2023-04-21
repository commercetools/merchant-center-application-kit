import { encode } from 'qss';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import {
  URL_BASE,
  ENTRY_POINT_APP_KIT_PLAYGROUND,
  URL_APP_KIT_PLAYGROUND,
} from '../../support/urls';

describe('when user is authenticated', () => {
  beforeEach(() => {
    cy.loginToMerchantCenter({
      entryPointUriPath: ENTRY_POINT_APP_KIT_PLAYGROUND,
      initialRoute: URL_APP_KIT_PLAYGROUND,
    });
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
    cy.loginToMerchantCenter({
      entryPointUriPath: ENTRY_POINT_APP_KIT_PLAYGROUND,
      initialRoute: URL_APP_KIT_PLAYGROUND,
    });
  });
  it('should stay collapsed for small viewports', () => {
    cy.viewport(900, 800);
    cy.findAllByText('Initial').should('exist');
    cy.percySnapshot(
      // @ts-ignore
      cy.state('runnable').fullTitle(),
      { widths: [900] }
    );
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
  it('should show submenu on hover', () => {
    cy.findAllByText('Initial').should('exist');
    cy.findByRole('menu')
      .get('li')
      .first()
      .trigger('mouseover')
      .findByRole('link', { name: 'Echo Server' })
      .should('be.visible');
  });
});
