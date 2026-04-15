# website-components-playground

See root `AGENTS.md` for monorepo-wide context.

## Purpose

Internal Vite app for interactively previewing `application-components` (dialogs, pages, drawers) outside of the Merchant Center shell, used for the documentation website.

## Key Context

- Renders `application-components` standalone — no `ApplicationShell`, no authentication, no Apollo. Uses `ThemeProvider` and `themesOverrides` directly.
- Each page in `src/pages/` demonstrates one component variant (e.g. `form-modal-page.tsx`, `tabular-detail-page.tsx`).
- Uses `@commercetools-frontend/browser-history` (`createEnhancedHistory`) for routing.
- Deployed to Vercel (`vercel.json` present); Vercel build runs `pnpm run -w build && pnpm build`.
- Dev server runs on port 8001 (`vite --port 8001`).

## How To Work Here

| Task          | Command                    | Notes                     |
| ------------- | -------------------------- | ------------------------- |
| Start (dev)   | `pnpm start` (from here)   | Serves on port 8001       |
| Build         | `pnpm build` (from here)   | `vite build`              |
| Preview build | `pnpm preview` (from here) | Serves build on port 8001 |

## Gotchas

- This app consumes **built** package output, not source. You must run `pnpm build` at the repo root before starting.
