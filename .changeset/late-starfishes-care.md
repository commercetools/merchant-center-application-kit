---
'merchant-center-application-template-starter': major
'@commercetools-frontend/application-config': major
'@commercetools-frontend/application-shell': major
'@commercetools-frontend/application-shell-connectors': major
'@commercetools-frontend/mc-dev-authentication': major
'@commercetools-frontend/mc-html-template': major
'@commercetools-frontend/mc-scripts': major
'playground': major
'@commercetools-local/visual-testing-app': major
'@commercetools-website/custom-applications': major
---

Remove `mc-scripts extract-intl` command in favor of the official `@formatjs/cli` package.
We recommend to update your script to extract Intl messages to use the `formatjs extract` command.

See full release notes: https://docs.commercetools.com/custom-applications/releases/2020-10-14-custom-applications-v17
