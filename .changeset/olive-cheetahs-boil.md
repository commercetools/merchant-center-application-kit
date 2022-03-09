---
'@commercetools-frontend/application-components': minor
'@commercetools-local/visual-testing-app': minor
'@commercetools-website/custom-applications': minor
'@commercetools-website/components-playground': minor
---

Add `TabHeader` and `TabList` components. A composition of those components is meant to be used in `Tabular Modal Page` passed as `tabControls` prop, e.g.

```jsx
<TabularModalPage
    tabControls={
        <TabList>
            <TabHeader to="/tab-one" label="Tab One" />
            <TabHeader to="/tab-two" label="Tab Two" />
        </TabList>
    }
    ...
/>
```
