import { ApolloLink, execute, Observable, gql } from '@apollo/client';
import waitFor from 'wait-for-observables';
import history from '@commercetools-frontend/browser-history';
import {
  LOGOUT_REASONS,
  GRAPHQL_TARGETS,
} from '@commercetools-frontend/constants';
import errorLink from './error-link';

jest.mock('@commercetools-frontend/browser-history');

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

describe('with unauthenticated error', () => {
  let terminatingLinkStub;
  let link;

  describe('on network error', () => {
    beforeEach(async () => {
      history.push.mockClear();
      terminatingLinkStub = jest.fn(
        () => new Observable((o) => o.error(unauthenticatedError))
      );

      link = ApolloLink.from([errorLink, terminatingLinkStub]);

      await waitFor(execute(link, { query }));
    });

    it('should logout the user', () => {
      expect(history.push).toHaveBeenCalled();
    });

    it('should redirect to the login page', () => {
      expect(history.push).toHaveBeenCalledWith(
        `/logout?reason=${LOGOUT_REASONS.UNAUTHORIZED}`
      );
    });
  });

  describe('on graphql error', () => {
    let context;
    let resolvedResponse;
    const responses = {
      success: { data: { sample: { id: 'sample-id' } } },
      unauthenticatedWithExtensionCode: {
        data: null,
        errors: [
          {
            extensions: {
              code: 'UNAUTHENTICATED',
            },
          },
        ],
      },
      unauthenticatedWithStatusCode: {
        data: null,
        errors: [
          {
            message: 'invalid_token',
          },
        ],
      },
    };
    describe('when token retry is not skipped', () => {
      describe('when unauthorized via extension code', () => {
        beforeEach(async () => {
          const debugLink = new ApolloLink((operation, forward) => {
            context = operation.getContext();
            operation.setContext({
              headers: {
                'X-Graphql-Target': GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
              },
            });

            return forward(operation);
          });
          terminatingLinkStub = jest.fn();
          terminatingLinkStub.mockReturnValueOnce(
            Observable.of(responses.unauthenticatedWithExtensionCode)
          );
          terminatingLinkStub.mockReturnValueOnce(
            Observable.of(responses.success)
          );

          link = ApolloLink.from([errorLink, debugLink, terminatingLinkStub]);

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
              'X-Force-Token': 'true',
            })
          );
        });
        it('should eventually resolve with data', () => {
          const [{ values }] = resolvedResponse;
          expect(values).toEqual([responses.success]);
        });
      });
      describe('when unauthorized via message', () => {
        beforeEach(async () => {
          const debugLink = new ApolloLink((operation, forward) => {
            context = operation.getContext();
            operation.setContext({
              headers: {
                'X-Graphql-Target': GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
              },
            });

            return forward(operation);
          });
          terminatingLinkStub = jest.fn();
          terminatingLinkStub.mockReturnValueOnce(
            Observable.of(responses.unauthenticatedWithStatusCode)
          );
          terminatingLinkStub.mockReturnValueOnce(
            Observable.of(responses.success)
          );

          link = ApolloLink.from([errorLink, debugLink, terminatingLinkStub]);

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
              'X-Force-Token': 'true',
            })
          );
        });
        it('should eventually resolve with data', () => {
          const [{ values }] = resolvedResponse;
          expect(values).toEqual([responses.success]);
        });
      });
    });
    describe('when token retry is skipped', () => {
      beforeEach(async () => {
        const debugLink = new ApolloLink((operation, forward) => {
          operation.setContext({
            skipTokenRetry: true,
          });
          context = operation.getContext();
          return forward(operation);
        });
        terminatingLinkStub = jest.fn();
        terminatingLinkStub.mockReturnValueOnce(
          Observable.of(responses.unauthenticated)
        );
        terminatingLinkStub.mockReturnValueOnce(
          Observable.of(responses.success)
        );

        link = ApolloLink.from([errorLink, debugLink, terminatingLinkStub]);

        resolvedResponse = await waitFor(execute(link, { query }));
      });
      afterEach(() => {
        context = undefined;
      });

      it('should not retry the request', () => {
        expect(terminatingLinkStub).toHaveBeenCalledTimes(1);
      });
      it('should not set `x-force-token`-header on retry', () => {
        expect(context.headers).toEqual(
          expect.not.objectContaining({
            'X-Force-Token': 'true',
          })
        );
      });
    });
  });
});

describe('with unhandled error', () => {
  let terminatingLinkStub;
  let link;

  beforeEach(async () => {
    history.push.mockClear();
    terminatingLinkStub = jest.fn(
      () => new Observable((o) => o.error(badRequestError))
    );

    link = ApolloLink.from([errorLink, terminatingLinkStub]);

    await waitFor(execute(link, { query }));
  });

  it('should do nothing', () => {
    expect(history.push).not.toHaveBeenCalled();
  });
});
