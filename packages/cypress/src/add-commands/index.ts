import { Matcher as TMatcher } from '@testing-library/dom';
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
