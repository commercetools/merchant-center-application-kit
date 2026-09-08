---
'@commercetools-frontend/application-shell': patch
'@commercetools-frontend/constants': patch
---

Replace the `#mc-main-container-portal` fixed-position portal target with a `container-type: inline-size` declaration on the shell grid div. Components like `SaveToolbar` can now use `100cqw` units to size themselves to the main column width, which tracks the splitter pane when the AI chat panel is open. The `MC_MAIN_CONTAINER_PORTAL_ID` constant has been removed from `@commercetools-frontend/constants`.
