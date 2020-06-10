import getMcApiUrl from './get-mc-api-url';

describe('getMcApiUrl', () => {
  describe('when application is configured to not run behind the proxy', () => {
    it('should return the configured `mcApiUrl`', () => {
      const environment = {
        mcApiUrl: 'https://mc-api.us-central1.gcp.commercetools.com',
      };

      expect(getMcApiUrl(environment)).toEqual(
        'https://mc-api.us-central1.gcp.commercetools.com'
      );
    });
  });

  describe('when application is configured to run behind the proxy', () => {
    it('should not return the configured `mcApiUrl` but the origin of the window', () => {
      const environment = {
        mcApiUrl: 'https://mc-api.commercetools.com',
        servedByProxy: true,
      };
      const partialWindow = {
        origin: 'https://mc.europe-west1.gcp.commercetools.com',
      };

      expect(getMcApiUrl(environment, partialWindow)).toEqual(
        'https://mc-api.europe-west1.gcp.commercetools.com'
      );
    });

    describe('when inferring of `mcApiUrl` from origin is disabled', () => {
      it('should return the configured `mcApiUrl`', () => {
        const environment = {
          mcApiUrl: 'https://mc-api.commercetools.com',
          servedByProxy: true,
          disableInferringOfMcApiUrlOnProduction: true,
        };
        const partialWindow = {
          origin: 'https://mc.europe-west1.gcp.commercetools.com',
        };

        expect(getMcApiUrl(environment, partialWindow)).toEqual(
          'https://mc-api.commercetools.com'
        );
      });
    });
  });
});
