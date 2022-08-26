import { getConfiguredAudience, writeSessionContext } from './auth';

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

describe('writeSessionContext', () => {
  const mockIssuer = 'https://mc-api.nowhere.com';

  it('should not include anything in request session if no "decoded_token" exists in the request', () => {
    const request = {};

    writeSessionContext(request);

    expect(request).not.toHaveProperty('session');
  });

  it.each`
    publicClaims | sessionProperties
    ${{
  [`${mockIssuer}/claims/project_key`]: 'fake-project-key',
}} | ${['projectKey']}
    ${{
  [`${mockIssuer}/claims/project_key`]: 'fake-project-key',
  [`${mockIssuer}/claims/user_permissions`]: ['viewOrders', 'manageProducts'],
}} | ${['projectKey', 'userPermissions']}
  `(
    'should write session data in the request with new a property for every public claim',
    ({ publicClaims, sessionProperties }) => {
      const mockDecodedToken = {
        iss: mockIssuer,
        sub: 'user-id-1',
        ...publicClaims,
      };
      const request = {
        decoded_token: mockDecodedToken,
      };

      writeSessionContext(request);

      expect(request.session).toHaveProperty('userId', mockDecodedToken.sub);
      Object.values(publicClaims).forEach((claimValue, index) => {
        expect(request.session).toHaveProperty(
          sessionProperties[index],
          claimValue
        );
      });
      expect(request).not.toHaveProperty('decoded_token');
    }
  );
});
