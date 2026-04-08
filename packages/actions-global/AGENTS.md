# @commercetools-frontend/actions-global

## Purpose

Redux thunk action creators and React hooks for dispatching notifications and handling API errors in Merchant Center Custom Applications.

## Key Context

- This is the primary consumer-facing API for notifications. Custom Applications use hooks like `useShowNotification`, `useShowApiErrorNotification`, and `useOnActionError` rather than dispatching to `@commercetools-frontend/notifications` directly.
- `handleActionError` is a thunk that classifies errors: 401 triggers a redirect to `/logout`, 404 is silently swallowed, API errors show an error notification, and non-API errors are reported to Sentry and shown as unexpected error notifications.
- Success notifications (`kind: 'success'`) auto-dismiss after 5 seconds by default. All other kinds persist until manually dismissed.
- Depends on `@commercetools-frontend/browser-history` for programmatic navigation (e.g., logout redirect on 401) and `@commercetools-frontend/sentry` for error reporting.
- Peer-depends on `redux`, `react-redux`; uses `redux-thunk` for async action creators.

## How To Work Here

Follows root workflows. Test with `pnpm --filter @commercetools-frontend/actions-global run test`.

## Gotchas

- The `handleActionError` thunk accesses `window.app.env` to decide whether to console-log errors. Tests that exercise this code path must set up the `window.app` global.
- The hooks (`useShowNotification`, etc.) wrap `useDispatch` from `react-redux`, so they require a Redux `Provider` ancestor. Tests must render within a store provider.
