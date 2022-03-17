---
'@commercetools-frontend/application-components': minor
'@commercetools-local/visual-testing-app': minor
'@commercetools-website/custom-applications': minor
'@commercetools-website/components-playground': minor
---

Add 2 new components: `<TabularMainPage>` and `<TabularDetailPage>` providing navigation through for instance `TabHeader` components. Both pages, as opposed to `<TabularModalPage>`, are not rendered within a modal.

Example use of `<TabularMainPage>`:

```jsx
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
</TabularMainPage>
```

Example use of `<TabularDetailPage>`:

```jsx
<TabularDetailPage
  title="Detail page"
  onClose={() => history.push('/starting-page')}
  previousPathLabel="Go back"
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
</TabularDetailPage>
```
