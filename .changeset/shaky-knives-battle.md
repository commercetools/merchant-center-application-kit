---
'@commercetools-frontend/application-shell': patch
---

Fix custom applications merging into correct navbar group and preserve group properties

- Merge custom applications into group 3 (commerce) instead of group 2
- Preserve navbar group label and isNew properties when merging custom applications
