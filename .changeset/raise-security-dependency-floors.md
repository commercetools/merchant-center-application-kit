---
'@commercetools-frontend/application-config': patch
'@commercetools-frontend/application-shell': patch
'@commercetools-frontend/i18n': patch
'@commercetools-frontend/l10n': patch
'@commercetools-frontend/mc-scripts': patch
'@commercetools-frontend/react-notifications': patch
---

Raise the minimum versions of dependencies with published security advisories.

- `dompurify` is now `^3.4.16` (`application-config`).
- `moment` is now `^2.31.0` (`application-shell`, `i18n`, `l10n`, `react-notifications`, `mc-scripts`).
- `sharp` is now `^0.35.5`, `vite` is now `~6.4.4` and `browserslist` is now `^4.28.7` (`mc-scripts`).

The new ranges stay in the same major version, so no code change is needed. Run your package manager's update command (for example `pnpm update`) to receive the patched versions.
