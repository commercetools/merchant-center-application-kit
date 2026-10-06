---
'@commercetools-frontend/application-shell': minor
'@commercetools-frontend/mc-html-template': minor
---

Name the header for cross-document view transitions, so cross-app navigation keeps it anchored instead of crossfading the whole page.

`@view-transition { navigation: auto; }` alone crossfades the entire document. Holding an element in place additionally requires the same `view-transition-name` on both the outgoing and the incoming document. The outgoing page has already replaced the HTML skeleton with the React chrome by the time it navigates away, so the name is paired across the two: `<AppBar>` and `.loading-skeleton__header` both become `mc-header`. The group is given `animation-duration: 0s` so the header snaps rather than dissolving between its two states.

Only the header is named. `view-transition-name` makes an element a stacking context, and the navbar and main content area were not stacking contexts before — naming them trapped the navbar's fly-out submenus and the content area's portals, which could no longer paint above the header. `<AppBar>` already carried `z-index: 20000`, so naming it changes no layering.

Browsers without cross-document view transition support are unaffected and keep the existing behaviour.
