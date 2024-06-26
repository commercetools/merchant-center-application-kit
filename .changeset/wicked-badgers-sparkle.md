---
'@commercetools-frontend/mc-scripts': minor
---

`ENABLE_I18N_MESSAGE_COMPILATION` has been renamed to `DISABLE_I18N_MESSAGE_COMPILATION`. With this change, the build command will now attempt to compile translation files located in the `/i18n/data` directory by default. If an error occurs during this process, the original files will be used for the bundle instead. Additionally, a warning message will be displayed in non-CI environments.
