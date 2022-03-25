---
'@commercetools-frontend/application-components': minor
'@commercetools-local/visual-testing-app': minor
'@commercetools-website/custom-applications': minor
'@commercetools-website/components-playground': minor
---

Add a new `<TabHeader>` component.

This component should be used to render tab elements within the tabular components, for example `<TabularModalPage>`.
A `<TabHeader>` is rendered as a link and it assumes the "tab content" is controlled and rendered using `<Route>` components.

```jsx
import {
  TabularModalPage,
  TabHeader,
} from '@commercetools-frontend/application-components';

<TabularModalPage
  tabControls={
    <>
      <TabHeader to="/tab-one" label="Tab One" />
      <TabHeader to="/tab-two" label="Tab Two" />
    </>
  }
  // ...
/>;
```
