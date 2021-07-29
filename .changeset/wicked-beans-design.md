---
'@commercetools-frontend/application-components': minor
'@commercetools-frontend/application-shell': patch
---

Expose `<PortalsContainer>` from `@commercetools-frontend/application-components`. In case you happen to use some of the modal components outside of a Custom Application, you need to additionally render the `<PortalsContainer>`.

Moreover, to help managing modal components state (open/close), we now expose a state hook `useModalState`.
