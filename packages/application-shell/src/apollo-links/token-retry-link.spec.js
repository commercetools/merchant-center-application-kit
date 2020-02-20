import { ApolloLink, execute, Observable } from 'apollo-link';
import gql from 'graphql-tag';
import waitFor from 'wait-for-observables';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import tokenRetryLink, {
  getDoesGraphQLTargetSupportTokenRetry,
} from './token-retry-link';

const query = gql`
  {
    sample {
      id
    }
  }
`;

const unauthenticatedError = new Error('Unauthorized');
unauthenticatedError.statusCode = 401;

const badRequestError = new Error('Bad Request');
badRequestError.statusCode = 400;

const responseStub = {
  data: {
    products: [],
  },
};

describe('tokenRetryLink', () => {
  let debugLink;
  let terminatingLinkStub;
  let link;
  let context;
  let resolvedResponse;

  describe('with unauthorized-error', () => {
    describe('with successful retry', () => {
      beforeEach(async () => {
        const headerLink = new ApolloLink((operation, forward) => {
          operation.setContext({
            headers: {
              'X-Graphql-Target': GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
            },
          });
          return forward(operation);
        });
        debugLink = new ApolloLink((operation, forward) => {
          operation.setContext(({ headers }) => ({
            ...headers,
            'X-Graphql-Target': GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
          }));
          context = operation.getContext();
          return forward(operation);
        });

        terminatingLinkStub = jest.fn();

        terminatingLinkStub.mockReturnValueOnce(
          new Observable(o => o.error(unauthenticatedError))
        );
        terminatingLinkStub.mockReturnValueOnce(Observable.of(responseStub));

        link = ApolloLink.from([
          headerLink,
          tokenRetryLink,
          debugLink,
          terminatingLinkStub,
        ]);

        resolvedResponse = await waitFor(execute(link, { query }));
      });

      afterEach(() => {
        context = undefined;
      });

      it('should retry the request', () => {
        expect(terminatingLinkStub).toHaveBeenCalledTimes(2);
      });

      it('should set `x-force-token`-header on retry', () => {
        expect(context.headers).toEqual(
          expect.objectContaining({
            'X-Force-Token': true,
          })
        );
      });

      it('should eventually resolve with `responseStub`', () => {
        const [{ values }] = resolvedResponse;

        expect(values).toEqual([responseStub]);
      });
    });

    describe('with unsuccessful retry', () => {
      beforeEach(async () => {
        const headerLink = new ApolloLink((operation, forward) => {
          operation.setContext({
            headers: {
              'X-Graphql-Target': GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
            },
          });
          return forward(operation);
        });
        debugLink = new ApolloLink((operation, forward) => {
          context = operation.getContext();

          return forward(operation);
        });

        terminatingLinkStub = jest.fn(
          () => new Observable(o => o.error(unauthenticatedError))
        );

        link = ApolloLink.from([
          headerLink,
          tokenRetryLink,
          debugLink,
          terminatingLinkStub,
        ]);

        resolvedResponse = await waitFor(execute(link, { query }));
      });

      afterEach(() => {
        context = undefined;
      });

      it('should retry the request', () => {
        expect(terminatingLinkStub).toHaveBeenCalledTimes(2);
      });

      it('should set `x-force-token`-header on retry', () => {
        expect(context.headers).toEqual(
          expect.objectContaining({
            'X-Force-Token': true,
          })
        );
      });

      it('should propagate `unauthenticatedError`', () => {
        const [{ error }] = resolvedResponse;

        expect(error).toEqual(unauthenticatedError);
      });
    });
  });

  describe('with unrelated error', () => {
    beforeEach(async () => {
      debugLink = new ApolloLink((operation, forward) => {
        context = operation.getContext();

        return forward(operation);
      });

      terminatingLinkStub = jest.fn(
        () => new Observable(o => o.error(badRequestError))
      );

      link = ApolloLink.from([tokenRetryLink, debugLink, terminatingLinkStub]);

      resolvedResponse = await waitFor(execute(link, { query }));
    });

    afterEach(() => {
      context = undefined;
    });

    it('should not retry the request', () => {
      expect(terminatingLinkStub).toHaveBeenCalledTimes(1);
    });

    it('should not set `x-force-token`-header', () => {
      expect(context.headers).not.toEqual(
        expect.objectContaining({
          'X-Force-Token': true,
        })
      );
    });
  });
});

describe('supported GraphQL targets', () => {
  it('should support the `ctp` GraphQL target', () => {
    expect(
      getDoesGraphQLTargetSupportTokenRetry({
        'X-Graphql-Target': GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      })
    ).toBe(true);
  });

  it('should support the `administration` GraphQL target', () => {
    expect(
      getDoesGraphQLTargetSupportTokenRetry({
        'X-Graphql-Target': GRAPHQL_TARGETS.ADMINISTRATION_SERVICE,
      })
    ).toBe(true);
  });

  it('should not support the `dashboard service` GraphQL target', () => {
    expect(
      getDoesGraphQLTargetSupportTokenRetry({
        'X-Graphql-Target': GRAPHQL_TARGETS.DASHBOARD_SERVICE,
      })
    ).toBe(false);
  });

  it('should not support the `settings service` GraphQL target', () => {
    expect(
      getDoesGraphQLTargetSupportTokenRetry({
        'X-Graphql-Target': GRAPHQL_TARGETS.SETTINGS_SERVICE,
      })
    ).toBe(true);
  });
});
