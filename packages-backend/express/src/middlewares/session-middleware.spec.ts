import { rest } from 'msw';
import { setupServer } from 'msw/node';
import createSessionMiddleware from './session-middleware';
import * as fixtureJWTToken from './fixtures/jwt-token';
import { createSessionAuthVerifier } from '../auth';
import { CLOUD_IDENTIFIERS } from '../constants';

const mockServer = setupServer();

afterEach(() => {
  mockServer.resetHandlers();
});
beforeAll(() => mockServer.listen());
afterAll(() => mockServer.close());

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
      mockServer.use(
        rest.get(`${issuer}/.well-known/jwks.json`, (_req, res, ctx) =>
          res(ctx.json(fixtureJWTToken.jwksStore.toJWKS()))
        )
      );
    });
    it('should verify the token and attach the session info to the request', async () => {
      const sessionMiddleware = createSessionMiddleware({
        audience: 'http://test-server',
        issuer: cloudIdentifier,
      });
      const fakeRequest = {
        method: 'GET',
        headers: {
          authorization: `Bearer ${fixtureJWTToken.createToken({
            issuer,
            audience: 'http://test-server/foo/bar',
          })}`,
          'x-mc-api-cloud-identifier': cloudIdentifier,
          'x-mc-api-forward-to-version': 'v2',
        },
        originalUrl: '/foo/bar',
      };
      const fakeResponse = {};
      await new Promise<void>((resolve, reject) => {
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
          audience: 'http://test-server',
          issuer: 'https://mc-api.another-ct-test.com', // This value should not matter
          inferIssuer: true,
        });
        const fakeRequest = {
          method: 'GET',
          headers: {
            authorization: `Bearer ${fixtureJWTToken.createToken({
              issuer,
              audience: 'http://test-server/foo/bar',
            })}`,
            'x-mc-api-cloud-identifier': cloudIdentifier,
            'x-mc-api-forward-to-version': 'v2',
          },
          originalUrl: '/foo/bar',
        };
        const fakeResponse = {};
        await new Promise<void>((resolve, reject) => {
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

describe('when audience is missing', () => {
  it('should throw a validation error', () => {
    // @ts-ignore
    expect(() => createSessionMiddleware({})).toThrowError(
      'Missing required option "audience"'
    );
  });
});
describe('when issuer is missing', () => {
  it('should throw a validation error', () => {
    expect(() =>
      // @ts-ignore
      createSessionMiddleware({ audience: 'http://test-server' })
    ).toThrowError('Missing required option "issuer"');
  });
});
describe('when issuer is not a valid URL', () => {
  it('should throw a validation error', () => {
    expect(() =>
      createSessionMiddleware({
        audience: 'http://test-server',
        issuer: 'invalid url',
      })
    ).toThrowError('Invalid issuer URL');
  });
});
describe('when "X-MC-API-Cloud-Identifier" is missing', () => {
  it('should throw a validation error', async () => {
    const fakeRequest = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${fixtureJWTToken.createToken({
          issuer: CLOUD_IDENTIFIERS.GCP_EU,
          audience: 'http://test-server/foo/bar',
        })}`,
        'x-mc-api-forward-to-version': 'v2',
      },
      originalUrl: '/foo/bar',
    };
    const fakeResponse = {};
    const sessionAuthVerifier = createSessionAuthVerifier({
      audience: 'http://test-server',
      issuer: CLOUD_IDENTIFIERS.GCP_EU,
    });
    await expect(
      // @ts-ignore
      sessionAuthVerifier(fakeRequest, fakeResponse)
    ).rejects.toMatchObject({
      message: expect.stringContaining(
        'Missing "X-MC-API-Cloud-Identifier" header'
      ),
    });
  });
});
describe('when "X-MC-API-Forward-To-Version" is missing', () => {
  it('should throw a validation error', async () => {
    const fakeRequest = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${fixtureJWTToken.createToken({
          issuer: CLOUD_IDENTIFIERS.GCP_EU,
          audience: 'http://test-server/foo/bar',
        })}`,
        'x-mc-api-cloud-identifier': CLOUD_IDENTIFIERS.GCP_EU,
      },
      originalUrl: '/foo/bar',
    };
    const fakeResponse = {};
    const sessionAuthVerifier = createSessionAuthVerifier({
      audience: 'http://test-server',
      issuer: CLOUD_IDENTIFIERS.GCP_EU,
    });
    await expect(
      // @ts-ignore
      sessionAuthVerifier(fakeRequest, fakeResponse)
    ).rejects.toMatchObject({
      message: expect.stringContaining(
        'Missing "X-MC-API-Forward-To-Version" header'
      ),
    });
  });
});
