import { getConfiguredAudience } from './auth';

describe('getConfiguredAudience', () => {
  let url;
  let requestPath;
  describe('when there is no `requestPath`', () => {
    beforeEach(() => {
      url = 'https://example.com';
      requestPath = '/';
    });
    it('should return `url`', () => {
      expect(
        getConfiguredAudience(
          {
            audience: url,
          },
          requestPath
        )
      ).toEqual(url);
    });
  });
  describe('when there is a `requestPath`', () => {
    beforeEach(() => {
      url = 'https://example.com';
      requestPath = '/hello/world';
    });
    it('should return `url + requestPath`', () => {
      expect(
        getConfiguredAudience(
          {
            audience: url,
          },
          requestPath
        )
      ).toEqual('https://example.com/hello/world');
    });
  });
});
