---
'@commercetools-frontend/mc-html-template': major
---

Remove [deprecated Merchant Center hostnames](https://docs.commercetools.com/merchant-center/releases/2021-01-11-merchant-center-has-changed-its-url) from default CSP config.<br/>
This change should not affect your Custom Application because the `custom-application-config.json` already implies and provides the correct hostnames in the CSP directives.
