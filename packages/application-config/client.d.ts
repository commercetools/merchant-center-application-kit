type CSSModuleClasses = { readonly [key: string]: string };

declare module '*.mod.css' {
  const classes: CSSModuleClasses;
  export default classes;
}
declare module '*.module.css' {
  const classes: CSSModuleClasses;
  export default classes;
}

declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.svg' {
  const src: string;
  export default src;
}

// Custom declarations for libraries that are included in the templates.
// TODO: remove once these libraries provide their own types.
declare module '@commercetools/sync-actions' {
  export type SyncAction = { action: string; [x: string]: unknown };
  function buildActions<NextDraft, OriginalDraft>(
    nextDraft: NextDraft,
    originalDraft: OriginalDraft
  ): SyncAction[];
  export type Syncer = {
    buildActions: typeof buildActions;
  };
  export function createSyncChannels(): Syncer;
}

declare module '@commercetools/sdk-client' {
  export type Json = { [key: string]: unknown };
  export type Headers = { [key: string]: string };
  export type MethodType =
    | 'GET'
    | 'POST'
    | 'DELETE'
    | 'HEAD'
    | 'OPTIONS'
    | 'PUT'
    | 'PATCH'
    | 'TRACE';
  export type ClientRequest = {
    uri: string;
    method: MethodType;
    body?: unknown;
    headers?: Headers;
  };
  export class HttpErrorType {
    constructor(message: string, meta?: Json);
    name: string;
    message: string;
    code: number;
    status: number;
    statusCode: number;
    originalRequest: ClientRequest;
    body?: Json;
    headers?: Headers;
  }
  export type SuccessResult = {
    body: Json;
    statusCode: number;
    headers?: Headers;
  };
  export type ClientResult = SuccessResult | HttpErrorType;
  export type Client = {
    execute: (request: ClientRequest) => Promise<SuccessResult>;
  };
  export type MiddlewareRequest = ClientRequest;
  export type MiddlewareResponse = {
    resolve(response: Json): void;
    reject(error: Json): void;
    body?: Json;
    error?: HttpErrorType;
    statusCode: number;
    headers?: Headers;
    request?: Json;
  };
  export type Dispatch = (
    request: MiddlewareRequest,
    response: MiddlewareResponse
  ) => unknown;
  export type Middleware = (next: Dispatch) => Dispatch;
  export type Next = (
    request: MiddlewareRequest,
    response: MiddlewareResponse
  ) => unknown;
  export type ClientOptions = {
    middlewares: Middleware[];
  };
  export function createClient(options: ClientOptions): Client;
}
