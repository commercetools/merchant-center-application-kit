import { v4 as uuidv4 } from 'uuid';
import semver from 'semver';
import { buildOidcScope } from '@commercetools-frontend/application-shell/ssr';
import type { ApplicationRuntimeConfig } from '@commercetools-frontend/application-config';
import { STORAGE_KEYS, OIDC_RESPONSE_TYPES } from '../constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Cypress: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const cy: any;

export type LoginCredentials = {
  /**
   * The user email.
   * Defaults to `Cypress.env('LOGIN_EMAIL') || Cypress.env('LOGIN_USER')`.
   */
  email: string;
  /**
   * The user password.
   * Defaults to `Cypress.env('LOGIN_PASSWORD')`.
   */
  password: string;
};

export type CommandLoginOptions = {
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
  login?: LoginCredentials;
  /**
   * Turn off caching the session across specs.
   * This is only relevant for Cypress version >= `10.9.0`.
   */
  disableCacheAcrossSpecs?: boolean;
};
// Alias for backwards compatibility
export type CommandLoginByOidcOptions = CommandLoginOptions;

function isFeatureSupported(expectedVersion: string) {
  return semver.gte(Cypress.version, expectedVersion);
}

function loginByForm(commandOptions: CommandLoginOptions) {
  if (isLocalhost()) {
    throw new Error(
      `At the moment, the "loginByForm" command only works when testing a Merchant Center production URL. Using form login in an application running on localhost is not supported due to issues with "cy.origin".`
    );
  }

  const projectKey = commandOptions.projectKey ?? Cypress.env('PROJECT_KEY');

  cy.task(
    'customApplicationConfig',
    {
      entryPointUriPath: commandOptions.entryPointUriPath,
      dotfiles: commandOptions.dotfiles,
    },
    // Do not show log, as it may contain sensible information.
    { log: false }
  ).then((appConfig: ApplicationRuntimeConfig['env']) => {
    let url = `/${projectKey}/${commandOptions.entryPointUriPath}`;
    if (commandOptions.entryPointUriPath === 'account') {
      url = `/${commandOptions.entryPointUriPath}`;
    }

    // Log loaded application config for debugging purposes.
    Cypress.log({
      displayName: 'task',
      name: 'customApplicationConfig',
      message: appConfig,
    });

    const userCredentials = commandOptions.login ?? {
      email: Cypress.env('LOGIN_EMAIL') || Cypress.env('LOGIN_USER'),
      password: Cypress.env('LOGIN_PASSWORD'),
    };
    const sessionKey = [
      'loginByForm',
      userCredentials.email,
      commandOptions.entryPointUriPath,
    ];
    // const mcUrl = new URL(appConfig.mcApiUrl);
    // const mcFrontendHostname = mcUrl.hostname.replace('mc-api', 'mc');

    function authCallback() {
      cy.visit(url);

      // NOTE: using `cy.origin` is currently disabled as it does not seem to properly work.
      // Interestingly, starting an application locally using Vite works, however not when using Webpack.
      // For now we keep it disabled until we find a solution.

      // // https://cypress.io/blog/2022/04/25/cypress-9-6-0-easily-test-multi-domain-workflows-with-cy-origin/
      // cy.origin(
      //   mcFrontendHostname,
      //   { args: userCredentials },
      //   fillLoginForm
      // );
      fillLoginForm(userCredentials);

      // Wait for the route to be loaded so that the session can be saved.
      cy.url().should('include', url);
    }

    // For backwards compatibility.
    if (Cypress.config('experimentalSessionAndOrigin')) {
      // https://www.cypress.io/blog/2021/08/04/authenticate-faster-in-tests-cy-session-command/
      cy.session(
        sessionKey,
        authCallback,
        isFeatureSupported('10.9.0')
          ? {
              cacheAcrossSpecs:
                typeof commandOptions.disableCacheAcrossSpecs === 'boolean'
                  ? !commandOptions.disableCacheAcrossSpecs
                  : true,
            }
          : undefined
      );
    } else {
      cy.log(
        `We recommend turning on the flag "experimentalSessionAndOrigin" to be able to use "cy.session" and thus reduce the time to log in between tests.`
      );
      authCallback();
    }

    if (commandOptions.initialRoute) {
      cy.visit(`${Cypress.config('baseUrl')}${commandOptions.initialRoute}`);
      cy.url().should('include', commandOptions.initialRoute);
    }
  });
}

function loginByOidc(commandOptions: CommandLoginOptions) {
  if (!isLocalhost()) {
    throw new Error(
      `The "loginByOidc" command only works when testing a Custom Application running on localhost.`
    );
  }

  const sessionNonce = uuidv4();
  let projectKey: string | undefined = undefined;
  if (commandOptions.entryPointUriPath !== 'account') {
    projectKey = commandOptions.projectKey ?? Cypress.env('PROJECT_KEY');
  }

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
      email: Cypress.env('LOGIN_EMAIL') || Cypress.env('LOGIN_USER'),
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
    cy.request(requestOptions).then((res: { body: { redirectTo: string } }) => {
      const sessionKey = [
        'loginByOidc',
        userCredentials.email,
        commandOptions.entryPointUriPath,
      ];

      function authCallback() {
        cy.visit(res.body.redirectTo, {
          onBeforeLoad(win: Window) {
            if (projectKey) {
              win.localStorage.setItem(
                STORAGE_KEYS.ACTIVE_PROJECT_KEY,
                projectKey
              );
            }
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
        // Wait for the application to be loaded so that the session can be saved.
        cy.get('#app-loader').should('not.exist');
      }

      // For backwards compatibility.
      if (Cypress.config('experimentalSessionAndOrigin')) {
        // https://www.cypress.io/blog/2021/08/04/authenticate-faster-in-tests-cy-session-command/
        cy.session(
          sessionKey,
          authCallback,
          isFeatureSupported('10.9.0')
            ? {
                cacheAcrossSpecs:
                  typeof commandOptions.disableCacheAcrossSpecs === 'boolean'
                    ? !commandOptions.disableCacheAcrossSpecs
                    : true,
              }
            : undefined
        );
      } else {
        cy.log(
          `We recommend turning on the flag "experimentalSessionAndOrigin" to be able to use "cy.session" and thus reduce the time to log in between tests.`
        );
        authCallback();
      }

      if (commandOptions.initialRoute) {
        cy.visit(`${Cypress.config('baseUrl')}${commandOptions.initialRoute}`);
        cy.url().should('include', commandOptions.initialRoute);
      }
    });
  });
}

/* Utilities */

function fillLoginForm(userCredentials: LoginCredentials) {
  cy.get('input[name=email]').type(userCredentials.email);
  cy.get('input[name=password]').type(userCredentials.password, {
    log: false,
  });
  cy.get('button').contains('Sign in').click();
}

function isLocalhost() {
  const baseUrl = new URL(Cypress.config('baseUrl'));

  return baseUrl.hostname === 'localhost';
}

export { loginByForm, loginByOidc, isLocalhost };
