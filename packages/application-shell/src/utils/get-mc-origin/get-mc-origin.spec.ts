import getMcOrigin from './get-mc-origin';

describe.each`
  mcApiUrl                                               | mcUrl                                                   | realMcUrl
  ${'https://mc-api.europe-west1.gcp.commercetools.com'} | ${'https://mc.europe-west1.gcp.commercetools.com'}      | ${'https://mc.europe-west1.gcp.commercetools.com'}
  ${'https://mc-api.europe-west1.gcp.commercetools.com'} | ${'https://mc-1234.europe-west1.gcp.commercetools.com'} | ${'https://mc-1234.europe-west1.gcp.commercetools.com'}
  ${'https://mc-api.europe-west1.gcp.commercetools.com'} | ${'https://avengers.app'}                               | ${'https://mc.europe-west1.gcp.commercetools.com'}
`('Get real MC origin if URL is $mcUrl', ({ mcApiUrl, mcUrl, realMcUrl }) => {
  it(`should return real MC URL ${realMcUrl}`, () => {
    expect(
      getMcOrigin(
        mcApiUrl,
        // @ts-ignore: fake `window`-like object
        { location: new URL(mcUrl) }
      )
    ).toBe(realMcUrl);
  });
});
