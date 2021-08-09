import createApolloClient from '../../configure-apollo';
import { setCachedApolloClient } from '../apollo-client-runtime-cache';
import selectUserId from './select-user-id';
import { FetchUserId } from './select-user-id.mc.graphql';

afterEach(() => {
  // Unset cached client
  setCachedApolloClient();
});

describe('selectUserId', () => {
  describe('when `readQuery` throws', () => {
    beforeEach(() => {
      console.error = jest.fn();
      const apolloClient = createApolloClient();
      apolloClient.writeQuery({
        query: FetchUserId,
        data: {
          // Omit the `id` field, which causes the readQuery to throw
          // an error.
          user: { language: 'en' },
        },
      });
      setCachedApolloClient(apolloClient);
    });
    it('should return `null`', () => {
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining(`Missing field 'id'`)
      );
      expect(selectUserId()).toBeNull();
    });
  });

  describe('when `readQuery` returns', () => {
    const queryResult = {
      user: {
        id: 'foo-user-id',
      },
    };

    describe('with `user`', () => {
      beforeEach(() => {
        const apolloClient = createApolloClient();
        apolloClient.writeQuery({
          query: FetchUserId,
          data: queryResult,
        });
        setCachedApolloClient(apolloClient);
      });
      it('should return the `id`', () => {
        expect(selectUserId()).toEqual(queryResult.user.id);
      });
    });

    describe('without `user`', () => {
      beforeEach(() => {
        const apolloClient = createApolloClient();
        apolloClient.writeQuery({
          query: FetchUserId,
          data: { user: null },
        });
        setCachedApolloClient(apolloClient);
      });
      it('should return `null`', () => {
        expect(selectUserId()).toBeNull();
      });
    });
  });
});
