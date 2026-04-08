# @commercetools-frontend/react-notifications

## Purpose

React components for rendering notification UI (global, page, and side domains), consumed by the application shell to display error, warning, info, and success messages.

## Key Context

- Connects to Redux via `react-redux` selectors that read from `state.notifications`. The selectors use `reselect` for memoization and filter by notification domain (global, page, side).
- Global notifications are capped at one visible at a time (`.slice(0, 1)` in the selector).
- Supports custom notification components via `NotificationProviderForCustomComponent`, which uses React context to let applications register their own renderers for specific notification kinds.
- Depends on `@commercetools-uikit/*` components for styled notification rendering and `@emotion/react` + `@emotion/styled` for CSS-in-JS.
- Uses `moment` and `moment-timezone` for timestamp formatting in error notifications.
- Peer-depends on `react-router-dom` v5 and `react-intl` v7.

## How To Work Here

Follows root workflows. Test with `pnpm --filter @commercetools-frontend/react-notifications run test`.

## Gotchas

- The `Notifier` component dispatches a notification on mount and dismisses it on unmount. It intentionally uses an empty dependency array in its `useEffect` — do not add dependencies or it will fire on every render.
- Notification rendering is split into three separate sub-components (`NotificationsListGlobal`, `NotificationsListPage`, `NotificationsListSide`), each with its own selector and supported notification kinds. Adding a new notification kind requires updating the correct sub-component's switch statement.
