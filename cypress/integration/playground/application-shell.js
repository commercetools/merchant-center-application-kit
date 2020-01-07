import { encode } from 'qss';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import { defaultFixtures } from '../../support/fixtures/mc';
import { URL_STATE_MACHINES } from '../../support/urls';

describe('<ApplicationShell>', () => {
  // beforeEach(() => {
  //   cy.server();
  //   cy.task('getGraphQLSchema', 'mc').then(schema => {
  //     cy.mockGraphql({
  //       schema,
  //     });
  //   });
  // });
  describe('when user is not authenticated', () => {
    beforeEach(() => {
      cy.server();
      cy.on('window:before:load', win => {
        const originalFetch = win.fetch;
        function fetch(input, init) {
          if (
            input.indexOf('/graphql') !== -1 &&
            init &&
            init.method === 'POST'
          ) {
            return Promise.resolve().then(
              () => new Response(null, { status: 401 })
            );
          }
          return originalFetch(input, init);
        }
        cy.stub(win, 'fetch', fetch).as('fetchStub');
      });
    });
    it('redirect to /login with reason "unauthorized"', () => {
      cy.login();
      const queryParams = encode({
        reason: LOGOUT_REASONS.UNAUTHORIZED,
        redirectTo: Cypress.config('baseUrl'),
      });
      cy.url().should('include', `/logout?${queryParams}`);
    });
  });
  it('should log out with reason "user"', () => {
    // cy.mockGraphqlOps({
    //   operations: {
    //     FetchLoggedInUser: {
    //       me: defaultFixtures.User.build(),
    //     },
    //     FetchProject: {
    //       project: defaultFixtures.Project.build(),
    //     },
    //   },
    // });
    cy.login();
    cy.get('[data-test=top-navigation').should('exist');
    cy.visit(`${Cypress.config('baseUrl')}${URL_STATE_MACHINES}`);
    cy.url().should('include', URL_STATE_MACHINES);
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
});
