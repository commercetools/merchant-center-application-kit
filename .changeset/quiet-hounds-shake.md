---
'@commercetools-frontend/application-shell': minor
'@commercetools-frontend/i18n': minor
---

Start the i18n catalogue load from the browser locale at parse time, instead of waiting for `FetchLoggedInUser` to resolve `user.language`. Measured on integration, the user query plus the commit that follows it costs a median of 285 ms, and the catalogue load can now overlap it. `user.language` remains authoritative and replaces the hint when it arrives.

`AsyncLocaleData` now reports the locale its loaded messages actually belong to, rather than the requested locale. Previously a locale change reported the new locale next to the previous locale's messages, which rendered wrong-language text and untranslated ids until the second catalogue resolved.
