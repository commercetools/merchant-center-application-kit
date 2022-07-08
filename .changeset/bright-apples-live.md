---
'@commercetools-frontend/application-shell': patch
'@commercetools-frontend/i18n': patch
'@commercetools-frontend/l10n': patch
'@commercetools-frontend/mc-scripts': patch
---

Fix loading missing `moment` locale metadata for certain user locales. Now dates are correctly formatted according to the selected locale.
