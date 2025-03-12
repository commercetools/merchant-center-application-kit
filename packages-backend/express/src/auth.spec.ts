import {
  getConfiguredAudience,
  writeSessionContext,
  type TDecodedJWT,
} from './auth';
import type { TBaseRequest, TSession } from './types';

const testIssuer = 'http://mc-api.ct-test.com';

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
      ({
        audienceOriginUrl,
        requestPath,
        expectedAudienceUrl,
      }: {
        audienceOriginUrl: string;
        requestPath: string;
        expectedAudienceUrl: string;
      }) => {
        it(`should construct audience url as "${expectedAudienceUrl}"`, () => {
          expect(
            getConfiguredAudience(
              {
                audience: audienceOriginUrl,
                issuer: testIssuer,
              },
              requestPath
            )
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
      ({
        audienceOriginUrl,
        requestPath,
        expectedAudienceUrl,
      }: {
        audienceOriginUrl: string;
        requestPath: string;
        expectedAudienceUrl: string;
      }) => {
        it(`should construct audience url as "${expectedAudienceUrl}"`, () => {
          expect(
            getConfiguredAudience(
              {
                audience: audienceOriginUrl,
                audiencePolicy: 'forward-url-origin',
                issuer: testIssuer,
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
  describe.each`
    claimKey                                   | claimValue                          | expectedSessionPropertyKey
    ${`sub`}                                   | ${'user-id-1'}                      | ${'userId'}
    ${`${testIssuer}/claims/project_key`}      | ${'fake-project-key'}               | ${'projectKey'}
    ${`${testIssuer}/claims/user_permissions`} | ${['viewOrders', 'manageProducts']} | ${'userPermissions'}
  `(
    'decoding public claims',
    ({ claimKey, claimValue, expectedSessionPropertyKey }) => {
      it(`should write session property "${expectedSessionPropertyKey}" for the claim "${claimKey}"`, () => {
        const request: TBaseRequest & { session?: TSession } = {
          headers: {},
        };
        const verifiedToken: TDecodedJWT = {
          sub: 'id-123',
          iss: testIssuer,
          [claimKey]: claimValue,
        };

        writeSessionContext(request, verifiedToken);

        expect(request.session).toHaveProperty(
          expectedSessionPropertyKey,
          claimValue
        );
      });
    }
  );
});
