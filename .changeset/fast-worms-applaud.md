---
'merchant-center-application-template-starter': patch
'@commercetools-frontend/application-shell': patch
'playground': patch
---

## Improve starter template and playground

- use <field>AllLocales field instead of passing a data locale to the query.
- remove code for dispatching error notifications in case a query has errors. Instead, render the error in the component itself.
