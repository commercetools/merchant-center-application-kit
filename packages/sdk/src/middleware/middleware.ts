import { createRequestBuilder } from '@commercetools/api-request-builder';
import type { HttpErrorType } from '@commercetools/sdk-client';
import type { Action, Dispatch, MiddlewareAPI } from 'redux';
import {
  SHOW_LOADING,
  HIDE_LOADING,
  STATUS_CODES,
} from '@commercetools-frontend/constants';
import type {
  TSdkAction,
  TSdkActionPayload,
  TSdkActionPayloadForUri,
} from '../types';

import { logRequest } from '../utils';
import createClient from './client';

const isSdkActionForUri = (
  actionPayload: TSdkActionPayload
): actionPayload is TSdkActionPayloadForUri =>
  (actionPayload as TSdkActionPayloadForUri).uri !== undefined;

// https://github.com/commercetools/nodejs/blob/master/packages/api-request-builder/src/default-services.js#L200:L200
const ORDER_EDIT_SERVICE = 'orderEdits';

const actionToUri = (action: TSdkAction, projectKey?: string): string => {
  if (isSdkActionForUri(action.payload)) return action.payload.uri;

  // Validate that `projectKey` exists
  if (!projectKey) {
    throw new Error(
      `Expected projectKey to be defined for action service "${action.payload.service}" (method "${action.payload.method}")`
    );
  }

  const requestBuilder = createRequestBuilder({ projectKey });
  // NOTE it's weird that we have to access this from the request builder.
  // Shouldn't it just be a part of the object we parse?
  // NOTE shouldn't requestBuilder be called requestUriBuilder instead?
  const service = requestBuilder[action.payload.service];
  if (action.payload.options) service.parse(action.payload.options);

  return service.build({
    // given `service=orderEdits` and given `applyOrderEditTo`, we build an apply endpoint
    // given `service=orderEdits` and no `applyOrderEditTo`, we build an update endpoint
    // https://docs.commercetools.com/api/projects/order-edits
    applyOrderEdit:
      action.payload.service === ORDER_EDIT_SERVICE &&
      typeof action.payload.options?.applyOrderEditTo === 'string',
    // at this stage, the `projectKey` should be available already.
    withProjectKey: true,
  });
};

// Force TS cast of generic action to TNotificationAction
const isSdkAction = (action: Action): action is TSdkAction =>
  action.type === 'SDK';

const isSdkError = (error: Error | HttpErrorType): error is HttpErrorType =>
  (error as HttpErrorType).statusCode !== undefined;

export default function createSdkMiddleware({
  getCorrelationId,
  getProjectKey,
  getAdditionalHeaders,
}: {
  getCorrelationId: () => string;
  getProjectKey: () => string | undefined;
  getAdditionalHeaders: () => { [key: string]: string } | undefined;
}) {
  const client = createClient({ getCorrelationId });

  const middleware =
    ({ dispatch }: MiddlewareAPI) =>
    (next: Dispatch<TSdkAction>) =>
    (action: TSdkAction) => {
      if (!isSdkAction(action)) {
        return next(action);
      }

      const projectKey = getProjectKey();

      const uri = [
        action.payload.mcApiProxyTarget &&
          `/proxy/${action.payload.mcApiProxyTarget}`,
        actionToUri(action, projectKey),
      ]
        .filter(Boolean)
        .join('');

      // This `requestName` is never really used.
      //
      // We keep track of requests which are in progress in the `loading` state of
      // the application. The `loading` state is an array of strings
      // (which are correlation Ids, action types or request names).
      // This is just done so that debugging is easier.
      //
      // It's easier to debug
      //   loading: ['PRODUCTS_FETCHED', 'sdk.fetch(/product-projection-search)']
      // than to debug
      //   loading: 2
      const requestName = `sdk.${action.payload.method.toLowerCase()}(${uri})`;

      // NOTE here the middleware is aware of the application
      // Instead we should probably convert to a middleware factory
      // and provide hooks for `onFetch`, `onResult` and `onError
      dispatch({ type: SHOW_LOADING, payload: requestName });

      // NOTE the promise returned by the client resolves to a custom format
      // it will contain { statusCode, headers, body }
      // NOTE This retry logic could be moved to an sdk client middleware,
      // but the client's middleware system is not capable of that right now
      // https://github.com/commercetools/merchant-center-frontend/pull/3304
      // https://github.com/commercetools/nodejs/issues/390
      const sendRequest = ({
        shouldRenewToken,
      }: { shouldRenewToken?: boolean } = {}) => {
        const additionalHeaders = getAdditionalHeaders();
        const headers = {
          Accept: 'application/json',
          ...(action.payload.headers || {}),
          ...(shouldRenewToken ? { 'X-Force-Token': 'true' } : {}),
          ...(projectKey && { 'X-Project-Key': projectKey }),
          // Experimental features, use with caution.
          ...(additionalHeaders ?? {}),
        };
        const body =
          action.payload.method === 'POST' ? action.payload.payload : undefined;
        return client
          .execute({ uri, method: action.payload.method, headers, body })
          .then(
            (result) => {
              if (process.env.NODE_ENV === 'development')
                logRequest({
                  method: action.payload.method,
                  request: { headers, uri },
                  response: result.body,
                  action,
                });
              return result;
            },
            (error: HttpErrorType) => {
              if (process.env.NODE_ENV === 'development')
                logRequest({
                  method: action.payload.method,
                  request: { headers, uri },
                  error,
                  action,
                });
              throw error;
            }
          );
      };
      return sendRequest()
        .catch((error: Error | HttpErrorType) => {
          // in case of 401 error, try again with a new token
          // https://github.com/commercetools/merchant-center-backend/blob/master/docs/AUTHENTICATION.md#problems-due-to-oauth-token-caching
          if (
            isSdkError(error) &&
            error.statusCode === STATUS_CODES.UNAUTHORIZED
          ) {
            return sendRequest({ shouldRenewToken: true });
          }
          throw error;
        })
        .then(
          (result) => {
            dispatch({ type: HIDE_LOADING, payload: requestName });
            // The promise returned by "fetch" will reject when the request fails,
            // but only in certain cases. See "Checking that the fetch was successful"
            // in https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
            // The SDK already handles this case for us.

            return result.body;
          },
          (error) => {
            dispatch({ type: HIDE_LOADING, payload: requestName });
            throw error;
          }
        );
    };
  return middleware;
}
