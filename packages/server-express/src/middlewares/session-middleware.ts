import type { TSessionMiddlewareOptions } from '../types';
import type { Request, Response, NextFunction } from 'express';

import { CLOUD_IDENTIFIERS } from '../constants';
import expressJwtMiddleware from 'express-jwt';
import jwksRsa from 'jwks-rsa';

const decodedTokenKey = 'decoded_token';

const mapCloudIdentifierToUrl = (
  issuer: TSessionMiddlewareOptions['issuer']
) => {
  switch (issuer) {
    case CLOUD_IDENTIFIERS['gcp-au']:
      return 'https://mc-api.australia-southeast1.gcp.commercetools.com';
    case CLOUD_IDENTIFIERS['gcp-eu']: {
      return 'https://mc-api.europe-west1.gcp.commercetools.com';
    }
    case CLOUD_IDENTIFIERS['gcp-us']: {
      return 'https://mc-api.us-central1.gcp.commercetools.com';
    }
    case CLOUD_IDENTIFIERS['aws-fra']:
      return 'https://mc-api.eu-central-1.aws.commercetools.com';
    case CLOUD_IDENTIFIERS['aws-ohio']:
      return 'https://mc-api.us-east-2.aws.commercetools.com';
    default:
      return undefined;
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
  const configuredIssuer =
    mapCloudIdentifierToUrl(options.issuer) ?? options.issuer;

  // Return the middleware
  return (request: Request, response: Response, next: NextFunction) => {
    let issuer = configuredIssuer;
    if (options.inferIssuerFromCustomHeader) {
      // Attempt to infer the
      const cloudIdentifierHeader = request.header('x-mc-api-cloud-identifier');
      if (cloudIdentifierHeader) {
        issuer = mapCloudIdentifierToUrl(cloudIdentifierHeader) ?? issuer;
      }
    }
    const audience = `${request.hostname}${request.originalUrl}`;
    return expressJwtMiddleware({
      // Dynamically provide a signing key based on the kid in the header
      // and the singing keys provided by the JWKS endpoint
      secret: jwksRsa.expressJwtSecret({
        cache: options.jwksUseCache ?? true,
        rateLimit: options.jwksUseRateLimit ?? true,
        jwksRequestsPerMinute: options.jwksRequestsPerMinute ?? 5,
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
