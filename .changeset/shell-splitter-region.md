---
'@commercetools-frontend/application-shell': minor
'@commercetools-frontend/application-components': patch
---

Add a shell-level resizable split pane layout powered by the Nimbus
`Splitter` component. When `@commercetools/nimbus` is installed, the
shell mounts a collapsible aside pane that consumers can fill and
control via Nimbus's `useRegion` hook, targeting the `REGIONS.MC_RIGHT_PANEL`
constant exported from `@commercetools-frontend/application-shell`.
Apps without Nimbus installed see no change — the splitter chunk
fails to load and the existing layout renders unchanged.

Overlay scoping is updated with CSS container query length units
(`100cqw`) so that modals and dropdowns stay within the main content
pane when the aside is open, with an `@supports` fallback for the
existing behavior.
