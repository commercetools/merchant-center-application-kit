# Merchant Center Application Kit

## What This Repo Does

Monorepo providing the SDK, build tools, and runtime shell for developing
**Merchant Center customizations** (Custom Applications and Custom Views).
These packages are the foundation layer that every Merchant Center
customization depends on — they handle authentication, routing, permissions,
i18n, and API communication so individual apps focus on business logic.

## Architecture

### Package categories

- **Runtime packages** (`packages/application-shell`, `application-shell-connectors`,
  `permissions`, `sdk`, `react-notifications`, `notifications`, `sentry`,
  `browser-history`): Compose the running application — shell provides Redux
  store + Apollo Client, connectors bridge to APIs, sdk builds requests.
- **Configuration & build** (`packages/application-config`, `mc-scripts`,
  `mc-html-template`, `babel-preset-mc-app`, `jest-preset-mc-app`,
  `eslint-config-mc-app`): Toolchain consumed by downstream apps.
- **UI & i18n** (`packages/application-components`, `i18n`, `l10n`, `assets`,
  `constants`): Shared components, translations, and localization data.
- **Scaffolding** (`packages/create-mc-app`, `packages/codemod`,
  `application-templates/*`, `custom-views-templates/*`): CLI + starter
  templates for bootstrapping new customizations.
- **Backend** (`packages-backend/express`, `loggers`, `eslint-config-node`):
  Lightweight Node.js server helpers for custom backend proxies.

### Data flow

1. `application-shell` renders the chrome (nav, user menu, error boundaries)
   and initializes Redux, Apollo, react-intl, and feature flags (LaunchDarkly).
2. Custom app code uses hooks from `application-shell-connectors`
   (`useMcQuery`, `useMcMutation`) to call GraphQL APIs.
3. Requests flow through Apollo Client → MC API Gateway, with the target API
   selected by the `X-Graphql-Target` header.
4. Five distinct GraphQL targets exist — each backed by a different service:
   - **mc** — user, team, organization metadata
   - **ctp** — Composable Commerce (products, orders, etc.)
   - **settings** — custom app/view configuration and deployment
   - **core** (aka `administration`) — internal administration queries
   - **proxy** — forward-to endpoint for secure backend calls (uses a
     different base URL)

### Build pipeline

Packages are built with **preconstruct** (CJS + ESM). The `pnpm build` script
first compiles i18n data, then runs preconstruct, then builds the codemod CLI
separately. In development, `preconstruct dev` (run via postinstall) creates
symlinks so packages can be consumed without building.

## How To Make Changes

### Verify your work

| Task                   | Command                                              | Notes                                                      |
| ---------------------- | ---------------------------------------------------- | ---------------------------------------------------------- |
| Tests (single package) | `pnpm --filter @commercetools-frontend/FOO run test` | Uses jest.test.config.js; test files are `*.spec.{ts,tsx}` |
| Tests (all)            | `pnpm test`                                          | Runs all unit/component tests                              |
| Typecheck              | `pnpm typecheck`                                     | Runs two passes: main tsconfig + tsconfig.test.json        |
| Lint (JS + CSS)        | `pnpm lint`                                          | Uses jest-runner-eslint and jest-stylelint-runner          |
| Build packages         | `pnpm build`                                         | Required before playground or template testing             |

### Common workflows

#### Adding or modifying a GraphQL query

1. Create/edit the `.graphql` file with the correct target suffix:
   `*.mc.graphql`, `*.ctp.graphql`, `*.settings.graphql`, `*.core.graphql`,
   or `*.proxy.graphql`.
2. Run the matching codegen: `pnpm generate-types:mc` (or `:ctp`, `:settings`,
   `:core`, `:proxy`). This updates TypeScript types in the `generated/`
   directories of affected packages.
3. Import the generated types and use them with the appropriate hook
   (`useMcQuery` / `useMcMutation`).

Lint-staged automatically triggers the correct codegen on commit based on the
file suffix, but run it manually during development to get types immediately.

#### Adding or updating i18n messages

1. Define messages in a `*messages.ts` file using `react-intl` `defineMessages`.
2. Run `pnpm extract-intl` to extract all messages into
   `packages/i18n/data/core.json`.
3. Run `pnpm compile-intl` to compile translations (also happens during build).

#### Adding a changeset for a PR

Run `pnpm changeset`, select affected packages and semver bump type, and write
a short changelog entry. The changeset YAML file is committed with your PR.
All packages in the repo use **fixed versioning** — they all share one version
number and bump together.

#### Testing changes in the playground

1. Run `pnpm build:watch` in one terminal (or `pnpm build` once).
2. Run `pnpm playground:start` in another terminal.
   The playground app consumes built package output, not source — you must
   build first.

## Boundaries

- **Published packages** (semver obligations): all `@commercetools-frontend/*`,
  `@commercetools-backend/*`, and `@commercetools-applications/*` packages are
  published to npm. Breaking changes require major version bumps and migration
  guides in `<package>/migrations/vN.md`.
- **Internal-only**: `playground`, `visual-testing-app`,
  `website-components-playground`, `@commercetools-local/*` packages are
  workspace-only and not published.
- **Upstream boundary**: the Merchant Center host (proxy router, API gateway)
  and commercetools Composable Commerce APIs are external. This repo provides
  the client-side SDK and shell — it does not own the APIs themselves.
- **UI Kit boundary**: UI primitives live in the separate
  [ui-kit](https://github.com/commercetools/ui-kit) repo. This repo depends
  on `@commercetools-uikit/*` packages but does not modify them.

## Gotchas

- GraphQL files **must** use the correct target suffix (`.mc.graphql`,
  `.ctp.graphql`, etc.) — a plain `.graphql` file will not trigger codegen
  and its types will be silently missing.
- Lint-staged triggers codegen when committing `.graphql` files — if codegen
  requires env vars (`MC_ACCESS_TOKEN`, `CTP_PROJECT_KEY`), commits touching
  GraphQL files will fail without them. See CONTRIBUTING.md for setup.
- Linting runs through **jest-runner-eslint / jest-stylelint-runner**, not
  eslint/stylelint CLI directly. `pnpm lint` invokes Jest, which means
  Jest-specific flags apply (e.g. `--onlyChanged`, `--reporters`).
- `preconstruct dev` (via postinstall) must run before packages can be imported
  locally. If imports break after a fresh `pnpm install`, check that
  postinstall ran successfully.
- `packages/application-config/schema.json` is auto-generated — editing it by
  hand will be overwritten. Lint-staged regenerates it on commit when the
  source changes.
- The playground and template apps consume **built** package output (not
  source). Always `pnpm build` (or `pnpm build:watch`) before running them.
- All packages use **fixed versioning** via changesets — a bump to any package
  bumps all of them. Do not manually edit version numbers.

## Conventions

- Test files use `*.spec.{ts,tsx}` — not `*.test.*`.
- i18n message definitions go in files named `*messages.ts`.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/)
  (enforced by commitlint via husky).
- Major version bumps must include a migration guide at
  `<package>/migrations/vN.md`.

## Further Reading

- [Custom Applications docs](https://docs.commercetools.com/merchant-center-customizations/custom-applications) — how downstream consumers use this kit.
- [MC Proxy Router architecture](https://docs.commercetools.com/merchant-center-customizations/concepts/merchant-center-proxy-router) — explains the multi-SPA hosting model.
- `CONTRIBUTING.md` in repo root — release process, GraphQL schema setup, local development workflow.
- Individual package READMEs in `packages/` — per-package API documentation.
