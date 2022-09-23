import {
  loginByForm,
  loginByOidc,
  type CommandLoginOptions as TCommandLoginOptions,
} from './login';

export type CommandLoginOptions = TCommandLoginOptions;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Cypress: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const cy: any;

Cypress.Commands.add(
  'loginToMerchantCenter',
  (commandOptions: CommandLoginOptions) => {
    Cypress.log({ name: 'loginToMerchantCenter' });

    const baseUrl = new URL(Cypress.config('baseUrl'));

    if (baseUrl.hostname === 'localhost') {
      loginByOidc(commandOptions);
    } else {
      loginByForm(commandOptions);
    }
  }
);

Cypress.Commands.add('loginByOidc', (commandOptions: CommandLoginOptions) => {
  Cypress.log({ name: 'loginByOidc' });
  cy.log(
    'We recommend to not to use the command "cy.loginByOidc" directly. Instead use the more generic "cy.loginToMerchantCenter" command as it automatically detects which login mechanism to use.'
  );

  loginByOidc(commandOptions);
});
