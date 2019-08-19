declare module '@commercetools/http-user-agent' {
  export type HttpUserAgentOptions = {
    name: string;
    version?: string;
    libraryName?: string;
    libraryVersion?: string;
    contactUrl?: string;
    contactEmail?: string;
  };
  export default function createUserAgent(
    options: HttpUserAgentOptions
  ): string;
}
