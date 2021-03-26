import { getConfiguredAudience } from './auth';

describe('getConfiguredAudience', () => {
  let url;
  let requestPath;
  let search;
  describe('when there is no `requestPath`', () => {
    describe('when there is no `search`', () => {
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
    describe('when there is `search`', () => {
      beforeEach(() => {
        search = '?hello=world';
        url = `https://example.com${search}`;
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
    describe('when there is a `search`', () => {
      beforeEach(() => {
        search = '?hello=world';
        // another-defined-path will be ignored
        url = `https://example.com/another-defined-path${search}`;
        requestPath = '/hello/world';
      });
      it('should rturn `url + requestPath + search`', () => {
        expect(
          getConfiguredAudience(
            {
              audience: url,
            },
            requestPath
          )
        ).toEqual(`https://example.com${requestPath}${search}`);
      });
    });
  });
});
