---
'@commercetools-frontend/application-shell': minor
---

Document page titles now render a value according to the current location pathname, based on the following format:

- /project-key/products => products - project-key
- /project-key/products/new => products > new - project-key
- /project-key/products/123 => products > 123 - project-key
- /project-key/products/some/very/long/path => products > ... > path - project-key
- /account/projects => projects - Account
- /account/projects/new => projects > new - Account
- /account/projects/project-key => projects > project-key - Account
- /login => login - Merchant Center

You can optionally override the title value by rendering the `<ApplicationHelmet>` component anywhere in your application (nested components take precedence in writing the value). and implementing a `renderPageTitle` function.

The `renderPageTitle` function accepts an object with the following values:

```ts
type Breadcrumb<Query extends {} = {}> = {
  suffix: string;
  paths: string[];
  location: TEnhancedLocation<Query>;
};
```

For example:

```js
import { ApplicationHelmet } from '@commercetools-frontend/application-shell';

const MyComponent = () => (
  <ApplicationHelmet renderPageTitle={() => `Custom title - Merchant Center`}>
    <div>Hello</div>
  </ApplicationHelmet>
);
```
