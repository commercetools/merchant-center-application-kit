---
'@commercetools-frontend/application-shell': minor
---

Every Merchant Center page now ideally display a human-readable title describing as detailed as possible, the location or context of the page.

Some important details captured in the title include:

- The project the user is in.
- Being in the products application.
- The product name the user is currently looking at.

You can optionally override the title value by rendering the `<ApplicationPageTitle>` component anywhere in your application (nested components take precedence in writing the value) and provide a `content` prop.

The `content` prop is an array that should take a string of description or strings of several descriptions you want to add to the title:

```ts
type ApplicationPageTitleProps = {
  content?: string[];
};
```

For example:

```js
import { ApplicationPageTitle } from '@commercetools-frontend/application-shell';
const MyComponent = () => (
  <ApplicationPageTitle content={['Custom title', 'Another custom title']}>
    <div>Hello</div>
  </ApplicationPageTitle>
);
```

Some examples of the formats should look like this:

| Syntax                     | Description                               | Human readable application mapping (per page)             |
| -------------------------- | ----------------------------------------- | --------------------------------------------------------- |
| /project-key/dashboard     | Dashboard - project-key - Merchant Center |                                                           |
| /project-key/products      | Products - project-key - Merchant Center  |                                                           |
| /project-key/products/new  | Products - project-key - Merchant Center  |                                                           |
| /project-key/products/<id> | Products - project-key - Merchant Center  | <product name> - Products - project-key - Merchant Center |
| /project-key/orders/<id>   | Orders - project-key - Merchant Center    | <order number> - Orders - project-key - Merchant Center   |
| /account/organizations     | Account - Merchant Center                 | Organizations - Account - Merchant Center                 |
| /login                     | Login - Merchant Center                   | Organizations - Account - Merchant Center                 |
| /login/forgot              | Login - Merchant Center                   | Forgot password - Merchant Center                         |
