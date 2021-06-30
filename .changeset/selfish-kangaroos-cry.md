---
'@commercetools-frontend/application-shell': patch
---

Previously when a menu item had sub-links, clicking on the item would only expand the group of sub-links, making the main menu link not usable.

Now when the item group is collapsed, clicking on the main item the first time expands the group of sub-links. **At this point the main menu item becomes a normal link** and can be used as expected.
