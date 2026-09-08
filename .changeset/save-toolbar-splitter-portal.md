---
'@commercetools-frontend/application-shell': patch
'@commercetools-frontend/actions-global': patch
---

Move `#mc-main-container-portal` into `Splitter.Main` so the Cancel/Save bar stays as wide as the main column when the AI chat opens. Simplify the portal div to minimal stacking (no full-screen overlay). Add `container-type: inline-size` to the shell grid div so `100cqw` is available as a stable width reference in both splitter and fallback paths.
