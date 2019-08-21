import {
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
} from '../types';

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
