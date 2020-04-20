import type { TSessionMiddlewareOptions } from '../types';
import type { Request, Response, NextFunction } from 'express';

import { CLOUD_IDENTIFIERS, MC_API_URLS } from '../constants';
import expressJwtMiddleware from 'express-jwt';
import jwksRsa from 'jwks-rsa';

const decodedTokenKey = 'decoded_token';

const mapCloudIdentifierToUrl = (
  issuer: TSessionMiddlewareOptions['issuer']
): string | undefined => {
  switch (issuer) {
    case CLOUD_IDENTIFIERS.GCP_AU:
      return MC_API_URLS.GCP_AU;
    case CLOUD_IDENTIFIERS.GCP_EU: {
      return MC_API_URLS.GCP_EU;
    }
    case CLOUD_IDENTIFIERS.GCP_US: {
      return MC_API_URLS.GCP_US;
    }
    case CLOUD_IDENTIFIERS.AWS_FRA:
      return MC_API_URLS.AWS_FRA;
    case CLOUD_IDENTIFIERS.AWS_OHIO:
      return MC_API_URLS.AWS_OHIO;
    default:
      return undefined;
  }
};
const throwIfIssuerIsNotAValidUrl = (issuer: string) => {
  try {
    new URL(issuer);
  } catch (error) {
    throw new Error(
      `Invalid issuer URL "${issuer}". Expected a valid URL to the Merchant Center API Gateway, or a cloud identifier to one of the available cloud regions. See https://docs.commercetools.com/custom-applications/main-concepts/api-gateway#hostnames.`
    );
  }
};

type TDecodedJWT = {
  sub: string;
  iss: string;
  [property: string]: string;
};

const writeSessionContext = (
  request: Request & { decoded_token: TDecodedJWT }
) => {
  const decodedToken = request[decodedTokenKey];
  const publicClaimForProjectKey = `${decodedToken.iss}/claims/project_key`;

  // @ts-ignore
  request.session = {
    userId: decodedToken.sub,
    projectKey: decodedToken[publicClaimForProjectKey],
  };

  delete request.decoded_token;
};

function createSessionMiddleware(options: TSessionMiddlewareOptions) {
  let configuredDefaultIssuer = mapCloudIdentifierToUrl(options.issuer);
  if (!configuredDefaultIssuer) {
    throwIfIssuerIsNotAValidUrl(options.issuer);
    configuredDefaultIssuer = options.issuer;
  }

  // Return the middleware
  return (request: Request, response: Response, next: NextFunction) => {
    const cloudIdentifierHeader = request.header('x-mc-api-cloud-identifier');
    const issuer =
      options.inferIssuer && cloudIdentifierHeader
        ? mapCloudIdentifierToUrl(cloudIdentifierHeader) ??
          configuredDefaultIssuer
        : configuredDefaultIssuer;

    const audience = `${request.hostname}${request.originalUrl}`;
    return expressJwtMiddleware({
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
    })(request, response, (error) => {
      if (error) {
        return next(error);
      }
      // @ts-ignore
      writeSessionContext(request);
      next();
    });
  };
}

export default createSessionMiddleware;
