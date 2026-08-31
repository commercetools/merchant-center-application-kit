---
'@commercetools-frontend/application-shell': patch
---

Move the SaveToolbar portal target (`#mc-main-container-portal`) outside `<ApplicationShellSplitter>` and switch to `position: fixed` so the toolbar spans both splitter panes. Bump its `z-index` from `9999` to `10001` so it renders above the modal portals container (`z-index: 10000`), preventing modals from occluding the save toolbar.
