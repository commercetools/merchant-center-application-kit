---
'merchant-center-application-template-starter': minor
---

Rewrite starter template from scratch, to provide a better first-time experience to new developers working on Custom Applications.

Below an overview of the most important changes:

- The template now has more built-in dev tools, like ESLint and Prettier.
- The template README has been cleaned up a bit.
- The template uses the new [React JSX transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html).
- The template uses the new [menu links in application config](https://docs.commercetools.com/custom-applications/development/menu-links#menu-links-in-application-config).
- The template has a nicer landing/welcome page with useful links to get started.
- The template has a `channels` page, that fetches channels and renders them in a table. This is a good showcase of some of our best practices, for example to use Hooks, to use GraphQL, to use notifications, to render data in a table (with pagination), etc.
- The template has RTL tests, including mocking GraphQL and using test data.
