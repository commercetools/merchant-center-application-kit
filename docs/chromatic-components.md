# Chromatic Visual Regression Testing (Application Components)

Catches unintended visual changes in `application-components` and friends. Every story is
screenshotted; if one differs from the approved baseline, the build reports a visual change
for someone to review.

This covers the **Storybook** surface only. The Cypress e2e playground is a separate
Chromatic project, documented in `docs/chromatic-e2e-playground.md`.

|                   |                                                      |
| ----------------- | ---------------------------------------------------- |
| Chromatic project | `app-kit-components`                                 |
| CI workflow       | `.github/workflows/chromatic.yml`                    |
| Repo secret       | `CHROMATIC_TOKEN_UI_COMPONENTS`                      |
| Stories           | `storybook/src/stories/`                             |
| Hosted Storybook  | https://main--6a7214131a71921f118f4b58.chromatic.com |

## How it works

CI builds the Storybook in `storybook/`, and `chromaui/action` uploads it. Chromatic renders
and compares the stories on its own servers, so nothing is screenshotted in the CI browser.

The job exits as soon as the upload finishes (`exitOnceUploaded: true`), which is why it goes
green long before the comparison is done. The verdict arrives later, as a status check.

**TurboSnap** (`onlyChanged`) narrows each run to the stories the diff can affect, so a
typical PR snapshots a handful rather than the whole library. A manual `workflow_dispatch`
run turns it off and snapshots everything, which is the way to re-baseline deliberately.
It's set in `chromatic.yml` only, since it has to vary by event; keep it out of
`chromatic.config.json` or the file's static value can win and quietly re-enable it.

## Checks on a PR

| Check                          | Goes red when                             |
| ------------------------------ | ----------------------------------------- |
| `chromatic` job                | the build or the upload fails             |
| `UI Tests: app-kit-components` | a snapshot changed and nobody accepted it |

Chromatic also posts `Storybook Publish: app-kit-components`, which links to the published
Storybook for that build. It reports the upload, not the comparison.

**To unblock a red `UI Tests`:** open the build in Chromatic, look at the diff, and accept it
(intended change) or deny it (a bug). Accepting makes it the new baseline.

## When it doesn't run

A diff only reaches Chromatic if it touches `packages/` (where the components live),
`storybook/`, or `pnpm-lock.yaml`. Anything else, a docs edit or a CI tweak, skips the build.

The two other skips are draft PRs and `changeset-release/main`, the release bot's branch.
Drafts are skipped here but not on the e2e surface, where the tests run regardless and the
upload rides along.

`storybook/chromatic.config.json`, which mirrors the build settings the workflow passes, is
the one exception inside those paths, since it changes no rendered output. A lockfile change
always counts, because a dependency bump can alter rendering and TurboSnap can't scope it.

When skipped, the workflow posts a passing `UI Tests: app-kit-components` status itself, so a
required check still reports rather than leaving the PR waiting forever.

## Running it locally

Don't. A local run publishes into the same project and lands in its build history, where it
can take a baseline that no PR reviewed. Debug against `pnpm storybook:start` and let the PR
build do the comparison.

There is no `chromatic` dependency in this workspace; the CLI ships bundled inside
`chromaui/action`. The one at the repo root belongs to the Cypress surface.

## Merge gating

`UI Tests: app-kit-components` is a required status check on `main` (Settings → Branches),
so a snapshot change nobody has accepted blocks the merge.

Two things to know if you ever touch that config:

- Require the **check**, not the `chromatic` job, which goes green at upload and says nothing
  about the comparison.
- Use the full namespaced name. Chromatic namespaces per project once a repo has more than
  one, and bare `UI Tests` is not a check this repo posts. Requiring it would block every PR.

Admins can merge past a red check; `enforce_admins` is off.

## Adding a story

See `storybook/AGENTS.md`. Every story is captured automatically, so a new one has no
baseline on its first run and needs accepting in Chromatic.
