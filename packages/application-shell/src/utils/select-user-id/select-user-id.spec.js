import apolloClient from '../../configure-apollo';
import selectUserId from './select-user-id';

jest.mock('../../configure-apollo', () => ({
  readQuery: jest.fn(),
}));

describe('selectUserId', () => {
  describe('when `readQuery` throws', () => {
    beforeEach(() => {
      apolloClient.readQuery.mockReturnValueOnce(new Error('Test Error'));
    });
    it('should return `null`', () => {
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
        apolloClient.readQuery.mockReturnValueOnce(queryResult);
      });
      it('should return the `id`', () => {
        expect(selectUserId()).toEqual(queryResult.user.id);
      });
    });

    describe('without `user`', () => {
      beforeEach(() => {
        apolloClient.readQuery.mockReturnValueOnce({});
      });
      it('should return `null`', () => {
        expect(selectUserId()).toBeNull();
      });
    });
  });
});
