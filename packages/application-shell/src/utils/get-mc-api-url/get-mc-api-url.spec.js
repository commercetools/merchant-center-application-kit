import getMcApiUrl from './get-mc-api-url';

describe('getMcApiUrl', () => {
  describe('when application is configured not to run behind proxy', () => {
    describe('when `mcApiurl` is defined on application environment', () => {
      it('should return the configured `mcApiUrl`', () => {
        const applicationEnvironment = {
          mcApiUrl: 'mc.commercetools.co',
        };

        expect(getMcApiUrl(applicationEnvironment)).toEqual(
          applicationEnvironment.mcApiUrl
        );
      });
    });
  });

  describe('when application is configured to run behind proxy', () => {
    beforeEach(() => {
      global.window.origin = 'https://mc.europe-west1.gcp.commercetools.com';
    });

    describe('when `mcApiurl` is defined on application environment', () => {
      it('should not return the configured `mcApiUrl` but the origin of the window', () => {
        const applicationEnvironment = {
          mcApiUrl: 'mc.commercetools.co',
          servedByProxy: true,
        };

        expect(getMcApiUrl(applicationEnvironment)).toEqual(
          applicationEnvironment.mcApiUrl
        );
      });
    });

    describe('when `mcApiurl` is not defined on application environment', () => {
      it('should not return an api url based on the origin of the window', () => {
        const applicationEnvironment = {
          servedByProxy: true,
        };

        expect(getMcApiUrl(applicationEnvironment)).toEqual(
          'https://mc-api.europe-west1.gcp.commercetools.com'
        );
      });
    });
  });
});
