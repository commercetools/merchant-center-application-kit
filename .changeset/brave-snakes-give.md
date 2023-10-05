---
'@commercetools-frontend/cypress': minor
---

Add new Cypress commands to manage real `hover` events, as Cypress events are simulated.

- `hover`: New chainable command to trigger a real `hover` event on the element. Cypress does not support this out-of-the-box ([reference](https://docs.cypress.io/api/commands/hover)).

  ```js
  cy.get('button').hover();
  ```

- `showNavigationSubmenuItems`: New command to trigger a `hover` event on a navigation menu item of the Merchant Center. This will make the submenu of that menu item visible.

  ```js
  cy.showNavigationSubmenuItems('Discounts');
  ```
