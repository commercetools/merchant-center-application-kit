---
'@commercetools-frontend/application-components': minor
'@commercetools-local/visual-testing-app': minor
'@commercetools-website/custom-applications': minor
'@commercetools-website/components-playground': minor
---

Add two new layout components: `<TabularMainPage>` and `<TabularDetailPage>`.

These components are similar to the `<TabularModalPage>` but they are not rendered as a modal. However, the layout itself is very similar between all the tabular components.

Tabs must be rendered using the `<TabHeader>` component via the `tabControls` prop. A `<TabHeader>` is rendered as a link and it assumes the "tab content" is controlled and rendered using `<Route>` components.

# Usage

As the name implies, these components are meant to be used in different places.

The `<TabularMainPage>` is supposed to be used in one of the main application landing pages, as the top level component page. From a hierarchy point of view, there should be no parent pages.
The layout of this page can be recognized by the white background header and the gray content background.

Example:

```jsx
import {
  TabularMainPage,
  TabHeader,
} from '@commercetools-frontend/application-components';

<TabularMainPage
  title="Main page"
  tabControls={
    <>
      <TabHeader to="/tab-one" label="Tab One" />
      <TabHeader to="/tab-two" label="Tab Two" />
    </>
  }
>
  <Switch>
    <Route path={`/tab-one`}>
      <Tab1 />
    </Route>
    <Route path={`/tab-two`}>
      <Tab2 />
    </Route>
  </Switch>
</TabularMainPage>;
```

The `<TabularDetailPage>` is supposed to be used as a direct child of one of the main pages. Typically it's used as a detail page with multiple sub-pages (tabs).
The layout of this page can be recognized by the gray background header and the white content background. A back link in the header section is also required.

Example:

```jsx
import {
  TabularDetailPage,
  TabHeader,
} from '@commercetools-frontend/application-components';

<TabularDetailPage
  title="Detail page"
  onPreviousPathClick={() => history.push('/main')}
  previousPathLabel="Go back"
  tabControls={
    <>
      <TabHeader to="/detail/tab-one" label="Tab One" />
      <TabHeader to="/detail/tab-two" label="Tab Two" />
    </>
  }
>
  <Switch>
    <Route path={`/detail/tab-one`}>
      <Tab1 />
    </Route>
    <Route path={`/detail/tab-two`}>
      <Tab2 />
    </Route>
  </Switch>
</TabularDetailPage>;
```
