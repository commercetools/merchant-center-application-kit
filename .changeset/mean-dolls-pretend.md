---
'@commercetools-frontend/application-shell': patch
---

The `test-utils` package used for rendering apps in the test environment creates an _in-memory_ router by default. We're adding a new property to it ([getUserConfirmation](https://v5.reactrouter.com/web/api/MemoryRouter/getuserconfirmation-func)) to cover for cases when logic wants to be used before a navigation is executed (eg: "warn on leave").
