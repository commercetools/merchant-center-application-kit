import type { ApplicationRuntimeConfig } from '@commercetools-frontend/application-config';

import { v4 as uuidv4 } from 'uuid';
import { STORAGE_KEYS, OIDC_RESPONSE_TYPES } from '../constants';
import { buildOidcScope } from '@commercetools-frontend/application-shell/ssr';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Cypress: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const cy: any;

export type CommandLoginByOidcOptions = {
  /**
   * The application entry point URI path. This value is used to identify
   * the correct application config.
   */
  entryPointUriPath: string;
  /**
   * Pass a list of dotfiles that must be loaded when the custom-application-config.json
   * is loaded (in case you are using environment placeholder).
   * By default the following dotfiles are loaded: `.env` and `.env.local`.
   * You can also define the values using paths relative to the application folder.
   */
  dotfiles?: string[];
  /**
   * Called before your page has loaded all of its resources.
   * Use this as a chance to interact for example with the browser storage.
   */
  onBeforeLoad?: (win: Window) => void;
  /**
   * If defined, visit this route after login.
   */
  initialRoute?: string;
  /**
   * The project key to access in the user session. The session token is valid for one project key at a time.
   * Defaults to `Cypress.env('PROJECT_KEY')`.
   */
  projectKey?: string;
  /**
   * The user login credentials.
   */
  login?: {
    /**
     * The user email.
     * Defaults to `Cypress.env('LOGIN_EMAIL') ?? Cypress.env('LOGIN_USER')`.
     */
    email: string;
    /**
     * The user password.
     * Defaults to `Cypress.env('LOGIN_PASSWORD')`.
     */
    password: string;
  };
};

Cypress.Commands.add(
  'loginByOidc',
  (commandOptions: CommandLoginByOidcOptions) => {
    Cypress.log({ name: 'loginByOidc' });

    const projectKey = commandOptions.projectKey ?? Cypress.env('PROJECT_KEY');
    const sessionNonce = uuidv4();

    cy.task(
      'customApplicationConfig',
      {
        entryPointUriPath: commandOptions.entryPointUriPath,
        dotfiles: commandOptions.dotfiles,
      },
      // Do not show log, as it may contain sensible information.
      { log: false }
    ).then((appConfig: ApplicationRuntimeConfig['env']) => {
      // Log loaded application config for debugging purposes.
      Cypress.log({
        displayName: 'task',
        name: 'customApplicationConfig',
        message: appConfig,
      });

      const applicationId = appConfig.applicationId;
      const sessionScope = buildOidcScope({
        projectKey,
        oAuthScopes: appConfig.__DEVELOPMENT__?.oidc?.oAuthScopes,
        additionalOAuthScopes:
          appConfig.__DEVELOPMENT__?.oidc?.additionalOAuthScopes,
        teamId: appConfig.__DEVELOPMENT__?.oidc?.teamId,
      });
      const userCredentials = commandOptions.login ?? {
        email: Cypress.env('LOGIN_EMAIL') ?? Cypress.env('LOGIN_USER'),
        password: Cypress.env('LOGIN_PASSWORD'),
      };
      // Perform the login using the API, then store some required values into the browser storage
      // and redirect to the auth callback route.
      const requestOptions = {
        method: 'POST',
        url: `${appConfig.mcApiUrl}/tokens`,
        body: {
          ...userCredentials,
          client_id: applicationId,
          response_type: OIDC_RESPONSE_TYPES.ID_TOKEN,
          scope: sessionScope,
          state: sessionNonce,
          nonce: sessionNonce,
        },
        followRedirect: false,
      };
      cy.request(requestOptions).then(
        (res: { body: { redirectTo: string } }) => {
          cy.visit(res.body.redirectTo, {
            onBeforeLoad(win: Window) {
              win.localStorage.setItem(
                STORAGE_KEYS.ACTIVE_PROJECT_KEY,
                projectKey
              );
              win.sessionStorage.setItem(
                `${STORAGE_KEYS.NONCE}_${sessionNonce}`,
                JSON.stringify({ applicationId, query: {} })
              );
              win.sessionStorage.setItem(
                STORAGE_KEYS.SESSION_SCOPE,
                sessionScope
              );

              if (commandOptions.onBeforeLoad) {
                commandOptions.onBeforeLoad(win);
              }
            },
          });

          if (commandOptions.initialRoute) {
            cy.visit(
              `${Cypress.config('baseUrl')}${commandOptions.initialRoute}`
            );
            cy.url().should('include', commandOptions.initialRoute);
          }
        }
      );
    });
  }
);
