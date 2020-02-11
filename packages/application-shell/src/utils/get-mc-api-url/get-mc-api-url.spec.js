import getMcApiUrl from './get-mc-api-url';

describe('getMcApiUrl', () => {
  describe('when application is configured not to run behind proxy', () => {
    it('should return the configured `mcApiUrl`', () => {
      const actualWindow = {
        app: {
          mcApiUrl: 'https://mc-api.commercetools.co',
        },
      };

      expect(getMcApiUrl(actualWindow)).toEqual(actualWindow.app.mcApiUrl);
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

      expect(getMcApiUrl(actualWindow)).toEqual(
        'https://mc-api.europe-west1.gcp.commercetools.com'
      );
    });

    describe('when inferring of `mcApiUrl` from origin is disabled', () => {
      it('should return the configured `mcApiUrl`', () => {
        const actualWindow = {
          app: {
            mcApiUrl: 'https://mc-api.commercetools.co',
            servedByProxy: 'true',
            disableInferringOfMcApiUrlOnProduction: 'true',
          },
          origin: 'https://mc.europe-west1.gcp.commercetools.com',
        };

        expect(getMcApiUrl(actualWindow)).toEqual(actualWindow.app.mcApiUrl);
      });
    });
  });
});
