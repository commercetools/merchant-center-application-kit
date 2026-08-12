///<reference path="../global.d.ts" />

import '@testing-library/cypress/add-commands';
import '@commercetools-frontend/cypress/add-commands';

Cypress.Commands.add('setDesktopViewport', () => {
  // we use ui-elements which only render elements to the DOM when they are visible to the user
  // this breaks our tests as cypress cannot locate them
  // set a large resolution to avoid as much scrolling as possible
  // this is likely to break again if you try to test elements that are hidden
  // really far off-screen, please consider if it really makes sense to test these
  // in lieu of the limited scope our e2e-tests are supposed to have
  cy.viewport(2560, 1440);
});
