---
'merchant-center-application-template-starter': minor
'@commercetools-frontend/application-components': minor
'playground': minor
'@commercetools-local/visual-testing-app': minor
'@commercetools-website/custom-applications': minor
'@commercetools-website/components-playground': minor
---

Introducing the **Stacking Layer System**.

# Background

Components such as modal pages, dialogs, etc. are rendered using a "modal" container. These containers are then rendered within a special container called `portals-container`.

Up until now, rendering these components required to define things like `zIndex` or `level` props, to imperatively determine how the component will be visible.
This was required as the modal containers are positioned `absolute` and finding the correct `z-index` value is important.

However, it's the responsibility of the developer to "pick" the correct values which is error prone. In fact, choosing a wrong `z-index` results in the modal to not be visible and thus leading to UI bugs.

A better and more reliable approach would be for the Custom Application to automatically determine the correct `z-index` values for every modal container rendered on the page.

# Stacking Layer System

To solve this issue, a Custom Application now implements a **Stacking Layer System** to automatically determine and apply the correct `z-index` values for every modal container.

Therefore, it is not necessary anymore to explicitly provide the `zIndex` and `level` props to the modal pages or dialog components. The following props have been deprecated: `level` and `baseZIndex` (modal pages).

For backwards compatibility, the `zIndex` prop is still supported and, if defined, it will overwrite the `z-index` value using `!important`. Therefore we recommend to only define it if absolutely necessary, otherwise it's safe to remove it.
