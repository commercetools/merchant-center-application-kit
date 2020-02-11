import { decode } from 'qss';
import { parseUri, getMcApiUrl, ApplicationWindow } from './utils';

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

describe('getMcApiUrl', () => {
  describe('when application is configured not to run behind proxy', () => {
    it('should return the configured `mcApiUrl`', () => {
      const actualWindow = {
        app: {
          mcApiUrl: 'https://mc-api.commercetools.co',
        },
      };

      expect(getMcApiUrl(actualWindow as ApplicationWindow)).toEqual(
        actualWindow.app.mcApiUrl
      );
    });
  });

  describe('when application is configured to run behind proxy', () => {
    it('should not return the configured `mcApiUrl` but the origin of the window', () => {
      const actualWindow = {
        app: {
          mcApiUrl: 'https://mc-api.commercetools.co',
          servedByProxy: 'true',
        },
        origin: 'https://mc.europe-west1.gcp.commercetools.com',
      };

      expect(getMcApiUrl(actualWindow as ApplicationWindow)).toEqual(
        'https://mc-api.europe-west1.gcp.commercetools.com'
      );
    });

    describe('when inferring of `mcApiUrl` from origin is disabled', () => {
      it('should return the configured `mcApiUrl`', () => {
        const actualWindow = {
          app: {
            mcApiUrl: 'https://mc-api.commercetools.co',
            servedByProxy: 'true',
            skipInferringOfApiUrlOnProduction: 'true',
          },
          origin: 'https://mc.europe-west1.gcp.commercetools.com',
        };

        expect(getMcApiUrl(actualWindow)).toEqual(actualWindow.app.mcApiUrl);
      });
    });
  });
});
