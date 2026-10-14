---
'@commercetools-frontend/mc-html-template': patch
---

Remove the "Sorry, this is taking an unusually long time." notice from the loading screen. On slow connections it appeared on almost every cold load and added alarm without telling the user anything useful, since the skeleton already shows that the page is loading. The stylesheet-gate deadline is unchanged.
