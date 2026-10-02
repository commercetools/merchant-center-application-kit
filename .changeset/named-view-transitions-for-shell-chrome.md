---
'@commercetools-frontend/application-shell': minor
'@commercetools-frontend/mc-html-template': minor
---

Name the shell chrome for cross-document view transitions, so cross-app navigation morphs the sidebar and header in place instead of crossfading the whole page.

`@view-transition { navigation: auto; }` alone crossfades the entire document. Morphing an element additionally requires the same `view-transition-name` on both the outgoing and the incoming document. The outgoing page has already replaced the HTML skeleton with the React chrome by the time it navigates away, so the names are paired across the two: `<NavBar>`/`.loading-skeleton__sidebar` as `mc-sidebar`, `<AppBar>`/`.loading-skeleton__header` as `mc-header`, and `<MainContainer>`/`.loading-skeleton__content` as `mc-content`.

Browsers without cross-document view transition support are unaffected and keep the existing behaviour.
