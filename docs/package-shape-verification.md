# Package Shape Verification

The Merchant Center Application Kit runs a check on every CI build that
validates the **published shape** of each publishable package — not the
workspace-linked source. It packs each package the same way npm would, then
runs two industry-standard linters against the resulting tarball.

This is the safety net for toolchain changes (preconstruct upgrades, dependency
upgrades, `package.json` `exports` map edits). It catches the class of bugs
that workspace symlinks hide: CJS/ESM interop breakage, missing `exports`
subpaths, types that don't match the runtime shape, and Node ESM resolution
errors.

## Quick Reference

```bash
# Run the check (CI runs this same command)
pnpm check:package-shape
```

Requires the target packages to be built first (`pnpm build`).

## How It Works

The script (`scripts/check-package-shape.mjs`) does the following for each
target package:

1. Runs `pnpm pack --json` to produce a tarball identical to what npm would
   publish.
2. Runs **`@arethetypeswrong/cli` (attw)** against the tarball — validates that
   TypeScript types resolve correctly across every module-resolution mode a
   consumer might use.
3. Runs **`publint`** against the tarball — validates `package.json` against the
   npm spec.
4. Cleans up the tarball.
5. Buffers per-package output and prints it in declared order so the log stays
   readable even when packages run in parallel.

A `REPORT_ONLY` constant at the top of the script controls whether findings
fail the check. While the baseline is being driven to zero, `REPORT_ONLY = true`:
CI surfaces findings but does not gate merges. Once the baseline reaches zero,
the flag flips to `false` and the check starts blocking.

## What Gets Tracked

The list of tracked packages is derived at runtime from `pnpm m ls`: every
workspace whose `package.json` is _not_ marked `"private": true`. That matches
the set the changeset bot ships in a release — today, 29 workspaces under
`@commercetools-frontend/*` and `@commercetools-backend/*`. Internal
workspaces (`@commercetools-applications/*`, `@commercetools-local/*`,
`@commercetools-website/*`) are excluded because they all carry
`"private": true`.

To add or remove a tracked package, flip `"private"` in the workspace's
`package.json` — the script picks the change up automatically.

## The Tools

### `@arethetypeswrong/cli` (attw)

Validates that TypeScript types resolve correctly under every module-resolution
mode a consumer might realistically use:

- **`node10`** — Legacy TS/bundler resolution; Jest defaults.
- **`node16` from CJS** — Modern Node when the consumer is CJS.
- **`node16` from ESM** — Modern Node when the consumer is ESM.
- **`bundler`** — Vite, Webpack 5, esbuild, Rspack.

attw walks the `exports` map, traces every entry point, and flags any mode
where types are missing, malformed, or describe a different shape than the
runtime actually exports.

### `publint`

Validates `package.json` correctness against the npm spec. It catches things
the spec says are wrong but the npm CLI doesn't enforce:

- Missing files referenced by `exports`
- Inconsistent `import`/`require` conditions
- `.js` files described as ESM but interpreted as CJS (and vice versa)
- Deprecated fields
- Wrong extensions for the declared `"type"`

Output is tiered — errors fail the check, warnings fail strict mode,
suggestions are informational only.

Both tools run against the same tarball `pnpm pack` produces, which is exactly
what npm would publish.

## When To Run It

The check runs automatically in CI on every PR. Run it locally before pushing
when:

- You upgrade preconstruct or change preconstruct configuration
- You edit a publishable package's `package.json` — especially `exports`,
  `main`, `module`, `types`, or `type`
- You add or rename a publishable entry point (e.g. a new preconstruct
  entrypoint)
- You bump a major dependency that touches the type graph
- You change the build scripts in `scripts/`

## Baseline (2026-05-20)

Snapshot of the findings on `main` after the check was introduced. A follow-up
cleanup will drive these to zero; until then `REPORT_ONLY` is true so the check
does not gate merges.

> **The baseline is a regression contract, not a punch list.** Listing a
> finding here does not mean it must be fixed in this ticket — these are the
> known-existing shape issues as of the date above, frozen so subsequent work
> (catalog adoption, metadata normalization, dependency upgrades) can be
> proven non-regressing. The expected outcome of a PR is **"no new findings"**,
> not "all findings resolved." If your PR adds a row to this table, that is
> the regression; if it leaves the existing rows unchanged, the baseline holds.
> Findings get removed from this list only when an explicit cleanup ticket
> resolves them.

| Package                                         | Tool    | Finding                                                                                                                                                                 |
| ----------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@commercetools-frontend/application-shell`     | attw    | `InternalResolutionError` on root entry and `/test-utils` subpath — bare relative imports in emitted `.d.ts` files fail `node16` ESM resolution. Both 4 modes affected. |
| `@commercetools-frontend/browser-history`       | attw    | `FalseExportDefault` on root — `.d.ts` uses `export default` where the JS file uses `module.exports =`. All 4 modes.                                                    |
| `@commercetools-frontend/cypress`               | attw    | `FalseExportDefault` on `/task` subpath. All 4 modes; root and `/add-commands` are clean.                                                                               |
| `@commercetools-frontend/mc-html-template`      | attw    | `FalseExportDefault` on `/webpack-html-template` subpath. All 4 modes; root is clean.                                                                                   |
| `@commercetools-frontend/mc-scripts`            | attw    | `FalseExportDefault` on `/webpack-loaders/i18n-message-compilation-loader` subpath. All 4 modes; six other entry points are clean.                                      |
| `@commercetools-frontend/assets`                | publint | `pkg.module should be ESM, but the code is written in CJS` — `module: "index.js"` declared but the file is CJS.                                                         |
| `@commercetools-frontend/babel-preset-mc-app`   | publint | Same root cause as `assets` — `module: "./index.js"` declared, file is CJS.                                                                                             |
| `@commercetools-frontend/jest-preset-mc-app`    | publint | Same root cause — `module: "./jest-preset.js"` declared, file is CJS.                                                                                                   |
| `@commercetools-frontend/jest-stylelint-runner` | publint | Same root cause — `module: "index.js"` declared, file is CJS.                                                                                                           |

**Total: 9 findings across 7 packages.** Two failure modes account for all of
them:

- **attw `FalseExportDefault`** on subpath entries with `module.exports =`-style
  JS but `export default`-style `.d.ts` (`browser-history`, `cypress/task`,
  `mc-html-template/webpack-html-template`,
  `mc-scripts/webpack-loaders/i18n-message-compilation-loader`).
- **publint `pkg.module should be ESM`** on the four preconstruct-excluded
  packages that ship plain CJS but declare a `module` field
  (`assets`, `babel-preset-mc-app`, `jest-preset-mc-app`,
  `jest-stylelint-runner`).

`application-shell` is the one structural outlier — `InternalResolutionError`
indicates bare relative imports in emitted `.d.ts` that fail Node16 ESM
resolution. Resolving it likely requires a relative-import rewriter in the
postbuild step.

## CI Integration

The check runs in the `lint_and_test` job
(`.github/workflows/main.yml`) immediately after the typecheck steps:

```yaml
- name: Check package shape
  run: pnpm check:package-shape
```

No additional services or secrets — just `pnpm pack`, `attw`, and `publint`.

## Tooling Notes

### fflate pinned to 0.8.2

`@arethetypeswrong/core@0.18.2` uses `fflate`'s streaming `Gunzip` API to
extract the packed tarball. `fflate@0.8.3` changed the Gunzip callback timing
("Support sync flushes" in the 0.8.3 release notes), which causes attw to
throw `Cannot read properties of undefined (reading 'filename')` on every
input. We pin `fflate` to `0.8.2` via a `pnpm.overrides` entry. The override
only affects the attw chain — nothing else in the repo depends on `fflate`.
Revisit the pin once attw releases a version compatible with `fflate@0.8.3`.

## Common Scenarios

### Your PR Surfaces New Package Shape Findings

While `REPORT_ONLY = true`, new findings won't fail CI — but they will appear
in the job log under the "Check package shape" step.

1. Look at the CI output. Each finding is annotated with the package and tool
   that produced it.
2. Compare against the baseline above — if it's listed, no action needed; if
   it's new, your change introduced a regression.
3. attw failures usually point to one of:
   - A new subpath in `exports` that lacks a `types` condition.
   - A `require.types` pointing at an `.d.ts` file that TypeScript will treat
     as ESM (needs to be `.d.cts`).
   - A bare relative import inside an emitted `.d.ts` (rejected by `node16`
     ESM resolution).
4. publint failures usually point to one of:
   - A file referenced by `exports` that wasn't emitted to `dist/`.
   - An `import` condition pointing at a `.cjs` file or vice versa.
   - A `"type"` mismatch between root `package.json` and a nested directory's
     marker `package.json`.
5. Reproduce locally with `pnpm build && pnpm check:package-shape`.

### You Need To Land Something Despite Known Findings

`REPORT_ONLY` is already `true` during the baseline-cleanup phase, so this
isn't a concern right now. Once the flag flips to `false`, the escape hatch is
to flip `REPORT_ONLY` back to `true` in the same PR (or open a follow-up
issue) and flip it back to `false` as soon as the underlying issue is
resolved.

## Related Files

- `scripts/check-package-shape.mjs` — The check script.
- Each workspace's `package.json` — `"private": true` excludes a workspace from
  the gate; the script picks up this field directly via `pnpm m ls`.
- `.github/workflows/main.yml` — CI wiring (the `Check package shape` step in
  the `lint_and_test` job).

## References

- [FEC-951](https://commercetools.atlassian.net/browse/FEC-951) — the ticket
  that introduced this gate.
