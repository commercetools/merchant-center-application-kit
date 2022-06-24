---
'@commercetools-frontend/application-shell': patch
---

Fixed aria role names.

We were using invalid role names in some of the component's elements.

Special mention to the element wrapping the notifications as it now uses the aria-live [attribute](https://www.w3.org/TR/wai-aria/#aria-live) (with **polite** value).
