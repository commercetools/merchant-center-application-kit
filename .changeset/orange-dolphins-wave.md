---
'@commercetools-frontend/application-components': patch
'@commercetools-frontend/application-shell': patch
---

Fix layout issue with modal components when the underlying page has a scrolling position, causing the modal container position to "scroll" with the page position.

The expected behavior is for the modal page to always be correctly positioned and visible, regardless of the scrolling position of the underlying page.

To fix that, the `<PortalsContainer>` now uses `position: fixed` when a modal container opens.

The component now accepts some props to allow consumers to adjust the layout accordingly. However, for Custom Applications everything is pre-configured, so there is no action required.
