---
'@commercetools-frontend/application-components': minor
'@commercetools-local/visual-testing-app': minor
'@commercetools-website/custom-applications': minor
'@commercetools-website/components-playground': minor
---

Add 2 new components: `<TabularMainPage>` and `<TabularDetailPage>`, exposed from `@commercetools-website/custom-applications`. Similarly to `<TabularModalPage>`, both components provide navigation through, for instance, `<TabHeader>` components. As opposed to `<TabularModalPage>` though, the components are not rendered as modal pages.

- `<TabularMainPage>`:
  A typical use case of the component is a main page with composition of links to the `<TabularDetailPage>`.
  Similar to `<TabularDetailPage>`, but with no back button and a white top bar.
  Requires wrapping with a `<Router>` component.

  Example use:

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

- `<TabularDetailPage>`:
  A typical use case of the component is a detail page with possibility to navigate back to `<TabularMainPage>`.
  Similar to `<TabularMainPage>`, but with a back button and a grey top bar.
  Requires wrapping with a `<Router>` component.

  Example use:

  ```jsx
  <TabularDetailPage
    title="Detail page"
    onPreviousPathClick={() => history.push('/starting-page')}
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
