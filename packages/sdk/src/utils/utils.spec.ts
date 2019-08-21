import { decode } from 'qss';
import { parseUri } from './utils';

type Result = { pathname: string; search: ReturnType<typeof decode> };

describe('parseUri', () => {
  let result: Result;
  describe('when the URI contains no search', () => {
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
    beforeEach(() => {
      result = parseUri('/project/products/new?foo=true&bar=5');
    });
    it('should extract the pathname', () => {
      expect(result.pathname).toBe('/project/products/new');
    });
    it('should extract the search', () => {
      expect(result.search).toEqual({
        foo: true,
        bar: 5,
      });
    });
  });
});
