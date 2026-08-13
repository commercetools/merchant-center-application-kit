# playground

See root `AGENTS.md` for monorepo-wide context.

## Purpose

Internal Custom Application used for local development testing of the application-kit packages (shell, components, connectors, SDK).

## Key Context

- Full Custom Application wired into `ApplicationShell` with authentication, permissions, and routing — serves as a realistic integration test bed.
- Built with `mc-scripts` (webpack-based), not Vite like other internal apps in this repo.
- Entry point is `src/components/entry-point/entry-point.jsx`, which initializes `ApplicationShell` with Apollo Client, i18n messages, and browser history.
- Routes exercise state machines CRUD, notifications, echo server (forward-to proxy), formatters, and custom panels/views.
- The echo server view requires a local Express server (`pnpm start:server`) and an HTTPS tunnel (e.g. ngrok) — see `README.md` for env var setup.
- Configured via `custom-application-config.mjs` (not the standard `.env` + JSON config pattern).
- Deployed to Vercel for preview environments (`vercel.json` present); Vercel build runs `pnpm run -w build && pnpm build`.
- **This app is what the e2e Chromatic snapshots capture.** The playground specs in `cypress/e2e/playground/` screenshot these routes running, so changing a view here moves a snapshot in the `app-kit-e2e-playground` project with nothing in this directory to hint at it. See `docs/chromatic-e2e-playground.md`.

## How To Work Here

| Task            | Command                                                         | Notes                                     |
| --------------- | --------------------------------------------------------------- | ----------------------------------------- |
| Start (dev)     | `pnpm playground:start` (from root) or `pnpm start` (from here) | Requires `pnpm build` first               |
| Build           | `pnpm playground:build` (from root) or `pnpm build` (from here) | Uses `mc-scripts build`                   |
| Start prod mode | `pnpm playground:start:prod:local` (from root)                  | Compiles HTML with local auth transformer |
| Echo server     | `pnpm start:server` (from here)                                 | Needs HTTPS tunnel for forward-to proxy   |

## Gotchas

- This app consumes **built** package output, not source. You must run `pnpm build` (or `pnpm build:watch`) at the repo root before starting.
- Uses JSX files (`.jsx`), not TypeScript — unlike most of the repo.
