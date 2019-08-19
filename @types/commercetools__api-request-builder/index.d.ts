declare module '@commercetools/api-request-builder' {
  export type ServiceBuilder = {
    build(): string;
    parse(options: { [key: string]: unknown }): string;
  };
  export type ApiRequestBuilder = {
    [key: string]: ServiceBuilder;
  };
  export function createRequestBuilder(options?: {
    [key: string]: unknown;
  }): ApiRequestBuilder;
}
