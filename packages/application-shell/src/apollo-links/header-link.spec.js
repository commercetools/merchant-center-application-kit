import { graphql } from 'msw';
import {
  ApolloLink,
  execute,
  Observable,
  gql,
  createHttpLink,
} from '@apollo/client';
import { setupServer } from 'msw/node';
import waitFor from 'wait-for-observables';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import {
  getCorrelationId,
  selectProjectKeyFromUrl,
  selectTeamIdFromLocalStorage,
  selectUserId,
} from '../utils';
import * as oidcStorage from '../utils/oidc-storage';
import headerLink from './header-link';

jest.mock('@commercetools/http-user-agent', () => jest.fn(() => 'user-agent'));
jest.mock('../utils/get-correlation-id');
jest.mock('../utils/select-project-key-from-url');
jest.mock('../utils/select-team-id-from-local-storage');
jest.mock('../utils/select-user-id');
jest.mock('../utils/oidc-storage');

describe('headerLink', () => {
  it('should be an instance of ApolloLink', () => {
    expect(headerLink).toBeInstanceOf(ApolloLink);
  });
});

const mockServer = setupServer();
beforeEach(() => {
  getCorrelationId.mockImplementation(() => 'test-correlation-id');
  selectProjectKeyFromUrl.mockImplementation(() => 'project-1');
  selectTeamIdFromLocalStorage.mockImplementation(() => 'team-1');
  selectUserId.mockImplementation(() => 'user-1');
});
afterEach(() => {
  mockServer.resetHandlers();
});
beforeAll(() =>
  mockServer.listen({
    onUnhandledRequest: 'error',
  })
);
afterAll(() => mockServer.close());

const query = gql`
  query Test {
    sample {
      id
    }
  }
`;

describe('configuring header link', () => {
  let context;
  let link;

  beforeEach(async () => {
    const debugLink = new ApolloLink((operation, forward) => {
      context = operation.getContext();

      // Remove request metadata to avoid having it in the snapshots
      delete context.target;
      delete context.featureFlag;
      delete context.projectKey;
      delete context.teamId;

      return forward(operation);
    });

    const terminatingLinkStub = jest.fn(() => Observable.of({}));

    link = ApolloLink.from([headerLink, debugLink, terminatingLinkStub]);

    await waitFor(
      execute(link, {
        query,
        context: {
          target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
          featureFlag: 'test-feature-a',
        },
      })
    );
  });

  it('should set headers matching snapshot', () => {
    expect(context).toMatchInlineSnapshot(`
      {
        "credentials": "include",
        "headers": {
          "Accept": "application/json",
          "X-Correlation-Id": "test-correlation-id",
          "X-Feature-Flag": "test-feature-a",
          "X-Graphql-Operation-Name": "Test",
          "X-Graphql-Target": "mc",
          "X-Project-Key": "project-1",
          "X-Team-Id": "team-1",
          "X-User-Agent": "user-agent",
        },
      }
    `);
  });

  it('should allow specifying `X-Project-Key`-Header', () => {
    expect(context.headers).toEqual(
      expect.objectContaining({
        'X-Project-Key': 'project-1',
      })
    );
  });

  it('should allow specifying `X-Team-Id`-Header', () => {
    expect(context.headers).toEqual(
      expect.objectContaining({
        'X-Team-Id': 'team-1',
      })
    );
  });

  it('should allow specifying `X-Feature-Flag`-Header', () => {
    expect(context.headers).toEqual(
      expect.objectContaining({
        'X-Feature-Flag': 'test-feature-a',
      })
    );
  });

  it('should allow specifying `X-Graphql-Target`-Header', () => {
    expect(context.headers).toEqual(
      expect.objectContaining({
        'X-Graphql-Target': GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
      })
    );
  });

  it('should include `mc` in the `X-Correlation-Id`-Header', () => {
    expect(context.headers).toEqual(
      expect.objectContaining({
        'X-Correlation-Id': 'test-correlation-id',
      })
    );
  });

  it('should pass "userId" param to "getCorrelationId"', () => {
    expect(getCorrelationId).toHaveBeenCalledWith({ userId: 'user-1' });
  });

  describe('with project key in variables', () => {
    const projectKey = 'test-project-key';

    beforeEach(async () => {
      await waitFor(
        execute(link, {
          query,
          context: {
            target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
            projectKey,
          },
        })
      );
    });

    it('should set headers matching snapshot', () => {
      expect(context).toMatchInlineSnapshot(`
        {
          "credentials": "include",
          "headers": {
            "Accept": "application/json",
            "X-Correlation-Id": "test-correlation-id",
            "X-Graphql-Operation-Name": "Test",
            "X-Graphql-Target": "mc",
            "X-Project-Key": "test-project-key",
            "X-Team-Id": "team-1",
            "X-User-Agent": "user-agent",
          },
        }
      `);
    });

    it('should set `X-Project-Key`-Header', () => {
      expect(context.headers).toEqual(
        expect.objectContaining({
          'X-Project-Key': projectKey,
        })
      );
    });
  });

  describe('with team id in variables', () => {
    const teamId = 'test-team-id';

    beforeEach(async () => {
      await waitFor(
        execute(link, {
          query,
          context: {
            target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
            teamId,
          },
        })
      );
    });

    it('should set headers matching snapshot', () => {
      expect(context).toMatchInlineSnapshot(`
        {
          "credentials": "include",
          "headers": {
            "Accept": "application/json",
            "X-Correlation-Id": "test-correlation-id",
            "X-Graphql-Operation-Name": "Test",
            "X-Graphql-Target": "mc",
            "X-Project-Key": "project-1",
            "X-Team-Id": "test-team-id",
            "X-User-Agent": "user-agent",
          },
        }
      `);
    });

    it('should set `X-Team-Id`-Header', () => {
      expect(context.headers).toEqual(
        expect.objectContaining({
          'X-Team-Id': teamId,
        })
      );
    });
  });

  describe('with feature flag in variables', () => {
    const featureFlag = 'test-feature-flag';

    beforeEach(async () => {
      await waitFor(
        execute(link, {
          query,
          context: {
            target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
            featureFlag,
          },
        })
      );
    });

    it('should set headers matching snapshot', () => {
      expect(context).toMatchInlineSnapshot(`
        {
          "credentials": "include",
          "headers": {
            "Accept": "application/json",
            "X-Correlation-Id": "test-correlation-id",
            "X-Feature-Flag": "test-feature-flag",
            "X-Graphql-Operation-Name": "Test",
            "X-Graphql-Target": "mc",
            "X-Project-Key": "project-1",
            "X-Team-Id": "team-1",
            "X-User-Agent": "user-agent",
          },
        }
      `);
    });

    it('should set `X-Feature-Flag`-Header', () => {
      expect(context.headers).toEqual(
        expect.objectContaining({
          'X-Feature-Flag': featureFlag,
        })
      );
    });
  });

  describe('with forward-to config', () => {
    describe('without custom headers', () => {
      beforeEach(async () => {
        await waitFor(
          execute(link, {
            query,
            context: {
              target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
              forwardToConfig: {
                audiencePolicy: 'forward-url-origin-full-path',
                version: 'v2',
                uri: 'https://avengers.app',
              },
            },
          })
        );
      });

      it('should set headers matching snapshot', () => {
        expect(context).toMatchInlineSnapshot(`
          {
            "credentials": "include",
            "forwardToConfig": {
              "audiencePolicy": "forward-url-origin-full-path",
              "uri": "https://avengers.app",
              "version": "v2",
            },
            "headers": {
              "Accept": "application/json",
              "Accept-version": "v2",
              "X-Correlation-Id": "test-correlation-id",
              "X-Forward-To": "https://avengers.app",
              "X-Forward-To-Audience-Policy": "forward-url-origin-full-path",
              "X-Graphql-Operation-Name": "Test",
              "X-Graphql-Target": "mc",
              "X-Project-Key": "project-1",
              "X-Team-Id": "team-1",
              "X-User-Agent": "user-agent",
            },
          }
        `);
      });

      it('should set required forward-to headers', () => {
        expect(context.headers).toEqual(
          expect.objectContaining({
            'Accept-version': 'v2',
            'X-Forward-To': 'https://avengers.app',
          })
        );
      });
    });
    describe('with custom headers', () => {
      beforeEach(async () => {
        await waitFor(
          execute(link, {
            query,
            context: {
              target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
              forwardToConfig: {
                audiencePolicy: 'forward-url-origin-full-path',
                version: 'v2',
                uri: 'https://avengers.app',
                headers: {
                  'x-foo': 'bar',
                  'accept-language': '*',
                },
              },
            },
          })
        );
      });

      it('should set headers matching snapshot', () => {
        expect(context).toMatchInlineSnapshot(`
          {
            "credentials": "include",
            "forwardToConfig": {
              "audiencePolicy": "forward-url-origin-full-path",
              "headers": {
                "accept-language": "*",
                "x-foo": "bar",
              },
              "uri": "https://avengers.app",
              "version": "v2",
            },
            "headers": {
              "Accept": "application/json",
              "Accept-version": "v2",
              "X-Correlation-Id": "test-correlation-id",
              "X-Forward-To": "https://avengers.app",
              "X-Forward-To-Audience-Policy": "forward-url-origin-full-path",
              "X-Graphql-Operation-Name": "Test",
              "X-Graphql-Target": "mc",
              "X-Project-Key": "project-1",
              "X-Team-Id": "team-1",
              "X-User-Agent": "user-agent",
              "x-forward-header-accept-language": "*",
              "x-forward-header-x-foo": "bar",
            },
          }
        `);
      });

      it('should set required forward-to headers', () => {
        expect(context.headers).toEqual(
          expect.objectContaining({
            'Accept-version': 'v2',
            'X-Forward-To': 'https://avengers.app',
            'x-forward-header-x-foo': 'bar',
            'x-forward-header-accept-language': '*',
          })
        );
      });
    });
  });

  describe('with session token in storage', () => {
    beforeEach(async () => {
      oidcStorage.getSessionToken.mockReturnValue('jwt-token');
      await waitFor(
        execute(link, {
          query,
          context: {
            target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
          },
        })
      );
    });

    it('should set headers matching snapshot', () => {
      expect(context).toMatchInlineSnapshot(`
        {
          "credentials": "include",
          "headers": {
            "Accept": "application/json",
            "Authorization": "Bearer jwt-token",
            "X-Correlation-Id": "test-correlation-id",
            "X-Graphql-Operation-Name": "Test",
            "X-Graphql-Target": "mc",
            "X-Project-Key": "project-1",
            "X-Team-Id": "team-1",
            "X-User-Agent": "user-agent",
          },
        }
      `);
    });

    it('should set `Authorization`-Header', () => {
      expect(context.headers).toEqual(
        expect.objectContaining({
          Authorization: 'Bearer jwt-token',
        })
      );
    });
  });

  describe('with empty header values', () => {
    const teamId = null;
    const projectKey = undefined;

    beforeEach(async () => {
      selectProjectKeyFromUrl.mockClear();
      selectTeamIdFromLocalStorage.mockClear();
      selectProjectKeyFromUrl.mockImplementation(() => null);
      selectTeamIdFromLocalStorage.mockImplementation(() => null);

      await waitFor(
        execute(link, {
          query,
          context: {
            target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
            teamId,
            projectKey,
          },
        })
      );
    });

    it('should remove the empty header values', () => {
      expect(context.headers).not.toHaveProperty('X-Team-Id');
      expect(context.headers).not.toHaveProperty('X-Project-Key');
      expect(context.headers).toHaveProperty('X-Correlation-Id');
    });
  });
});

describe('handling response side effects', () => {
  beforeEach(async () => {
    const httpLink = createHttpLink({
      uri: `http://ct-test.com/graphql`,
      headers: {
        accept: 'application/json',
      },
      fetch,
    });
    mockServer.use(
      graphql.query('Test', (req, res, ctx) =>
        res.once(
          ctx.set('x-refreshed-session-token', 'jwt-token'),
          ctx.data({ message: 'ok' })
        )
      )
    );
    const link = ApolloLink.from([headerLink, httpLink]);

    await waitFor(
      execute(link, {
        query,
        context: {
          target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
        },
      })
    );
  });

  it('set new token into storage', () => {
    expect(oidcStorage.setActiveSession).toHaveBeenCalledWith('jwt-token');
  });
});
