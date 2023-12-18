import { Matcher as TMatcher } from '@testing-library/dom';
import { CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH } from '@commercetools-frontend/constants';
import {
  loginByForm,
  loginByOidc,
  isLocalhost,
  type CommandLoginOptions as TCommandLoginOptions,
} from './login';
import { realHover } from './real-hover';

export type CommandLoginOptions = TCommandLoginOptions;
export type Matcher = TMatcher;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Cypress: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const cy: any;

Cypress.Commands.add(
  'loginToMerchantCenter',
  (commandOptions: CommandLoginOptions) => {
    Cypress.log({ name: 'loginToMerchantCenter' });

    if (isLocalhost()) {
      loginByOidc(commandOptions);
    } else {
      loginByForm(commandOptions);
    }
  }
);

Cypress.Commands.add(
  'loginToMerchantCenterForCustomView',
  (
    commandOptions: Omit<
      CommandLoginOptions,
      'entryPointUriPath' | 'initialRoute'
    >
  ) => {
    Cypress.log({ name: 'loginToMerchantCenterForCustomView' });

    const projectKey = Cypress.env('PROJECT_KEY');

    loginByOidc({
      ...commandOptions,
      entryPointUriPath: CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH,
      initialRoute: `/${projectKey}/${CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH}`,
    });
  }
);

Cypress.Commands.add('loginByOidc', (commandOptions: CommandLoginOptions) => {
  Cypress.log({ name: 'loginByOidc' });
  cy.log(
    'We recommend not to use the command "cy.loginByOidc" directly. Instead, use the more generic "cy.loginToMerchantCenter" command as it automatically detects which login mechanism to use.'
  );

  loginByOidc(commandOptions);
});

Cypress.Commands.add('hover', { prevSubject: true }, realHover);

Cypress.Commands.add(
  'showNavigationSubmenuItems',
  (menuItemTextMatcher: Matcher) => {
    cy.findByTestId('left-navigation')
      .findByText(menuItemTextMatcher)
      .parents('[role="menuitem"]')
      .first()
      // Refers to the custom command "hover"
      .hover();
  }
);

// https://github.com/cypress-io/cypress/issues/136#issuecomment-342391119
Cypress.Commands.add(
  'getIframeBody',
  { prevSubject: 'element' },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ($iframe: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Cypress.Promise((resolve: any) => {
      resolve($iframe.contents().find('body'));
    });
  }
);
