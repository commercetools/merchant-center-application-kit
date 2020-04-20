import nock from 'nock';
import createSessionMiddleware from './session-middleware';
import * as fixtureJWTToken from './fixtures/jwt-token';

describe.each`
  cloudIdentifier                 | issuer
  ${'https://mc-api.ct-test.com'} | ${'https://mc-api.ct-test.com'}
  ${'gcp-au'}                     | ${'https://mc-api.australia-southeast1.gcp.commercetools.com'}
  ${'gcp-eu'}                     | ${'https://mc-api.europe-west1.gcp.commercetools.com'}
  ${'gcp-us'}                     | ${'https://mc-api.us-central1.gcp.commercetools.com'}
  ${'aws-fra'}                    | ${'https://mc-api.eu-central-1.aws.commercetools.com'}
  ${'aws-ohio'}                   | ${'https://mc-api.us-east-2.aws.commercetools.com'}
`(
  'when the middleware uses as "issuer": "$cloudIdentifier"',
  ({ cloudIdentifier, issuer }) => {
    beforeEach(() => {
      nock(issuer)
        .get('/.well-known/jwks.json')
        .reply(200, fixtureJWTToken.jwksStore.toJWKS());
    });
    it('should verify the token and attach the session info to the request', async () => {
      const sessionMiddleware = createSessionMiddleware({
        issuer: cloudIdentifier,
      });
      const fakeRequest = {
        method: 'GET',
        header: jest.fn((key) => {
          switch (key) {
            case 'x-mc-api-cloud-identifier':
              return cloudIdentifier;
            default:
              return undefined;
          }
        }),
        headers: {
          authorization: `Bearer ${fixtureJWTToken.createToken({
            issuer,
            audience: 'http://test-server/foo/bar',
          })}`,
        },
        hostname: 'http://test-server',
        originalUrl: '/foo/bar',
      };
      const fakeResponse = {};
      await new Promise((resolve, reject) => {
        // @ts-ignore
        sessionMiddleware(fakeRequest, fakeResponse, (error) => {
          if (error) reject(error);
          else resolve();
        });
      });

      expect(fakeRequest).toHaveProperty('session', {
        userId: 'user-id',
        projectKey: 'project-key',
      });
      expect(fakeRequest).not.toHaveProperty('decoded_token');
    });
    if (!cloudIdentifier.startsWith('http')) {
      it('should infer cloud identifier from custom HTTP header instead of given "mcApiUrl"', async () => {
        const sessionMiddleware = createSessionMiddleware({
          issuer: 'https://mc-api.another-ct-test.com', // This value should not matter
          inferIssuer: true,
        });
        const fakeRequest = {
          method: 'GET',
          header: jest.fn((key) => {
            switch (key) {
              case 'x-mc-api-cloud-identifier':
                return cloudIdentifier;
              default:
                return undefined;
            }
          }),
          headers: {
            authorization: `Bearer ${fixtureJWTToken.createToken({
              issuer,
              audience: 'http://test-server/foo/bar',
            })}`,
          },
          hostname: 'http://test-server',
          originalUrl: '/foo/bar',
        };
        const fakeResponse = {};
        await new Promise((resolve, reject) => {
          // @ts-ignore
          sessionMiddleware(fakeRequest, fakeResponse, (error) => {
            if (error) reject(error);
            else resolve();
          });
        });

        expect(fakeRequest).toHaveProperty('session', {
          userId: 'user-id',
          projectKey: 'project-key',
        });
        expect(fakeRequest).not.toHaveProperty('decoded_token');
      });
    }
  }
);

describe('when issuer is not a valid URL', () => {
  it('should throw a validation error', () => {
    expect(() =>
      createSessionMiddleware({
        issuer: 'invalid url',
      })
    ).toThrowError('Invalid issuer URL');
  });
});
