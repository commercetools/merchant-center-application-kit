---
'@commercetools-frontend/application-shell': patch
---

Move `#mc-main-container-portal` into `Splitter.Main` so the Cancel/Save bar stays as wide as the main column when the AI chat opens. If the splitter is not mounted, the same id is still rendered and pinned to the bottom of the window.
