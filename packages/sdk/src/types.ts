import type { TMcApiProxyTargets } from '@commercetools-frontend/constants';

export type Json = { [key: string]: unknown };

export type THttpMethod = 'GET' | 'POST' | 'DELETE' | 'HEAD';

export type TSdkActionPayloadMethod<Method extends THttpMethod> = {
  method: Method;
};
export type TSdkActionPayloadBody = {
  payload: unknown;
};
export interface TSdkActionPayloadBase {
  headers?: { [key: string]: string };
  mcApiProxyTarget?: TMcApiProxyTargets;
}
export interface TSdkActionPayloadForUri extends TSdkActionPayloadBase {
  uri: string;
}

export interface TSdkActionPayloadForService extends TSdkActionPayloadBase {
  service: string;
  options: Json;
}
export type TSdkActionPayload =
  | TSdkActionPayloadForUri
  | TSdkActionPayloadForService;

export type TSdkActionGetForUri = {
  type: 'SDK';
  payload: TSdkActionPayloadForUri & TSdkActionPayloadMethod<'GET'>;
};
export type TSdkActionGetForService = {
  type: 'SDK';
  payload: TSdkActionPayloadForService & TSdkActionPayloadMethod<'GET'>;
};
export type TSdkActionGet = TSdkActionGetForUri | TSdkActionGetForService;

export type TSdkActionPostForUri = {
  type: 'SDK';
  payload: TSdkActionPayloadForUri &
    TSdkActionPayloadMethod<'POST'> &
    TSdkActionPayloadBody;
};
export type TSdkActionPostForService = {
  type: 'SDK';
  payload: TSdkActionPayloadForService &
    TSdkActionPayloadMethod<'POST'> &
    TSdkActionPayloadBody;
};
export type TSdkActionPost = TSdkActionPostForUri | TSdkActionPostForService;

export type TSdkActionDeleteForUri = {
  type: 'SDK';
  payload: TSdkActionPayloadForUri & TSdkActionPayloadMethod<'DELETE'>;
};
export type TSdkActionDeleteForService = {
  type: 'SDK';
  payload: TSdkActionPayloadForService & TSdkActionPayloadMethod<'DELETE'>;
};
export type TSdkActionDelete =
  | TSdkActionDeleteForUri
  | TSdkActionDeleteForService;

export type TSdkActionHeadForUri = {
  type: 'SDK';
  payload: TSdkActionPayloadForUri & TSdkActionPayloadMethod<'HEAD'>;
};
export type TSdkActionHeadForService = {
  type: 'SDK';
  payload: TSdkActionPayloadForService & TSdkActionPayloadMethod<'HEAD'>;
};
export type TSdkActionHead = TSdkActionHeadForUri | TSdkActionHeadForService;

export type TSdkAction =
  | TSdkActionGet
  | TSdkActionPost
  | TSdkActionDelete
  | TSdkActionHead;
