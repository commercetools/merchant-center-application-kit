# codemod

See root `AGENTS.md` for monorepo-wide context.

## Purpose

CLI (`npx @commercetools-frontend/codemod`) that runs jscodeshift-based AST transforms to automate migration steps for downstream Custom Application and Custom View projects.

## Key Context

- Built on `jscodeshift` -- each transform is a standalone file in `src/transforms/` that receives an AST and returns modified source.
- Available transforms are registered in `src/cli.ts` with a name and description. Adding a new codemod means creating a transform file and adding an entry to that array.

## How To Work Here

This package has its own build step (`pnpm --filter @commercetools-frontend/codemod run build`) which runs `tsc` directly. It is **not** built by preconstruct -- it is explicitly excluded in the root `package.json` preconstruct config.

To test a transform during development:

```sh
pnpm --filter @commercetools-frontend/codemod run build
node packages/codemod/bin/mc-codemod.js <transform-name> <glob-pattern>
```

Use `--dry-run` to preview changes without writing files.

No unit tests exist in this package.

## Divergences from Root

- Build uses `tsc` (outputs to `build/`) instead of preconstruct (which outputs to `dist/`). The root `pnpm build` script runs the codemod build as a separate step after preconstruct finishes.
- The bin entrypoint (`bin/mc-codemod.js`) sets `NODE_ENV=production` before requiring the built output, unlike other CLI packages.
