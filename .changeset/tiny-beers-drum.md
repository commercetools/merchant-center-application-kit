---
'@commercetools-frontend/application-components': major
'@commercetools-frontend/react-notifications': major
'@commercetools-frontend/application-shell': major
'@commercetools-frontend/mc-html-template': major
'@commercetools-frontend/constants': major
'@commercetools-local/playground': major
---

Remove Google Analytics tracking.
We no longer support tracking events to be sent to Google Analytics in case the `trackingGtm` value was provided to the `additionalEnv` object of the Custom Application config.

- The `GtmContext` and `GtmUserLogoutTracker` exports have been removed from `@commercetools-frontend/application-shell`.
- The `trackingEventList` prop has been removed from the `<ApplicationShell>` component.
- The `track` object has been removed from the `onMenuItemClick` prop function signature of the `<ApplicationShell>` component.
- The `data-track-*` attributes are not longer supported. If you have been using them please remove them from your components.
