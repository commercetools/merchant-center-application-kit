---
'@commercetools-frontend/application-shell': patch
---

When using the `<ApplicationShellProvider>` (for **internal usage**, you probably only need the `<ApplicationShell>`), the `environment` prop is not being coerced, when passing it as `environment={window.app}`, causing possible values to be strings (for example `"false"`).
