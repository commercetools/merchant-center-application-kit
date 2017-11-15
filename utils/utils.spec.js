import { parseUri } from './utils';

describe('parseUri', () => {
  describe('when the URI contains no search', () => {
    let result;
    beforeEach(() => {
      result = parseUri('/project/products/new');
    });
    it('should extract the', () => {
      expect(result.pathname).toBe('/project/products/new');
    });
    it('should extract an empty search', () => {
      expect(result.search).toEqual({});
    });
  });
  describe('when the URI contains a search', () => {
    let result;
    beforeEach(() => {
      result = parseUri('/project/products/new?foo=true&bar=5');
    });
    it('should extract the', () => {
      expect(result.pathname).toBe('/project/products/new');
    });
    it('should extract the search', () => {
      expect(result.search).toEqual({
        foo: 'true',
        bar: '5',
      });
    });
  });
});
