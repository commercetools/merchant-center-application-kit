declare module '@commercetools/api-request-builder' {
  type TUriOptions = {
    withProjectKey?: boolean;
    applyOrderEdit?: boolean;
  };
  export type ServiceBuilder = {
    build(uriOptions?: TUriOptions): string;
    parse(options: { [key: string]: unknown }): string;
  };
  export type ApiRequestBuilder = {
    [key: string]: ServiceBuilder;
  };
  export function createRequestBuilder(options?: {
    [key: string]: unknown;
  }): ApiRequestBuilder;
}
