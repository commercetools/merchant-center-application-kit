import { createRemoteJWKSet, jwtVerify } from 'jose';
import {
  CLOUD_IDENTIFIERS,
  MC_API_URLS,
  MC_API_PROXY_HEADERS,
} from './constants';
import type {
  TSessionMiddlewareOptions,
  TSession,
  TBaseRequest,
} from './types';
import { getFirstHeaderValueOrThrow } from './utils';

export type TDecodedJWT = {
  sub: string;
  iss: string;
  [property: string]: string | string[];
};

// Assign a session object to the request object.
const writeSessionContext = <Request extends TBaseRequest>(
  request: Request & { session?: TSession },
  verifiedToken: TDecodedJWT
) => {
  const publicClaimForProjectKey = `${verifiedToken.iss}/claims/project_key`;
  const publicClaimForUserPermissionsKey = `${verifiedToken.iss}/claims/user_permissions`;

  request.session = {
    userId: verifiedToken.sub,
    projectKey: verifiedToken[publicClaimForProjectKey] as string,
  };

  const userPermissions = verifiedToken[publicClaimForUserPermissionsKey];
  if (Boolean(userPermissions?.length)) {
    request.session.userPermissions = userPermissions as string[];
  }
};

// Given a cloud identifier, try to map it to one of the supported
// environments and return the MC API URL for that environment.
// The URL points to the new hostnames.
// https://docs.commercetools.com/merchant-center-customizations/concepts/merchant-center-api#hostnames
const mapCloudIdentifierToIssuer = <Request extends TBaseRequest>(
  issuer: TSessionMiddlewareOptions<Request>['issuer']
): string | undefined => {
  switch (issuer) {
    case CLOUD_IDENTIFIERS.GCP_AU:
      return MC_API_URLS[CLOUD_IDENTIFIERS.GCP_AU];
    case CLOUD_IDENTIFIERS.GCP_EU:
      return MC_API_URLS[CLOUD_IDENTIFIERS.GCP_EU];
    case CLOUD_IDENTIFIERS.GCP_US:
      return MC_API_URLS[CLOUD_IDENTIFIERS.GCP_US];
    case CLOUD_IDENTIFIERS.AWS_EU:
    case CLOUD_IDENTIFIERS.AWS_FRA:
      return MC_API_URLS[CLOUD_IDENTIFIERS.AWS_EU];
    case CLOUD_IDENTIFIERS.AWS_US:
    case CLOUD_IDENTIFIERS.AWS_OHIO:
      return MC_API_URLS[CLOUD_IDENTIFIERS.AWS_US];
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
      `Invalid issuer URL "${issuer}". Expected a valid URL to the Merchant Center API Gateway, or a cloud identifier to one of the available cloud regions. See https://docs.commercetools.com/merchant-center-customizations/concepts/merchant-center-api#hostnames.`
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

  switch (options.audiencePolicy) {
    case 'forward-url-origin':
      return url.origin;
    default: {
      if (requestPath === '/') {
        return url.origin;
      }
      return `${url.origin}${url.pathname}`;
    }
  }
};

type TJwksClient = ReturnType<typeof createRemoteJWKSet>;
const jwksClientByIssuer = new Map<string, TJwksClient>();

function getJwksClientByIssuer(issuer: string) {
  const client = jwksClientByIssuer.get(issuer);
  if (client) {
    return client;
  }
  const newClient = createRemoteJWKSet(
    new URL(`/.well-known/jwks.json`, issuer)
  );
  jwksClientByIssuer.set(issuer, newClient);
  return newClient;
}

function createSessionAuthVerifier<Request extends TBaseRequest>(
  options: TSessionMiddlewareOptions<Request>
) {
  validateRequiredValues<Request>(options);

  const configuredDefaultIssuer = getConfiguredDefaultIssuer<Request>(options);

  // Returns an async HTTP handler.
  return async (request: Request) => {
    // Get the cloud identifier header, forwarded by the `/proxy/forward-to` endpoint.
    const cloudIdentifierHeader = getFirstHeaderValueOrThrow(
      request.headers,
      MC_API_PROXY_HEADERS.CLOUD_IDENTIFIER,
      `Missing "X-MC-API-Cloud-Identifier" header.`
    );

    let issuer =
      options.inferIssuer && cloudIdentifierHeader
        ? mapCloudIdentifierToIssuer<Request>(cloudIdentifierHeader) ??
          configuredDefaultIssuer
        : configuredDefaultIssuer;

    // Get the `Accept-version` header, forwarded by the `/proxy/forward-to` endpoint.
    // The version should be sent by the client making the request, to use the features of v2.
    const proxyForwardVersion = getFirstHeaderValueOrThrow(
      request.headers,
      MC_API_PROXY_HEADERS.FORWARD_TO_VERSION,
      `Missing "X-MC-API-Forward-To-Version" header.`
    );
    if (proxyForwardVersion === 'v1') {
      // Fall back to legacy issuer domains
      issuer = mapToLegacyIssuer(cloudIdentifierHeader) ?? issuer;
    }

    const requestUrlPath = options.getRequestUrl
      ? options.getRequestUrl(request)
      : request.originalUrl ?? request.url;

    if (!requestUrlPath || !requestUrlPath.startsWith('/')) {
      throw new Error(
        `Invalid request URI path "${requestUrlPath}". Please make sure that the "request" object has either a property "originalUrl" or "url". If not, you should implement the "getRequestUrl" function and make sure to return a valid URI path value starting with "/". More info at https://docs.commercetools.com/merchant-center-customizations/concepts/integrate-with-your-own-api#validating-the-json-web-token`
      );
    }

    const audience = getConfiguredAudience<Request>(options, requestUrlPath);

    const authorizationHeader = request.headers['authorization'];
    if (typeof authorizationHeader !== 'string') {
      throw new Error(`Missing "authorization" header`);
    }

    const exchangeToken = authorizationHeader.replace(/^Bearer (.*)$/, '$1');
    const jwksClient = getJwksClientByIssuer(issuer);
    const verifiedToken = await jwtVerify<TDecodedJWT>(
      exchangeToken,
      jwksClient,
      {
        algorithms: ['RS256'],
        audience,
        issuer,
      }
    );

    writeSessionContext<Request>(request, verifiedToken.payload);
    return;
  };
}

export { createSessionAuthVerifier, writeSessionContext };
