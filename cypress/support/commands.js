import '@percy/cypress';
import '@testing-library/cypress/add-commands';
import '@commercetools-frontend/cypress/add-commands';

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

Cypress.Commands.add('setDesktopViewport', () => {
  // we use ui-elements which only render elements to the DOM when they are visible to the user
  // this breaks our tests as cypress cannot locate them
  // set a large resolution to avoid as much scrolling as possible
  // this is likely to break again if you try to test elements that are hidden
  // really far off-screen, please consider if it really makes sense to test these
  // in lieu of the limited scope our e2e-tests are supposed to have
  cy.viewport(2560, 1440);
});
