import getMcApiUrl from './get-mc-api-url';

describe('getMcApiUrl', () => {
  describe('when application is configured to not run behind the proxy', () => {
    it('should return the configured `mcApiUrl`', () => {
      const actualWindow = {
        app: {
          mcApiUrl: 'https://mc-api.us-central1.gcp.commercetools.com',
        },
      };

      expect(getMcApiUrl(actualWindow)).toEqual(
        'https://mc-api.us-central1.gcp.commercetools.com'
      );
    });
  });

  describe('when application is configured to run behind the proxy', () => {
    it('should not return the configured `mcApiUrl` but the origin of the window', () => {
      const actualWindow = {
        app: {
          mcApiUrl: 'https://mc-api.commercetools.com',
          servedByProxy: 'true',
        },
        origin: 'https://mc.europe-west1.gcp.commercetools.com',
      };

      expect(getMcApiUrl(actualWindow)).toEqual(
        'https://mc-api.europe-west1.gcp.commercetools.com'
      );
    });
  });
});
