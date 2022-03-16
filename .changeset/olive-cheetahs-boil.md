---
'@commercetools-frontend/application-components': minor
'@commercetools-local/visual-testing-app': minor
'@commercetools-website/custom-applications': minor
'@commercetools-website/components-playground': minor
---

Add a new `<TabHeader>` component.
A composition of those components is meant to be used in the `<TabularModalPage>` component passed as `tabControls` prop. See example below:

```jsx
<TabularModalPage
    tabControls={
        <>
            <TabHeader to="/tab-one" label="Tab One" />
            <TabHeader to="/tab-two" label="Tab Two" />
        </>
    }
    ...
/>
```
