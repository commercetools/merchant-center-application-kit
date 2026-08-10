# Chromatic Visual Regression Testing (E2E Playground)

Catches unintended visual changes in the Cypress e2e playground. Every test produces a
screenshot; if one differs from the approved baseline, the PR is blocked until someone
reviews it.

This covers the **e2e playground** only. `application-components` is a separate Chromatic
project with its own Storybook-based setup.

|                   |                                 |
| ----------------- | ------------------------------- |
| Chromatic project | `app-kit-e2e-playground`        |
| CI job            | `test_playground` in `main.yml` |
| Snapshots         | 11                              |

## How it works

Chromatic does **not** screenshot your browser. During the Cypress run it captures the DOM
and every asset, writes them to `chromatic-archives/`, and a later CI step uploads that
archive. Chromatic then re-renders it on its own servers and compares against the baseline.

Two things follow, and most surprises trace back to them:

- Anything the archive misses is simply absent from the screenshot.
- Anything set at browser **runtime** rather than in **config** doesn't carry across.

Snapshots are automatic: one per test, at the end. There are no per-snapshot calls in the
specs.

## Two checks on a PR

| Check                              | Goes red when                               |
| ---------------------------------- | ------------------------------------------- |
| `test_playground`                  | a test genuinely fails                      |
| `UI Tests: app-kit-e2e-playground` | a screenshot changed and nobody accepted it |

They're independent on purpose. A visual change fails only the Chromatic check, so the
e2e tests and coverage upload still report their own result.

**To unblock a red `UI Tests`:** open the build in Chromatic, look at the diff, and accept
it (intended change) or deny it (a bug). Accepting makes it the new baseline.

## Running it locally

```bash
# Needs the playground running on :3001
CHROMATIC_VRT=true \
ELECTRON_EXTRA_LAUNCH_ARGS=--remote-debugging-port=9222 \
  pnpm test:e2e:playground

CHROMATIC_PROJECT_TOKEN=<token> pnpm chromatic --cypress
```

Both env vars are required:

- **`CHROMATIC_VRT`** opts this suite in. `cypress.config.ts` and `cypress/support/e2e.ts`
  are shared by all three Cypress suites, and only the playground archives. Without it you
  get no archives and no warning.
- **`ELECTRON_EXTRA_LAUNCH_ARGS`** gives Chromatic a devtools port to read the DOM through.
  Without it the run fails with _"Please provide a port number"_.

## Gotchas

**`cy.viewport()` does nothing for screenshots.** Chromatic reads the Cypress **config**
viewport, so set it on the `describe`/`it` instead:

```ts
describe('nav menu', { viewportWidth: 1250, viewportHeight: 800 }, () => {
```

**Screenshots clip to the viewport.** The app shell sets `html, body { height: 100vh }`,
which stops Chromatic detecting a natural page height. Content taller than the viewport is
cut off silently, so if you add to a snapshotted page, check the result.

**The upload is skipped when nothing visual changed.** Only `packages/`, `playground/`,
`cypress/`, `cypress.config.ts` and `pnpm-lock.yaml` trigger it. When skipped, the workflow
posts a passing `UI Tests` status itself, so the required check still reports.

**Two tests deliberately produce no screenshot** (`expose: { disableAutoSnapshot: true }`).
They still run and still assert:

- `should log out with reason "user"`, which asserts an `href` and nothing visual.
- The Custom View iframe test. Chromatic cannot archive iframe content, so it came out
  blank. Nothing visually covers the Custom View today.

## Adding a test

Nothing to do. Any new test in `cypress/e2e/playground/` gets a screenshot automatically.
Its first run has no baseline, so review and accept it in Chromatic.

If a test isn't visual, opt it out rather than leaving a screenshot nobody looks at:

```ts
it('name', { expose: { disableAutoSnapshot: true } }, () => {
```

## Merge gating

`UI Tests: app-kit-e2e-playground` is a required status check on `main`
(Settings → Branches). Two things to know if you ever touch that config:

- Require the **check**, not the `test_playground` job, since the job stays green on visual
  changes by design.
- Use the full namespaced name. Bare `UI Tests` isn't a check this repo posts, and
  requiring it would block every PR.

Admins can merge past a red check; `enforce_admins` is off.
