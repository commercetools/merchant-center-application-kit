/* eslint-disable jest/valid-expect-in-promise */
import { encode } from 'qss';
import { AuthenticationError, ApolloError } from 'apollo-server-errors';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import { defaultFixtures, createResolvers } from '../../support/fixtures/mc';
import { URL_BASE, URL_STATE_MACHINES } from '../../support/urls';

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
describe('when user is authenticated', () => {
  it('should log out with reason "user"', () => {
    cy.login();
    cy.get('[data-test=top-navigation').should('exist');
    // This implicitly checks that the redirect "/" -> "/:projectKey" works
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
  describe('when being on the /account route', () => {
    it('should render app content', () => {
      cy.login();
      cy.get('[data-test=top-navigation').should('exist');
      cy.visit('/account');
      cy.url().should('include', '/account');
      cy.findByText(/^This is a placeholder page/).should('exist');
    });
  });
  describe('when going to an unknown route', () => {
    it('should render page not found', () => {
      cy.login();
      cy.get('[data-test=top-navigation').should('exist');
      cy.visit(`${URL_BASE}/a-non-existing-route`);
      cy.findByText('We could not find what you are looking for').should(
        'exist'
      );
    });
  });
  describe('when switching project', () => {
    let resolvers;
    beforeEach(() => {
      cy.task('getGraphQLSchema', 'mc').then(schema => {
        cy.mockGraphql({
          schema,
        });
      });
      resolvers = createResolvers();
      cy.mockGraphqlOps({
        operations: resolvers,
      });
    });
    it('should render app', () => {
      const nextProject = resolvers.FetchLoggedInUser.me.projects.results[1];
      cy.login();
      cy.get('[data-test=top-navigation').should('exist');
      cy.get('input[aria-labelledby="project-switcher"]')
        .focus()
        .type(nextProject.name);
      cy.findByText(nextProject.name).click();
      cy.url().should('include', `/${nextProject.key}/state-machines`);
    });
  });
  describe('when user has no default project', () => {
    beforeEach(() => {
      cy.task('getGraphQLSchema', 'mc').then(schema => {
        cy.mockGraphql({
          schema,
        });
      });
      cy.mockGraphqlOps({
        operations: createResolvers({
          FetchLoggedInUser: {
            me: defaultFixtures.User.build({
              defaultProjectKey: null,
              projects: { total: 0, results: [] },
            }),
          },
        }),
      });
      cy.window().then(win => win.localStorage.removeItem('activeProjectKey'));
    });
    it('should redirect to project creation', () => {
      cy.login();
      cy.get('[data-test=top-navigation').should('exist');
      cy.findByText('Please create a project!').should('exist');
      cy.findByLabelText('Create project').should(
        'have.attr',
        'href',
        '/account/projects/new'
      );
    });
  });
  describe('when loading user fails with an unknown graphql error', () => {
    beforeEach(() => {
      cy.task('getGraphQLSchema', 'mc').then(schema => {
        cy.mockGraphql({
          schema,
        });
      });
      cy.mockGraphqlOps({
        operations: createResolvers({
          FetchLoggedInUser: {
            me: new ApolloError('Oops'),
          },
        }),
      });
    });
    it('should render error page', () => {
      cy.login();
      cy.findByText('Sorry! An unexpected error occured.').should('exist');
    });
  });
  describe('when loading user fails with an unauthorized graphql error', () => {
    beforeEach(() => {
      cy.task('getGraphQLSchema', 'mc').then(schema => {
        cy.mockGraphql({
          schema,
        });
      });
      cy.mockGraphqlOps({
        operations: createResolvers({
          FetchLoggedInUser: {
            me: new AuthenticationError('User is not authorized'),
          },
        }),
      });
    });
    it('should redirect to "/logout" with reason unauthorized', () => {
      cy.login();
      const queryParams = encode({
        reason: LOGOUT_REASONS.UNAUTHORIZED,
      });
      cy.url().should('include', `/logout?${queryParams}`);
    });
  });
  describe('when loading user fails with a "was not found." graphql error message', () => {
    beforeEach(() => {
      cy.task('getGraphQLSchema', 'mc').then(schema => {
        cy.mockGraphql({
          schema,
        });
      });
      cy.mockGraphqlOps({
        operations: createResolvers({
          FetchLoggedInUser: {
            me: new Error('User was not found.'),
          },
        }),
      });
    });
    it('should redirect to /logout with reason "deleted"', () => {
      cy.login();
      const queryParams = encode({
        reason: LOGOUT_REASONS.DELETED,
      });
      cy.url().should('include', `/logout?${queryParams}`);
    });
  });
  describe('when project is not found', () => {
    beforeEach(() => {
      cy.task('getGraphQLSchema', 'mc').then(schema => {
        cy.mockGraphql({
          schema,
        });
      });
      cy.mockGraphqlOps({
        operations: createResolvers({
          FetchProject: {
            project: null,
          },
        }),
      });
    });
    it('should render "project not found" page', () => {
      cy.login();
      cy.findByText('We could not find this Project').should('exist');
    });
  });
  describe('when project is temporarily suspended', () => {
    beforeEach(() => {
      cy.task('getGraphQLSchema', 'mc').then(schema => {
        cy.mockGraphql({
          schema,
        });
      });
      cy.mockGraphqlOps({
        operations: createResolvers({
          FetchProject: {
            project: defaultFixtures.Project.build({
              suspension: { isActive: true, reason: 'TemporaryMaintenance' },
            }),
          },
        }),
      });
    });
    it('should render "project suspended" page', () => {
      cy.login();
      cy.findByText(
        'Your Project is temporarily suspended due to maintenance.'
      ).should('exist');
    });
  });
  describe('when project is suspended for another reason', () => {
    beforeEach(() => {
      cy.task('getGraphQLSchema', 'mc').then(schema => {
        cy.mockGraphql({
          schema,
        });
      });
      cy.mockGraphqlOps({
        operations: createResolvers({
          FetchProject: {
            project: defaultFixtures.Project.build({
              suspension: { isActive: true, reason: 'Other' },
            }),
          },
        }),
      });
    });
    it('should render "project suspended" page', () => {
      cy.login();
      cy.findByText('Your Project has been suspended').should('exist');
    });
  });
  describe('when project is expired', () => {
    beforeEach(() => {
      cy.task('getGraphQLSchema', 'mc').then(schema => {
        cy.mockGraphql({
          schema,
        });
      });
      cy.mockGraphqlOps({
        operations: createResolvers({
          FetchProject: {
            project: defaultFixtures.Project.build({
              expiry: { isActive: true },
            }),
          },
        }),
      });
    });
    it('should render "project expired" page', () => {
      cy.login();
      cy.findByText('Your trial has expired').should('exist');
    });
  });
  describe('when project is not initialized', () => {
    beforeEach(() => {
      cy.task('getGraphQLSchema', 'mc').then(schema => {
        cy.mockGraphql({
          schema,
        });
      });
      cy.mockGraphqlOps({
        operations: createResolvers({
          FetchProject: {
            project: defaultFixtures.Project.build({
              initialized: false,
            }),
          },
        }),
      });
    });
    it('should render "project not initialized" page', () => {
      cy.login();
      cy.findByText('Your project has not yet been initialized').should(
        'exist'
      );
    });
  });
  describe('when user does not have permissions to access the project', () => {
    beforeEach(() => {
      cy.task('getGraphQLSchema', 'mc').then(schema => {
        cy.mockGraphql({
          schema,
        });
      });
      cy.mockGraphqlOps({
        operations: createResolvers({
          FetchProject: {
            project: defaultFixtures.Project.build({
              allAppliedPermissions: [],
            }),
          },
        }),
      });
    });
    it('should render "unauthorized" page', () => {
      cy.login();
      cy.findByText('Not enough permissions to access this resource').should(
        'exist'
      );
    });
  });
});
