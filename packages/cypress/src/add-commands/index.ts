import type { ApplicationConfig } from '@commercetools-frontend/application-config';

import { v4 as uuidv4 } from 'uuid';
import { OIDC_RESPONSE_TYPES, STORAGE_KEYS } from '../constants';
import { buildOidcScope } from '../helpers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Cypress: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const cy: any;

Cypress.Commands.add(
  'loginByOidc',
  ({ entryPointUriPath }: { entryPointUriPath: string }) => {
    Cypress.log({ name: 'loginByOidc' });

    const projectKey = Cypress.env('PROJECT_KEY');
    const sessionNonce = uuidv4();

    cy.task('customApplicationConfig', {
      entryPointUriPath,
    }).then((appConfig: ApplicationConfig['env']) => {
      const applicationId = appConfig.applicationId;
      const sessionScope = buildOidcScope({
        projectKey,
        permissions: appConfig.__DEVELOPMENT__?.permissions,
        teamId: appConfig.__DEVELOPMENT__?.teamId,
      });
      // Perform the login using the API, then store some required values into the browser storage
      // and redirect to the auth callback route.
      const options = {
        method: 'POST',
        url: `${appConfig.mcApiUrl}/tokens`,
        body: {
          email: Cypress.env('LOGIN_USER'),
          password: Cypress.env('LOGIN_PASSWORD'),
          client_id: applicationId,
          response_type: OIDC_RESPONSE_TYPES.ID_TOKEN,
          scope: sessionScope,
          state: sessionNonce,
          nonce: sessionNonce,
        },
        followRedirect: false,
      };
      cy.request(options).then((res: { body: { redirectTo: string } }) => {
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
          },
        });
      });
    });
  }
);
