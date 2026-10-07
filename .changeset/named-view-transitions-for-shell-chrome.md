---
'@commercetools-frontend/application-shell': minor
'@commercetools-frontend/mc-html-template': minor
---

Name the shell chrome for cross-document view transitions, so cross-app navigation keeps the sidebar and header anchored instead of crossfading the whole page.

`@view-transition { navigation: auto; }` alone crossfades the entire document. Holding an element in place additionally requires the same `view-transition-name` on both the outgoing and the incoming document. The outgoing page has already replaced the HTML skeleton with the React chrome by the time it navigates away, so the names are paired across the two: the skeleton regions carry `mc-sidebar`, `mc-header` and `mc-content`, and the matching React elements are named from a `pageswap` listener.

The React side is named only while the outgoing page is captured, rather than statically. `view-transition-name` makes an element a stacking context for as long as it is set, and neither the navbar nor the main content area was one before — naming them permanently trapped the navbar's fly-out submenus and the content area's portals, which could no longer paint above the header. The names are cleared once the transition settles, so a bfcache restore does not return with stale ones.

The outgoing snapshot of the header and sidebar is kept on screen for the duration instead of crossfading into the skeleton's placeholders. Reduced-motion now covers every transition group rather than only the root.

When an application is served by a proxy, a link to another application now loads the next page with `location.replace(location.href)` instead of `location.reload()`. Browsers never run view transitions on reloads, so the previous behaviour meant navigating through the sidebar never transitioned. The history entry is replaced in place either way, so back and forward behave as before.

Browsers without cross-document view transition support are unaffected and keep the existing behaviour.
