"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const express_jwt_1 = __importDefault(require("express-jwt"));
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const decodedTokenKey = 'decoded_token';
const mapCloudIdentifierToUrl = (mcApiUrl) => {
    switch (mcApiUrl) {
        case constants_1.CLOUD_IDENTIFIERS['gcp-au']:
            return 'https://mc-api.australia-southeast1.gcp.commercetools.com';
        case constants_1.CLOUD_IDENTIFIERS['gcp-eu']: {
            return 'https://mc-api.europe-west1.gcp.commercetools.com';
        }
        case constants_1.CLOUD_IDENTIFIERS['gcp-us']: {
            return 'https://mc-api.us-central1.gcp.commercetools.com';
        }
        case constants_1.CLOUD_IDENTIFIERS['aws-fra']:
            return 'https://mc-api.eu-central-1.aws.commercetools.com';
        case constants_1.CLOUD_IDENTIFIERS['aws-ohio']:
            return 'https://mc-api.us-east-2.aws.commercetools.com';
        default:
            return undefined;
    }
};
const writeSessionContext = (request) => {
    const decodedToken = request[decodedTokenKey];
    const publicClaimForProjectKey = `${decodedToken.iss}/claims/project_key`;
    // @ts-ignore
    request.session = {
        userId: decodedToken.sub,
        projectKey: decodedToken[publicClaimForProjectKey],
    };
    delete request.decoded_token;
};
function createSessionMiddleware(options) {
    var _a;
    const mcApiUrl = (_a = mapCloudIdentifierToUrl(options.mcApiUrl)) !== null && _a !== void 0 ? _a : options.mcApiUrl;
    return (request, response, next) => {
        var _a, _b, _c, _d;
        let issuer = mcApiUrl;
        if (options.inferMcApiUrlFromHeader) {
            const cloudIdentifierHeader = request.header('x-mc-api-cloud-identifier');
            if (cloudIdentifierHeader) {
                issuer = (_a = mapCloudIdentifierToUrl(cloudIdentifierHeader)) !== null && _a !== void 0 ? _a : mcApiUrl;
            }
        }
        const audience = `${request.hostname}${request.originalUrl}`;
        return express_jwt_1.default({
            // Dynamically provide a signing key based on the kid in the header
            // and the singing keys provided by the JWKS endpoint
            secret: jwks_rsa_1.default.expressJwtSecret({
                cache: (_b = options.jwksUseCache) !== null && _b !== void 0 ? _b : true,
                rateLimit: (_c = options.jwksUseRateLimit) !== null && _c !== void 0 ? _c : true,
                jwksRequestsPerMinute: (_d = options.jwksRequestsPerMinute) !== null && _d !== void 0 ? _d : 5,
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
exports.default = createSessionMiddleware;
