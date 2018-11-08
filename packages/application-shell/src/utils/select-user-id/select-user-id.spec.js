import selectUserId from './select-user-id';

const apolloCache = {
  readQuery: jest.fn(),
};

describe('selectUserId', () => {
  describe('when `readQuery` throws', () => {
    beforeEach(() => {
      apolloCache.readQuery.mockReturnValueOnce(new Error('Test Error'));
    });
    it('should return `null`', () => {
      expect(selectUserId({ apolloCache })).toBeNull();
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
        apolloCache.readQuery.mockReturnValueOnce(queryResult);
      });
      it('should return the `id`', () => {
        expect(selectUserId({ apolloCache })).toEqual(queryResult.user.id);
      });
    });

    describe('without `user`', () => {
      beforeEach(() => {
        apolloCache.readQuery.mockReturnValueOnce({});
      });
      it('should return `null`', () => {
        expect(selectUserId({ apolloCache })).toBeNull();
      });
    });
  });
});
