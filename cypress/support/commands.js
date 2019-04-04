import 'cypress-testing-library/add-commands';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('logout', () => {
  cy.visit('/logout');
});

Cypress.Commands.add('login', () => {
  // Clear and previous session data (cookie and local storage)
  cy.visit('/logout');
  cy.visit('/login');

  // Make sure all needed fields exist
  cy.getByText('Email').should('exist');
  cy.getByText('Password').should('exist');

  // Fill out the form from `.env` or environment variables (CI)
  cy.get('[name=email]').type(Cypress.env('LOGIN_USER'));
  cy.get('[name=password]').type(Cypress.env('LOGIN_PASSWORD'));

  // Sign in
  cy.get('[aria-label="Sign in"]').click();

  // Make sure that sign in worked
  cy.get('[data-test=top-navigation').should('exist');
});

Cypress.Commands.add('setDesktopViewport', () => {
  // we use ui-elements which only render elements to the DOM when they are visible to the user
  // this breaks our tests as cypress cannot locate them
  // set a large resolution to avoid as much scrolling as possible
  // this is likely to break again if you try to test elements that are hidden
  // really far off-screen, please consider if it really makes sense to test these
  // in lieu of the limited scope our e2e-tests are supposed to have
  cy.viewport(2560, 1440);
});
