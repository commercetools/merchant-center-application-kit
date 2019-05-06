// @flow strict

declare module '@sentry/browser' {
  declare type User = {
    id?: string,
    email?: string,
    ip_address?: string,
    username?: string,
  };
  declare class Scope {
    clear(): Scope;
    setExtra(key: string, value: string): Scope;
    setExtras(extra: { [key: string]: mixed }): Scope;
    setTag(key: string, value: string): Scope;
    setUser(user: User): Scope;
  }
  declare type InitConfig = {
    dsn: string,
    release?: string,
    environment?: string,
    whitelistUrls?: Array<string>,
  };
  declare module.exports: {
    init: (config: InitConfig) => void,
    configureScope: (fn: (scope: Scope) => void) => void,
    captureException: (error: Error) => string,
    captureMessage: (message: string) => string,
    withScope: (fn: (scope: Scope) => void) => void,
  };
}
