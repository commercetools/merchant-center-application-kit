import { getConfiguredAudience } from './auth';

describe('getConfiguredAudience', () => {
  describe('when audience policy is "request-url-full-path"', () => {
    describe.each`
      audienceOriginUrl         | requestPath               | expectedAudienceUrl
      ${'https://example.com'}  | ${'/'}                    | ${'https://example.com'}
      ${'https://example.com'}  | ${'/hello/world'}         | ${'https://example.com/hello/world'}
      ${'https://example.com/'} | ${'/'}                    | ${'https://example.com'}
      ${'https://example.com/'} | ${'/hello/world'}         | ${'https://example.com/hello/world'}
      ${'https://example.com'}  | ${'/hello/world?foo=bar'} | ${'https://example.com/hello/world'}
    `(
      'with audience "$audienceOriginUrl" and request path "$requestPath"',
      ({ audienceOriginUrl, requestPath, expectedAudienceUrl }) => {
        it(`should construct audience url as "${expectedAudienceUrl}"`, () => {
          expect(
            getConfiguredAudience({ audience: audienceOriginUrl }, requestPath)
          ).toEqual(expectedAudienceUrl);
        });
      }
    );
  });

  describe('when audience policy is "request-url-origin"', () => {
    describe.each`
      audienceOriginUrl         | requestPath               | expectedAudienceUrl
      ${'https://example.com'}  | ${'/'}                    | ${'https://example.com'}
      ${'https://example.com'}  | ${'/hello/world'}         | ${'https://example.com'}
      ${'https://example.com/'} | ${'/'}                    | ${'https://example.com'}
      ${'https://example.com/'} | ${'/hello/world'}         | ${'https://example.com'}
      ${'https://example.com'}  | ${'/hello/world?foo=bar'} | ${'https://example.com'}
    `(
      'with audience "$audienceOriginUrl" and request path "$requestPath"',
      ({ audienceOriginUrl, requestPath, expectedAudienceUrl }) => {
        it(`should construct audience url as "${expectedAudienceUrl}"`, () => {
          expect(
            getConfiguredAudience(
              {
                audience: audienceOriginUrl,
                audiencePolicy: 'forward-url-origin',
              },
              requestPath
            )
          ).toEqual(expectedAudienceUrl);
        });
      }
    );
  });
});
