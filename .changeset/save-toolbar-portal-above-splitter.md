---
'@commercetools-frontend/application-shell': patch
---

Move the SaveToolbar portal target (`#mc-main-container-portal`) from the authenticated shell grid into the splitter async wrapper, outside `Suspense` and `Splitter.Main`. This ensures the portal target escapes `container-type: inline-size` on `Splitter.Main` so `position: fixed` content spans both splitter panes, and sits at `z-index: 10001` above the modal portals container (`z-index: 10000`).
