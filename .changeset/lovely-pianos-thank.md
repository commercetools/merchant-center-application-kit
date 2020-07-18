---
'@commercetools-frontend/application-config': patch
'@commercetools-frontend/mc-html-template': patch
'playground': patch
'@commercetools-website/custom-applications': patch
---

Fix parsing of application config to preserve full URLs when inferring CSP directives.
Furthermore, every environment variable referenced within the application config that has an empty value will be parsed as-is and it will not be rejected. Additionally, the fields passed to the `additionalEnv` object that are empty will be removed from the resulting environment and `window.app`.
