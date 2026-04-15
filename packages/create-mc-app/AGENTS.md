# create-mc-app

See root `AGENTS.md` for monorepo-wide context.

## Purpose

CLI (`npx @commercetools-frontend/create-mc-app`) that scaffolds new Custom Application and Custom View projects from starter templates, consumed by external developers bootstrapping Merchant Center customizations.

## Key Context

- Uses `commander` for CLI parsing and `listr2` for task orchestration.
- Templates live outside this package in `application-templates/` and `custom-views-templates/` at the repo root. The CLI shallow-clones this repo at a given tag/branch, then copies the selected template folder into the user's project directory.
- After copying, it patches `package.json`, the application config, and constants files to personalize the scaffolded project, then optionally runs dependency installation.
- Has its own pinned `prettier` dependency (used at runtime to format generated files), separate from the repo-wide Prettier.

## How To Work Here

No unit tests exist in this package. Verify changes by running the CLI manually:

```sh
node packages/create-mc-app/bin/cli.js my-app
```

Build is handled by preconstruct (same as most packages). No package-specific build command needed beyond the root `pnpm build`.

## Gotchas

- Template names and application types are hardcoded in `src/constants.ts`. Adding a new template requires updating both the constants and the corresponding template directory at the repo root.
- The download task clones the entire repo into a temp directory at the specified `--template-version` (default: `main`). If the tag or branch does not exist, the error comes from `git clone`, not from this package's validation.
