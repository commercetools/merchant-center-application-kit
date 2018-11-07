import selectUserId from './select-user-id';

const cache = {
  readQuery: jest.fn(),
};

describe('selectUserId', () => {
  describe('when `readQuery` throws', () => {
    beforeEach(() => {
      cache.readQuery.mockReturnValueOnce(new Error('Test Error'));
    });
    it('should return `null`', () => {
      expect(selectUserId(cache)).toBeNull();
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
        cache.readQuery.mockReturnValueOnce(queryResult);
      });
      it('should return the `id`', () => {
        expect(selectUserId(cache)).toEqual(queryResult.user.id);
      });
    });

    describe('without `user`', () => {
      beforeEach(() => {
        cache.readQuery.mockReturnValueOnce({});
      });
      it('should return `null`', () => {
        expect(selectUserId(cache)).toBeNull();
      });
    });
  });
});
