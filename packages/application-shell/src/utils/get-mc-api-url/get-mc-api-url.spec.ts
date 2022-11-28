import getMcApiUrl from './get-mc-api-url';

describe.each`
  servedByProxy | origin                                                                                         | mcApiUrlFromConfig                                     | expectedMcApiUrl
  ${'false'}    | ${'http://localhost:3001'}                                                                     | ${'https://mc-api.europe-west1.gcp.commercetools.com'} | ${'https://mc-api.europe-west1.gcp.commercetools.com'}
  ${'false'}    | ${'https://mc.commercetools.com'}                                                              | ${'https://mc-api.commercetools.com'}                  | ${'https://mc-api.commercetools.com'}
  ${'false'}    | ${'https://mc.europe-west1.gcp.commercetools.com'}                                             | ${'https://mc-api.europe-west1.gcp.commercetools.com'} | ${'https://mc-api.europe-west1.gcp.commercetools.com'}
  ${'true'}     | ${'https://mc.europe-west1.gcp.commercetools.com'}                                             | ${'https://mc-api.europe-west1.gcp.commercetools.com'} | ${'https://mc-api.europe-west1.gcp.commercetools.com'}
  ${'true'}     | ${'https://mc.europe-west1.gcp.commercetools.com'}                                             | ${'https://mc-api.us-central1.gcp.commercetools.com'}  | ${'https://mc-api.europe-west1.gcp.commercetools.com'}
  ${'true'}     | ${'https://mc-12345.europe-west1.gcp.commercetools.com'}                                       | ${'https://mc-api.europe-west1.gcp.commercetools.com'} | ${'https://mc-api.europe-west1.gcp.commercetools.com'}
  ${'true'}     | ${'https://mc-12345.us-central1.gcp.commercetools.com'}                                        | ${'https://mc-api.europe-west1.gcp.commercetools.com'} | ${'https://mc-api.us-central1.gcp.commercetools.com'}
  ${'true'}     | ${'https://123.mc-preview.europe-west1.gcp.commercetools.com'}                                 | ${'https://mc-api.europe-west1.gcp.commercetools.com'} | ${'https://mc-api.europe-west1.gcp.commercetools.com'}
  ${'true'}     | ${'https://123.mc-preview.us-central1.gcp.commercetools.com'}                                  | ${'https://mc-api.europe-west1.gcp.commercetools.com'} | ${'https://mc-api.us-central1.gcp.commercetools.com'}
  ${'true'}     | ${'https://test.mc-preview.us-central1.gcp.commercetools.com'}                                 | ${'https://mc-api.europe-west1.gcp.commercetools.com'} | ${'https://mc-api.us-central1.gcp.commercetools.com'}
  ${'true'}     | ${'https://this-is-not-what-you-are-looking-for.mc-preview.us-central1.gcp.commercetools.com'} | ${'https://mc-api.europe-west1.gcp.commercetools.com'} | ${'https://mc-api.us-central1.gcp.commercetools.com'}
`(
  'when "servedByProxy" is "$servedByProxy" and origin is "$origin"',
  ({ servedByProxy, origin, mcApiUrlFromConfig, expectedMcApiUrl }) => {
    it(`should return the correct MC API URL "${expectedMcApiUrl}"`, () => {
      expect(
        getMcApiUrl(
          // @ts-ignore: other `window.app` property should be provided.
          {
            mcApiUrl: mcApiUrlFromConfig,
            servedByProxy,
          },
          origin
        )
      ).toEqual(expectedMcApiUrl);
    });
  }
);
