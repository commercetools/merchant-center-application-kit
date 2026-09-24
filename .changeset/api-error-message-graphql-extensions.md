---
'@commercetools-frontend/react-notifications': patch
---

`ApiErrorMessage` now reads `errorByExtension` and `localizedMessage` from `error.extensions` as
well as from the top level of the error. REST responses carry these fields at the top level,
GraphQL responses nest them under `extensions`, and only the REST shape was handled — so an API
Extension that rejected a create or update with a `localizedMessage` had its message dropped on
every Merchant Center screen that uses GraphQL, replaced by the generic `InvalidInput` or
`InvalidField` text.

The locale lookup is unchanged: `localizedMessage[intl.locale]`, falling back to the error's plain
`message` when the user's interface language is not among the translations supplied by the
extension.
