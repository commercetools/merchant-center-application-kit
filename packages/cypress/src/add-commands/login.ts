import semver from 'semver';
import {
  type ApplicationRuntimeEnvironment,
  CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH,
  GRAPHQL_TARGETS,
} from '@commercetools-frontend/constants';
import { HTTP_STATUS_CODES } from '../constants';

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

export type LoginToMerchantCenterForCustomViewCommandLoginOptions = Omit<
  CommandLoginOptions,
  'entryPointUriPath' | 'initialRoute'
> & {
  /**
   * The package name as specified in the `package.json` to uniquely identify the configuration.
   * This is only required for testing Custom Views.
   * Defaults to `Cypress.env('PACKAGE_NAME')`
   */
  packageName?: string;
};

// Alias for backwards compatibility
export type CommandLoginByOidcOptions = CommandLoginOptions;

function isFeatureSupported(expectedVersion: string) {
  return semver.gte(Cypress.version, expectedVersion);
}

function isRunningOnLocalhost() {
  const baseUrl = new URL(Cypress.config('baseUrl'));

  return baseUrl.hostname === 'localhost';
}

const isCustomView = (commandOptions: CommandLoginOptions) =>
  commandOptions.entryPointUriPath === CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH;

function loginByForm(commandOptions: CommandLoginOptions) {
  const isLocalhost = isRunningOnLocalhost();
  Cypress.log({
    name: 'isLocalhost',
    message: isLocalhost,
  });

  const projectKey = commandOptions.projectKey ?? Cypress.env('PROJECT_KEY');

  const isCustomViewConfigCommand = isCustomView(commandOptions);
  const customEntityConfigCommand = isCustomViewConfigCommand
    ? 'customViewConfig'
    : 'customApplicationConfig';

  const packageName =
    (commandOptions as LoginToMerchantCenterForCustomViewCommandLoginOptions)
      .packageName ?? Cypress.env('PACKAGE_NAME');

  cy.task(
    customEntityConfigCommand,
    {
      entryPointUriPath: commandOptions.entryPointUriPath,
      dotfiles: commandOptions.dotfiles,
      ...(isCustomViewConfigCommand ? { packageName } : {}),
    },
    // Do not show log, as it may contain sensible information.
    { log: false }
  ).then((appConfig: ApplicationRuntimeEnvironment) => {
    let url = `/${projectKey}/${commandOptions.entryPointUriPath}`;
    if (commandOptions.entryPointUriPath === 'account') {
      url = `/${commandOptions.entryPointUriPath}`;
    }

    // Log loaded application config for debugging purposes.
    Cypress.log({
      displayName: 'task',
      name: customEntityConfigCommand,
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

    /**
     * The function is used by Cypress `session` command to store the
     * browser state after executing the authentication flow.
     */
    function authCallback() {
      // Get the feature flags from the Merchant Center API
      cy.request({
        method: 'POST',
        url: `${appConfig.mcApiUrl}/graphql`,
        body: {
          operationName: 'AllFeatures',
          query: `query AllFeatures { allFeatures { name value reason } }`,
        },
        headers: {
          'content-type': 'application/json',
          'x-graphql-target': GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
          'x-graphql-operation-name': 'AllFeatures',
          'x-project-key': projectKey,
        },
      }).then(
        (res: {
          body: {
            data: {
              allFeatures: { name: string; value: string; reason: string }[];
            };
          };
        }) => {
          const enableIdentity = res.body.data.allFeatures.find(
            (feature) => feature.name === 'enableGlobalIdentity'
          );
          const isGlobalIdentityEnabled = Boolean(enableIdentity?.value);
          Cypress.log({
            name: 'isGlobalIdentityEnabled',
            message: isGlobalIdentityEnabled,
          });
          const identityUrl =
            Cypress.env('IDENTITY_URL') || 'https://identity.commercetools.com';

          // Visit the application URL, which triggers then the login flow.
          cy.visit(url, {
            onBeforeLoad: commandOptions.onBeforeLoad,
          });

          /**
           * There are different scenarios and variations on the flow depending
           * on the environment (localhost, production) and if Identity is enabled.
           *
           * # When the application runs on localhost:3001.
           *
           * ## When Identity is enabled
           * - The test visits the application at localhost:3001.
           * - Cypress registers the default origin being localhost:3001.
           * - The application is redirected to the Identity URL.
           * - Cypress interacts with the Identity URL via `cy.origin`.
           * - At the end of the flow, the test interacts with the application at localhost:3001.

           * ## When Identity is disabled
           * - The test visits the application at localhost:3001.
           * - Cypress registers the default origin being localhost:3001.
           * - The application is redirected to the Merchant Center login page.
           * - Cypress interacts with the Merchant Center login page via `cy.origin`.
           * - At the end of the flow, the test interacts with the application at localhost:3001.
           *
           * # When the application runs on a production URL.
           *
           * ## When Identity is enabled
           * - The test visits the application at the production URL.
           * - The MC Proxy performs a server-side redirect to the Identity URL.
           * - Cypress registers the default origin being the Identity URL.
           * - Cypress interacts with the Identity URL.
           * - At the end of the flow, the test interacts with the application at the production URL via `cy.origin`.
           *
           * ## When Identity is disabled
           * - The test visits the application at the production URL.
           * - The MC Proxy renders the Merchant Center login page.
           * - Cypress registers the default origin being the Merchant Center URL.
           * - Cypress interacts with the Merchant Center login page.
           * - At the end of the flow, the test interacts with the application at the production URL.
           */

          if (isLocalhost) {
            if (isGlobalIdentityEnabled) {
              // eslint-disable-next-line cypress/no-unnecessary-waiting
              cy.wait(1000);

              // Use cy.origin to handle the identity domain
              cy.origin(
                identityUrl,
                {
                  args: {
                    userCredentials,
                    identityUrl,
                  },
                },
                ({
                  userCredentials,
                  identityUrl,
                }: {
                  userCredentials: LoginCredentials;
                  identityUrl: string;
                }) => {
                  cy.url().should('include', `${identityUrl}/login`);
                  // Fill in the email and click Next
                  cy.get('input[name="identifier"]').type(
                    userCredentials.email
                  );
                  cy.get('button').contains('Next').click();

                  // Wait for the password form to appear
                  cy.get('input[name="password"]').should('be.visible');
                  // Fill in the password and submit
                  cy.get('input[name="password"]').type(
                    userCredentials.password,
                    { log: false }
                  );
                  cy.get('button').contains('Submit').click();
                }
              );

              // Wait for the flow to redirect back to the application.
              cy.get('[role="main"]').should('exist');
              cy.url().should('include', url);
            } else {
              const mcUrl = appConfig.mcApiUrl.replace('mc-api', 'mc');
              // eslint-disable-next-line cypress/no-unnecessary-waiting
              cy.wait(1000);
              cy.origin(
                mcUrl,
                {
                  args: {
                    userCredentials,
                    mcUrl,
                  },
                },
                ({
                  userCredentials,
                  mcUrl,
                }: {
                  userCredentials: LoginCredentials;
                  mcUrl: string;
                }) => {
                  cy.url().should('include', `${mcUrl}/login`);

                  // Same as `fillLegacyLoginFormWithRetry`.
                  // eslint-disable-next-line cypress/unsafe-to-chain-command
                  cy.get('input[name=email]')
                    .clear({ force: true })
                    .type(userCredentials.email, { force: true });
                  // eslint-disable-next-line cypress/unsafe-to-chain-command
                  cy.get('input[name=password]')
                    .clear({ force: true })
                    .type(userCredentials.password, {
                      log: false,
                      force: true,
                    });
                  cy.get('button').contains('Sign in').click({ force: true });
                }
              );
              // eslint-disable-next-line cypress/no-unnecessary-waiting
              cy.wait(1000);

              // Wait for the flow to redirect back to the application.
              cy.get('[role="main"]').should('exist');
              cy.url().should('include', url);
            }
          } else {
            if (isGlobalIdentityEnabled) {
              cy.url().should('include', `${identityUrl}/login`);
              // Fill in the email and click Next
              cy.get('input[name="identifier"]').type(userCredentials.email);
              cy.get('button').contains('Next').click();

              // Wait for the password form to appear
              cy.get('input[name="password"]').should('be.visible');
              // Fill in the password and submit
              cy.get('input[name="password"]').type(userCredentials.password, {
                log: false,
              });
              cy.get('button').contains('Submit').click();

              // Wait for the flow to redirect back to the application.
              cy.origin(
                Cypress.config('baseUrl'),
                {
                  args: {
                    url,
                  },
                },
                ({ url }: { url: string }) => {
                  cy.get('[role="main"]').should('exist');
                  cy.url().should('include', url);
                }
              );
            } else {
              // Legacy login flow.
              fillLegacyLoginFormWithRetry(userCredentials);

              // Wait for the flow to redirect back to the application.
              cy.get('[role="main"]').should('exist');
              cy.url().should('include', url);
            }
          }
        }
      );
    }

    // For backwards compatibility.
    if (
      isFeatureSupported('12.0.0') ||
      Cypress.config('experimentalSessionAndOrigin')
    ) {
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
        `We recommend to use "cy.session" to reduce the time to log in between tests. Make sure to have at least Cypress v12 or enable it via "experimentalSessionAndOrigin" for older Cypress versions.`
      );

      authCallback();
    }

    if (commandOptions.initialRoute) {
      cy.visit(`${Cypress.config('baseUrl')}${commandOptions.initialRoute}`);
      cy.url().should('include', commandOptions.initialRoute);
    }
  });
}

/* Utilities */

const legacyMaxLoginAttempts = Cypress.config('maxLoginAttempts') ?? 3;
function fillLegacyLoginFormWithRetry(userCredentials: LoginCredentials) {
  // Intercept the login request so we can retry it if we receive a TOO_MANY_REQUESTS status code
  cy.intercept('POST', '**/tokens').as('loginRequest');

  function getRandomDelayInSeconds() {
    const minSeconds = 0.5;
    const maxSeconds = 1.5;

    return (Math.random() * (maxSeconds - minSeconds) + minSeconds) * 1000;
  }

  function attemptLogin(attemptsLeft: number) {
    if (attemptsLeft <= 0) {
      throw new Error(
        `All login attempts exhausted. Please check your credentials.`
      );
    }

    cy.log(`Attempts left: ${attemptsLeft}`);

    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('input[name=email]')
      .clear({ force: true })
      .type(userCredentials.email, { force: true });
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('input[name=password]')
      .clear({ force: true })
      .type(userCredentials.password, {
        log: false,
        force: true,
      });
    cy.get('button').contains('Sign in').click({ force: true });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cy.wait('@loginRequest').then((interception: any) => {
      const { statusCode } = interception.response;
      cy.log('Login request status code:', statusCode);

      if (statusCode === HTTP_STATUS_CODES.TOO_MANY_REQUESTS) {
        // We wait for something between 0.5 and 1.5 seconds before retrying
        cy.wait(getRandomDelayInSeconds());
        attemptLogin(attemptsLeft - 1);
      } else {
        cy.log('Login successful');
      }
    });
  }

  attemptLogin(legacyMaxLoginAttempts);
}

export { loginByForm };
