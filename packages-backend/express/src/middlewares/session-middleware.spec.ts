import { rest } from 'msw';
import type { Handler } from 'express';
import { setupServer } from 'msw/node';
import { TBaseRequest } from '../types';
import * as fixtureJWTToken from './fixtures/jwt-token';
import createSessionMiddleware from './session-middleware';

interface TMockAWSLambdaRequestV2 extends TBaseRequest {
  rawPath: string;
  rawQueryString?: string;
}

const mockServer = setupServer();

function waitForSessionMiddleware(
  middleware: Handler,
  request: unknown,
  response: unknown
) {
  return new Promise<void>((resolve, reject) => {
    // @ts-ignore
    middleware(request, response, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

afterEach(() => {
  mockServer.resetHandlers();
});
beforeAll(async () => {
  await fixtureJWTToken.initialize();
  mockServer.listen({
    onUnhandledRequest: 'error',
  });
});
afterAll(() => mockServer.close());

describe.each`
  cloudIdentifier                 | issuer
  ${'https://mc-api.ct-test.com'} | ${'https://mc-api.ct-test.com'}
  ${'gcp-au'}                     | ${'https://mc-api.australia-southeast1.gcp.commercetools.com'}
  ${'gcp-eu'}                     | ${'https://mc-api.europe-west1.gcp.commercetools.com'}
  ${'gcp-us'}                     | ${'https://mc-api.us-central1.gcp.commercetools.com'}
  ${'aws-fra'}                    | ${'https://mc-api.eu-central-1.aws.commercetools.com'}
  ${'aws-ohio'}                   | ${'https://mc-api.us-east-2.aws.commercetools.com'}
  ${'aws-cn'}                     | ${'https://mc-api.cn-northwest-1.aws.commercetools.cn'}
`(
  'when the middleware uses as "issuer": "$cloudIdentifier"',
  ({ cloudIdentifier, issuer }) => {
    beforeEach(() => {
      mockServer.use(
        rest.get(`${issuer}/.well-known/jwks.json`, (_req, res, ctx) =>
          res(ctx.json(fixtureJWTToken.jwksStore))
        )
      );
    });

    async function setupTest(options?: {
      middlewareOptions?: Record<string, unknown>;
      requestOptions?: Record<string, unknown>;
    }) {
      const sessionMiddleware = createSessionMiddleware({
        audience: 'http://test-server',
        issuer: cloudIdentifier,
        ...options?.middlewareOptions,
      });
      const token = await fixtureJWTToken.createToken({
        issuer,
        audience: 'http://test-server/foo/bar',
      });
      const fakeRequest = {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
          // The following headers are validated as they are expected to be present
          // in the incoming request.
          // To ensure we can correctly read the header values no matter if the
          // header key is lowercase or not, we test both headers variations:
          // * one with upper/camel case key
          // * one with lowercase key
          'X-MC-API-Cloud-Identifier': cloudIdentifier,
          'x-mc-api-forward-to-version': 'v2',
        },
        originalUrl: '/foo/bar',
        ...options?.requestOptions,
      };
      const fakeResponse = {};

      return { sessionMiddleware, fakeRequest, fakeResponse };
    }

    it('should verify the token and attach the session info to the request', async () => {
      const { sessionMiddleware, fakeRequest, fakeResponse } =
        await setupTest();

      await waitForSessionMiddleware(
        sessionMiddleware,
        fakeRequest,
        fakeResponse
      );

      expect(fakeRequest).toHaveProperty('session', {
        userId: 'user-id',
        projectKey: 'project-key',
      });
      expect(fakeRequest).not.toHaveProperty('decoded_token');
    });

    it('should resolve the original url externally when a resolver is provided (using lambda v2)', async () => {
      const { sessionMiddleware, fakeRequest, fakeResponse } = await setupTest({
        middlewareOptions: {
          getRequestUrl: (request: TMockAWSLambdaRequestV2) => {
            return `${request.rawPath}${
              request.rawQueryString ? '?' + request.rawQueryString : ''
            }`;
          },
        },
        requestOptions: {
          originalUrl: undefined,
          rawPath: '/foo/bar',
          rawQueryString: '?param1=a&param2=b',
        },
      });

      await waitForSessionMiddleware(
        sessionMiddleware,
        fakeRequest,
        fakeResponse
      );

      expect(fakeRequest).toHaveProperty('session', {
        userId: 'user-id',
        projectKey: 'project-key',
      });
      expect(fakeRequest).not.toHaveProperty('decoded_token');
    });

    it('should fail if incoming request does not contain expected URL params and no urlProvider is provided', async () => {
      const { sessionMiddleware, fakeRequest, fakeResponse } = await setupTest({
        requestOptions: {
          originalUrl: undefined,
          rawPath: '/foo/bar',
          rawQueryString: '?param1=a&param2=b',
        },
      });

      await expect(
        waitForSessionMiddleware(sessionMiddleware, fakeRequest, fakeResponse)
      ).rejects.toMatchObject({
        message: expect.stringContaining(
          'Invalid request URI path "undefined".'
        ),
      });
    });

    it('should fail if the resolved request URI does not have a leading "/"', async () => {
      const { sessionMiddleware, fakeRequest, fakeResponse } = await setupTest({
        middlewareOptions: {
          getRequestUrl: () => `foo/bar`, // <-- missing leading "/"
        },
      });

      await expect(
        waitForSessionMiddleware(sessionMiddleware, fakeRequest, fakeResponse)
      ).rejects.toMatchObject({
        message: expect.stringContaining('Invalid request URI path "foo/bar".'),
      });
    });

    if (!cloudIdentifier.startsWith('http')) {
      it('should infer cloud identifier from custom HTTP header instead of given "mcApiUrl"', async () => {
        const { sessionMiddleware, fakeRequest, fakeResponse } =
          await setupTest({
            middlewareOptions: {
              issuer: 'https://mc-api.another-ct-test.com', // This value should not matter
              inferIssuer: true,
            },
          });

        await waitForSessionMiddleware(
          sessionMiddleware,
          fakeRequest,
          fakeResponse
        );

        expect(fakeRequest).toHaveProperty('session', {
          userId: 'user-id',
          projectKey: 'project-key',
        });
        expect(fakeRequest).not.toHaveProperty('decoded_token');
      });
    }
  }
);

// describe('when audience is missing', () => {
//   it('should throw a validation error', () => {
//     // @ts-ignore
//     expect(() => createSessionMiddleware({})).toThrow(
//       'Missing required option "audience"'
//     );
//   });
// });
// describe('when issuer is missing', () => {
//   it('should throw a validation error', () => {
//     expect(() =>
//       // @ts-ignore
//       createSessionMiddleware({ audience: 'http://test-server' })
//     ).toThrow('Missing required option "issuer"');
//   });
// });
// describe('when issuer is not a valid URL', () => {
//   it('should throw a validation error', () => {
//     expect(() =>
//       createSessionMiddleware({
//         audience: 'http://test-server',
//         issuer: 'invalid url',
//       })
//     ).toThrow('Invalid issuer URL');
//   });
// });
// describe('when "X-MC-API-Cloud-Identifier" is missing', () => {
//   it('should throw a validation error', async () => {
//     const token = await fixtureJWTToken.createToken({
//       issuer: CLOUD_IDENTIFIERS.GCP_EU,
//       audience: 'http://test-server/foo/bar',
//     });
//     const fakeRequest = {
//       method: 'GET',
//       headers: {
//         authorization: `Bearer ${token}`,
//         'x-mc-api-forward-to-version': 'v2',
//       },
//       originalUrl: '/foo/bar',
//     };
//     const fakeResponse = {};
//     const sessionAuthVerifier = createSessionAuthVerifier({
//       audience: 'http://test-server',
//       issuer: CLOUD_IDENTIFIERS.GCP_EU,
//     });
//     await expect(
//       // @ts-ignore
//       sessionAuthVerifier(fakeRequest, fakeResponse)
//     ).rejects.toMatchObject({
//       message: expect.stringContaining(
//         'Missing "X-MC-API-Cloud-Identifier" header'
//       ),
//     });
//   });
// });
// describe('when "X-MC-API-Forward-To-Version" is missing', () => {
//   it('should throw a validation error', async () => {
//     const token = await fixtureJWTToken.createToken({
//       issuer: CLOUD_IDENTIFIERS.GCP_EU,
//       audience: 'http://test-server/foo/bar',
//     });
//     const fakeRequest = {
//       method: 'GET',
//       headers: {
//         authorization: `Bearer ${token}`,
//         'x-mc-api-cloud-identifier': CLOUD_IDENTIFIERS.GCP_EU,
//       },
//       originalUrl: '/foo/bar',
//     };
//     const fakeResponse = {};
//     const sessionAuthVerifier = createSessionAuthVerifier({
//       audience: 'http://test-server',
//       issuer: CLOUD_IDENTIFIERS.GCP_EU,
//     });
//     await expect(
//       // @ts-ignore
//       sessionAuthVerifier(fakeRequest, fakeResponse)
//     ).rejects.toMatchObject({
//       message: expect.stringContaining(
//         'Missing "X-MC-API-Forward-To-Version" header'
//       ),
//     });
//   });
// });
