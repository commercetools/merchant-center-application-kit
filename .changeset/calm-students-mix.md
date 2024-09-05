---
'@commercetools-frontend/application-shell': patch
---

When the submenu has a text link that wraps to the next line, the vertical position of the submenu is adjusted, causing the submenu submenu position to be recalculated and as a result, hidden.
This change fixes the issue by adding a 12-pixel buffer to the height calculation when determining if the submenu fits within the viewport below the menu item, this value accounts for the padding introduced on link hover.
