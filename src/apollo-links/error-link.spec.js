import { ApolloLink, execute, Observable } from 'apollo-link';
import gql from 'graphql-tag';
import waitFor from 'wait-for-observables';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import { createErrorLink } from './error-link';

const query = gql`
  {
    sample {
      id
    }
  }
`;

const createErrorLinkConfig = custom => ({
  history: { push: jest.fn() },
  storage: { get: jest.fn(() => 'true') },

  ...custom,
});

const unauthenticatedError = new Error('Unauthorized');
unauthenticatedError.statusCode = 401;

const badRequestError = new Error('Bad Request');
badRequestError.statusCode = 400;

describe('with unauthenticated error', () => {
  let errorLinkConfig;
  let terminatingLinkStub;
  let link;

  describe('when user is authenticated', () => {
    beforeEach(async () => {
      errorLinkConfig = createErrorLinkConfig();

      terminatingLinkStub = jest.fn(
        () => new Observable(o => o.error(unauthenticatedError))
      );

      link = ApolloLink.from([
        createErrorLink(errorLinkConfig),
        terminatingLinkStub,
      ]);

      await waitFor(execute(link, { query }));
    });

    it('should logout the user', () => {
      expect(errorLinkConfig.history.push).toHaveBeenCalled();
    });

    it('should redirect to the login page', () => {
      expect(errorLinkConfig.history.push).toHaveBeenCalledWith(
        `/logout?reason=${LOGOUT_REASONS.UNAUTHORIZED}`
      );
    });
  });

  describe('when user is not authenticated', () => {
    beforeEach(async () => {
      errorLinkConfig = createErrorLinkConfig({
        storage: { get: jest.fn(() => 'false') },
      });

      errorLinkConfig.storage.get.mockReturnValue(undefined);

      terminatingLinkStub = jest.fn(
        () => new Observable(o => o.error(unauthenticatedError))
      );

      link = ApolloLink.from([
        createErrorLink(errorLinkConfig),
        terminatingLinkStub,
      ]);

      await waitFor(execute(link, { query }));
    });

    it('should do nothing', () => {
      expect(errorLinkConfig.history.push).not.toHaveBeenCalled();
    });
  });
});

describe('with unhandled error', () => {
  let errorLinkConfig;
  let terminatingLinkStub;
  let link;

  beforeEach(async () => {
    errorLinkConfig = createErrorLinkConfig();

    terminatingLinkStub = jest.fn(
      () => new Observable(o => o.error(badRequestError))
    );

    link = ApolloLink.from([
      createErrorLink(errorLinkConfig),
      terminatingLinkStub,
    ]);

    await waitFor(execute(link, { query }));
  });

  it('should do nothing', () => {
    expect(errorLinkConfig.history.push).not.toHaveBeenCalled();
  });
});
