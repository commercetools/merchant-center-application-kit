---
'@commercetools-frontend/application-components': patch
---

Resolve an issue in `<InfoDialog>`, `<ConfirmationDialog>`, and `<FormDialog>` where applying the `scale` size prop now correctly enforces only horizontal constraints, preventing them from occupying the entire vertical space.
