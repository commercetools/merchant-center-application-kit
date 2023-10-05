---
'@commercetools-frontend/cypress': minor
---

Added new comands to manage `hover` events.

- `hover`: New chainable command to trigger a real `hover` event on the element. Cypress does not support this out-of-the-box ([reference](https://docs.cypress.io/api/commands/hover)).
  ```js
  cy.get('button').hover();
  ```
- `navigationMenuHover`: New command to trigger a `hover` event on a navigation menu item. This will make the sublinks of that menu item visible.
  ```js
  cy.navigationMenuHover('Discounts');
  ```
