# constants

Subdirectory context — supplements the root `AGENTS.md`. Only includes what
an agent needs to know to work safely in this package specifically.

## Purpose

Exports shared constants, TypeScript types, and enums (notification domains, GraphQL targets, HTTP headers, storage keys, regex validators) used across all Merchant Center application-kit packages and downstream custom applications.

## How To Work Here

Follow root conventions. Tests: `pnpm --filter @commercetools-frontend/constants run test`

## Gotchas

- `src/generated/settings.ts` contains generated types — do not hand-edit it.
- This package is a widely-imported leaf dependency; changes to exported values or types can have a large blast radius across the monorepo and downstream consumers.
