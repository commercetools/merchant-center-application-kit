import type { ServerResponse, IncomingMessage } from 'http';
import type { TSessionMiddlewareOptions, TSession } from './types';

import jwksRsa from 'jwks-rsa';
import expressJwtMiddleware from 'express-jwt';
import {
  CLOUD_IDENTIFIERS,
  MC_API_URLS,
  MC_API_PROXY_HEADERS,
} from './constants';
import { getFirstOrThrow } from './utils';

type TDecodedJWT = {
  sub: string;
  iss: string;
  [property: string]: string;
};

const decodedTokenKey = 'decoded_token';
// Assign a session object to the request object.
const writeSessionContext = <Request extends IncomingMessage>(
  request: Request & { decoded_token?: TDecodedJWT; session?: TSession }
) => {
  const decodedToken = request[decodedTokenKey];

  if (decodedToken) {
    const publicClaimForProjectKey = `${decodedToken.iss}/claims/project_key`;

    request.session = {
      userId: decodedToken.sub,
      projectKey: decodedToken[publicClaimForProjectKey],
    };
  }

  // Remove the field used by the JWT middleware.
  delete request.decoded_token;
};

// Given a cloud identifier, try to map it to one of the supported
// environments and return the MC API URL for that environment.
// The URL points to the new hostnames.
// https://docs.commercetools.com/custom-applications/main-concepts/api-gateway#hostnames
const mapCloudIdentifierToIssuer = (
  issuer: TSessionMiddlewareOptions['issuer']
): string | undefined => {
  switch (issuer) {
    case CLOUD_IDENTIFIERS.GCP_AU:
      return MC_API_URLS.GCP_AU;
    case CLOUD_IDENTIFIERS.GCP_EU:
      return MC_API_URLS.GCP_EU;
    case CLOUD_IDENTIFIERS.GCP_US:
      return MC_API_URLS.GCP_US;
    case CLOUD_IDENTIFIERS.AWS_FRA:
      return MC_API_URLS.AWS_FRA;
    case CLOUD_IDENTIFIERS.AWS_OHIO:
      return MC_API_URLS.AWS_OHIO;
    default:
      return undefined;
  }
};
// Given a cloud identifier, try to map it to a legacy hostname.
// This is for backwards compatibility.
// https://docs.commercetools.com/custom-applications/main-concepts/api-gateway#legacy-hostnames
const mapToLegacyIssuer = (cloudIdentifier: string): string | undefined => {
  switch (cloudIdentifier) {
    case CLOUD_IDENTIFIERS.GCP_EU:
      return 'https://mc-api.commercetools.com';
    case CLOUD_IDENTIFIERS.GCP_US:
      return 'https://mc-api.commercetools.co';
    default:
      return undefined;
  }
};
// Verifies that the issuer is a valid URL.
const throwIfIssuerIsNotAValidUrl = (issuer: string) => {
  try {
    new URL(issuer);
  } catch (error) {
    throw new Error(
      `Invalid issuer URL "${issuer}". Expected a valid URL to the Merchant Center API Gateway, or a cloud identifier to one of the available cloud regions. See https://docs.commercetools.com/custom-applications/main-concepts/api-gateway#hostnames.`
    );
  }
};
// Validates required option values.
const validateRequiredValues = (options: TSessionMiddlewareOptions) => {
  if (!options.audience) {
    throw new Error(`Missing required option "audience"`);
  }
  if (!options.issuer) {
    throw new Error(`Missing required option "issuer"`);
  }
};
// Attempt to parse the given issuer. If the value is a cloud identifier, it will
// be mapped to one of the supported values. If not, we assume the value is a valid URL.
const getConfiguredDefaultIssuer = (options: TSessionMiddlewareOptions) => {
  const issuer = mapCloudIdentifierToIssuer(options.issuer);
  if (!issuer) {
    throwIfIssuerIsNotAValidUrl(options.issuer);
    return options.issuer;
  }
  return issuer;
};

// Construct the audience from the given option + the request path.
// If the request path is `/`, do not append it to the audience, otherwise
// the token validation might fail because of mismatching audiences.
const getConfiguredAudience = (
  options: TSessionMiddlewareOptions,
  requestPath: string
) => {
  const url = new URL(options.audience);
  if (requestPath !== '/') {
    url.pathname = requestPath;
  }
  return url.toString();
};

function createSessionAuthVerifier<
  Request extends IncomingMessage,
  Response extends ServerResponse
>(options: TSessionMiddlewareOptions) {
  validateRequiredValues(options);

  const configuredDefaultIssuer = getConfiguredDefaultIssuer(options);

  // Returns an async HTTP handler.
  return async (request: Request, response: Response) => {
    // Get the cloud identifier header, forwarded by the `/proxy/forward-to` endpoint.
    const cloudIdentifierHeader = getFirstOrThrow(
      request.headers[MC_API_PROXY_HEADERS.CLOUD_IDENTIFIER],
      `Missing "X-MC-API-Cloud-Identifier" header.`
    );

    let issuer =
      options.inferIssuer && cloudIdentifierHeader
        ? mapCloudIdentifierToIssuer(cloudIdentifierHeader) ??
          configuredDefaultIssuer
        : configuredDefaultIssuer;

    // Get the `Accept-version` header, forwarded by the `/proxy/forward-to` endpoint.
    // The version should be sent by the client making the request, to use the features of v2.
    const proxyForwardVersion = getFirstOrThrow(
      request.headers[MC_API_PROXY_HEADERS.FORWARD_TO_VERSION],
      `Missing "X-MC-API-Forward-To-Version" header.`
    );
    if (proxyForwardVersion === 'v1') {
      // Fall back to legacy issuer domains
      issuer = mapToLegacyIssuer(cloudIdentifierHeader) ?? issuer;
    }

    // @ts-ignore: the node HTTP request does not know about `originalUrl`
    const requestUrlPath = request.originalUrl ?? request.url;
    const audience = getConfiguredAudience(options, requestUrlPath);

    return new Promise<void>((resolve, reject) => {
      expressJwtMiddleware({
        // Dynamically provide a signing key based on the kid in the header
        // and the singing keys provided by the JWKS endpoint
        secret: jwksRsa.expressJwtSecret({
          // Default options
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          // Pass custom options
          ...(options.jwks || {}),
          // This should be set by the middleware, no matter what.
          jwksUri: `${issuer}/.well-known/jwks.json`,
        }),
        requestProperty: decodedTokenKey,
        // Validate the audience and the issuer.
        audience,
        issuer,
        algorithms: ['RS256'],
        // @ts-ignore: the middleware expects an Express.js Request/Response objects
      })(request, response, (error) => {
        if (error) {
          reject(error);
        } else {
          // @ts-ignore: the Request object does not know about some additional fields
          // like `decoded_token` and `session`
          writeSessionContext<Request>(request);
          resolve();
        }
      });
    });
  };
}

export { createSessionAuthVerifier };
