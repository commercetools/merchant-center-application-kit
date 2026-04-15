# browser-history

See root `AGENTS.md` for monorepo-wide context.

## Purpose

Creates and exports a singleton enhanced browser history instance (with query-string parsing) used by the Merchant Center shell for routing and by the sentry package for browser tracing.

## How To Work Here

Follow root conventions. This package has no tests and no package-specific scripts.

## Gotchas

- The history instance is a module-level singleton — importing this package in multiple places returns the same object. Tests that depend on history state must account for shared mutable state.
