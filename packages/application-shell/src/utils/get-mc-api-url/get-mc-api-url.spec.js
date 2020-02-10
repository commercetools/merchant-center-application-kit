import getMcApiUrl from './get-mc-api-url';

describe('getMcApiUrl', () => {
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
