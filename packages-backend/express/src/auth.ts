import type {
  TSessionMiddlewareOptions,
  TSession,
  TBaseRequest,
} from './types';

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
const writeSessionContext = <Request extends TBaseRequest>(
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
// https://docs.commercetools.com/custom-applications/concepts/merchant-center-api#hostnames
const mapCloudIdentifierToIssuer = <Request extends TBaseRequest>(
  issuer: TSessionMiddlewareOptions<Request>['issuer']
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
      `Invalid issuer URL "${issuer}". Expected a valid URL to the Merchant Center API Gateway, or a cloud identifier to one of the available cloud regions. See https://docs.commercetools.com/custom-applications/concepts/merchant-center-api#hostnames.`
    );
  }
};
// Validates required option values.
const validateRequiredValues = <Request extends TBaseRequest>(
  options: TSessionMiddlewareOptions<Request>
) => {
  if (!options.audience) {
    throw new Error(`Missing required option "audience"`);
  }
  if (!options.issuer) {
    throw new Error(`Missing required option "issuer"`);
  }
};
// Attempt to parse the given issuer. If the value is a cloud identifier, it will
// be mapped to one of the supported values. If not, we assume the value is a valid URL.
const getConfiguredDefaultIssuer = <Request extends TBaseRequest>(
  options: TSessionMiddlewareOptions<Request>
) => {
  const issuer = mapCloudIdentifierToIssuer<Request>(options.issuer);
  if (!issuer) {
    throwIfIssuerIsNotAValidUrl(options.issuer);
    return options.issuer;
  }
  return issuer;
};

// Construct the audience from the given option + the request path.
// If the request path is `/`, do not append it to the audience, otherwise
// the token validation might fail because of mismatching audiences.
export const getConfiguredAudience = <Request extends TBaseRequest>(
  options: TSessionMiddlewareOptions<Request>,
  requestPath: string
) => {
  // remove the trailing slash
  const url = new URL(`${options.audience.replace(/\/?$/, '')}${requestPath}`);
  if (requestPath === '/') {
    return url.origin;
  }
  return `${url.origin}${url.pathname}`;
};

function createSessionAuthVerifier<Request extends TBaseRequest>(
  options: TSessionMiddlewareOptions<Request>
) {
  validateRequiredValues<Request>(options);

  const configuredDefaultIssuer = getConfiguredDefaultIssuer<Request>(options);

  // Returns an async HTTP handler.
  return async (request: Request, response?: unknown) => {
    // Get the cloud identifier header, forwarded by the `/proxy/forward-to` endpoint.
    const cloudIdentifierHeader = getFirstOrThrow(
      request.headers[MC_API_PROXY_HEADERS.CLOUD_IDENTIFIER],
      `Missing "X-MC-API-Cloud-Identifier" header.`
    );

    let issuer =
      options.inferIssuer && cloudIdentifierHeader
        ? mapCloudIdentifierToIssuer<Request>(cloudIdentifierHeader) ??
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

    const requestUrlPath = options.getRequestUrl
      ? options.getRequestUrl(request)
      : request.originalUrl ?? request.url;

    if (!requestUrlPath || requestUrlPath === 'undefined') {
      throw new Error('Could not get the request URL.');
    }

    const audience = getConfiguredAudience<Request>(options, requestUrlPath);

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
      })(request, response ?? {}, (error) => {
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
