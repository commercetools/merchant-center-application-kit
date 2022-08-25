import type {
  TSdkActionPayload,
  TSdkActionPayloadBody,
  TSdkActionPayloadForUri,
  TSdkActionPayloadForService,
  TSdkActionGetForUri,
  TSdkActionGetForService,
  TSdkActionDeleteForUri,
  TSdkActionDeleteForService,
  TSdkActionHeadForUri,
  TSdkActionHeadForService,
  TSdkActionPostForUri,
  TSdkActionPostForService,
  TForwardToExchangeTokenClaim,
} from '../types';

const allowedForwardToExchangeClaims = ['permissions'];

export function get(payload: TSdkActionPayloadForUri): TSdkActionGetForUri;
export function get(
  payload: TSdkActionPayloadForService
): TSdkActionGetForService;
export function get(payload: TSdkActionPayload) {
  return { type: 'SDK', payload: { ...payload, method: 'GET' } };
}

// contrary to the other methods this does not bear the exact name of the HTTP-verb
// because `delete` is a reserved keyword in ECMAScript
export function del(payload: TSdkActionPayloadForUri): TSdkActionDeleteForUri;
export function del(
  payload: TSdkActionPayloadForService
): TSdkActionDeleteForService;
export function del(payload: TSdkActionPayload) {
  return { type: 'SDK', payload: { ...payload, method: 'DELETE' } };
}

export function head(payload: TSdkActionPayloadForUri): TSdkActionHeadForUri;
export function head(
  payload: TSdkActionPayloadForService
): TSdkActionHeadForService;
export function head(payload: TSdkActionPayload) {
  return { type: 'SDK', payload: { ...payload, method: 'HEAD' } };
}

export function post(
  payload: TSdkActionPayloadForUri & TSdkActionPayloadBody
): TSdkActionPostForUri;
export function post(
  payload: TSdkActionPayloadForService & TSdkActionPayloadBody
): TSdkActionPostForService;
export function post(payload: TSdkActionPayload & TSdkActionPayloadBody) {
  return { type: 'SDK', payload: { ...payload, method: 'POST' } };
}

const enhancePayloadForForwardToProxy = (payload: TSdkActionPayloadForUri) => {
  const headers = payload.headers ?? {};
  const exchangeTokenClaims: TForwardToExchangeTokenClaim[] = [];

  if (payload.includeUserPermissions) {
    exchangeTokenClaims.push('permissions');
  }

  return {
    uri: '/proxy/forward-to',
    mcApiProxyTarget: undefined,
    headers: {
      ...Object.entries(headers).reduce(
        (customForwardHeaders, [headerName, headerValue]) => ({
          ...customForwardHeaders,
          // Prefix headers so that the MC API can allow and forward them.
          [`x-forward-header-${headerName}`]: headerValue,
        }),
        {}
      ),
      'Accept-version': 'v2',
      'X-Forward-To': payload.uri,
      'X-Forward-To-Audience-Policy':
        payload.audiencePolicy || 'forward-url-full-path',
      ...(Boolean(exchangeTokenClaims?.length)
        ? {
            'X-Forward-To-Claims': exchangeTokenClaims!
              .filter((token) => allowedForwardToExchangeClaims.includes(token))
              .join(' '),
          }
        : {}),
    },
  };
};
export const forwardTo = {
  get(payload: TSdkActionPayloadForUri): TSdkActionGetForUri {
    return {
      type: 'SDK',
      payload: {
        ...payload,
        method: 'GET',
        ...enhancePayloadForForwardToProxy(payload),
      },
    };
  },
  del(payload: TSdkActionPayloadForUri): TSdkActionDeleteForUri {
    return {
      type: 'SDK',
      payload: {
        ...payload,
        method: 'DELETE',
        ...enhancePayloadForForwardToProxy(payload),
      },
    };
  },
  head(payload: TSdkActionPayloadForUri): TSdkActionHeadForUri {
    return {
      type: 'SDK',
      payload: {
        ...payload,
        method: 'HEAD',
        ...enhancePayloadForForwardToProxy(payload),
      },
    };
  },
  post(
    payload: TSdkActionPayloadForUri & TSdkActionPayloadBody
  ): TSdkActionPostForUri {
    return {
      type: 'SDK',
      payload: {
        ...payload,
        method: 'POST',
        ...enhancePayloadForForwardToProxy(payload),
      },
    };
  },
};
