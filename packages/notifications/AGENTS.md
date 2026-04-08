# @commercetools-frontend/notifications

## Purpose

Framework-agnostic Redux reducer, middleware, and action creators for managing a notification queue, consumed by `@commercetools-frontend/react-notifications` and `@commercetools-frontend/actions-global`.

## Key Context

- This is the low-level notification state layer. It has no React dependency — only a peer dependency on Redux.
- The middleware assigns auto-incrementing numeric IDs to notifications, manages dismiss timers (`meta.dismissAfter`), and tracks `onDismiss` callbacks in a module-scoped `Map`.
- The reducer stores notifications as a flat array. New notifications are prepended (newest first).
- `react-notifications` provides the React UI layer, and `actions-global` provides the higher-level dispatching helpers. Changes here affect both.

## How To Work Here

Follows root workflows. Test with `pnpm --filter @commercetools-frontend/notifications run test`.

## Gotchas

- The middleware uses a module-scoped incrementing `id` counter and a `dismissCallbacksMap`. These are singletons — in test environments with shared module state, notification IDs will not reset between tests.
- Both the middleware and reducer must be registered in the Redux store for notifications to work. The application shell handles this wiring; do not expect this package to work standalone without both pieces.
