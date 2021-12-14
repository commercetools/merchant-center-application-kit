---
'merchant-center-application-template-starter': major
'@commercetools-frontend/mc-dev-authentication': major
'@commercetools-frontend/mc-html-template': major
'@commercetools-frontend/mc-scripts': major
'playground': major
'@commercetools-local/visual-testing-app': major
---

Following breaking changes were introduced:

- In `mc-scripts`, the `build` command additionally compiles the `index.html` by default.
- Running the `compile-html` command by default should not be necessary anymore. However, you can pass `--build-only` to the `build` command to opt-out of the compilation step, in case you want to run it separately, for example to use the `--transformer`.
- Running the `compile-html` command by default does not print to `stdout` the JSON string with the security headers. You can opt into the old behavior by passing the `--print-security-headers` option.
- The `--inline-csp` of `compile-html` has been dropped, as it's now the built-in behavior.
- The `dist` folder created by the `build` command has been removed. Instead, the `build` command writes the production bundles directly into the `public` folder.

For more information see [Release notes v21](https://docs.commercetools.com/custom-applications/releases/2022-01-25-custom-applications-v21).
