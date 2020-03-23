import { ApolloLink, execute, Observable } from 'apollo-link';
import gql from 'graphql-tag';
import waitFor from 'wait-for-observables';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import history from '@commercetools-frontend/browser-history';
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
      unauthenticated: {
        data: null,
        errors: [
          {
            extensions: {
              code: 'UNAUTHENTICATED',
            },
          },
        ],
      },
    };
    beforeEach(async () => {
      const debugLink = new ApolloLink((operation, forward) => {
        context = operation.getContext();
        return forward(operation);
      });
      terminatingLinkStub = jest.fn();
      terminatingLinkStub.mockReturnValueOnce(
        Observable.of(responses.unauthenticated)
      );
      terminatingLinkStub.mockReturnValueOnce(Observable.of(responses.success));

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
          'X-Force-Token': true,
        })
      );
    });
    it('should eventually resolve with data', () => {
      const [{ values }] = resolvedResponse;
      expect(values).toEqual([responses.success]);
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
