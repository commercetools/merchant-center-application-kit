---
artifact_contract: ce-unified-plan/v1
artifact_readiness: implementation-ready
execution: code
product_contract_source: ce-plan-bootstrap
type: fix
created: 2026-09-30
---

# fix: Address review feedback on the shell-chunk modulepreload plugin

**Target repo:** merchant-center-application-kit
**Branch:** `FEC-1303-modulepreload-shell-chunks`
**PR:** [#4145](https://github.com/commercetools/merchant-center-application-kit/pull/4145)

---

## Goal Capsule

PR #4145 adds a Vite plugin that emits `<link rel="modulepreload">` for the authenticated shell chunk graph. A reviewer accepted the approach and asked for four changes before merge. This plan lands those four plus the rebase. All of it is confined to `packages/mc-scripts` and one CI workflow step.

The change set is small and behaviour-preserving for the happy path; three of the four units alter only what happens when something is *wrong* (a renamed chunk, a Vite reordering, a Custom View build).

---

## Problem Frame

The plugin ships with defaults that a consumer of the published `mc-scripts` package cannot change, and with one load-bearing assumption that fails silently.

- `build-vite.ts` constructs the plugin as `pluginModulePreloadShellChunks()` — no arguments. So `roots` and `onMissing` exist on the `Options` type but are unreachable outside this repo. The default `onMissing: 'error'` therefore hard-fails a consumer's build, and the thrown message tells them to "update the `roots` option", which they cannot do.
- The `__CDN_URL__` prefix on the emitted tags is the whole reason the plugin works through `modulePreload.resolveDependencies` instead of `transformIndexHtml`. Nothing asserts it; it has only been checked by hand.
- `resolveDependencies` reads a `resolved` that `generateBundle` populates. That ordering is Vite-internal. If it inverts, `resolved` is `null`, the existing condition returns `deps` unchanged, and every preload hint disappears with no signal.
- The plugin runs for Custom View builds too. `CustomViewShell` never mounts the navbar or project container, so those builds carry ~128 KB of hints for chunks they will not use.

---

## Requirements

- **R1** — A missing chunk root warns instead of failing the build, and the changeset stops claiming the behaviour is configurable.
- **R2** — CI asserts that the built playground `index.html` carries modulepreload tags with the `__CDN_URL__` prefix.
- **R3** — A broken plugin/Vite ordering produces a build-log warning instead of silently emitting no hints.
- **R4** — Custom View builds skip the plugin when that can be decided cheaply; otherwise the cost is accepted and the reason recorded.
- **R5** — The branch sits on current `origin/main`.

---

## Key Technical Decisions

**KTD1 — Default `onMissing` to `'warn'`.** *(session-settled: user-approved — chosen over keeping the hard failure and plumbing `onMissing`/`roots` through to consumers: the options are unreachable from the published package today, so the failure gives consumers no way out.)* Governs R1.

**KTD2 — Assert the CDN prefix in CI rather than by hand.** *(session-settled: user-approved — chosen over leaving it hand-verified: the same assertion also detects the ordering regression in R3.)* Governs R2.

**KTD3 — The ordering guard warns, it does not throw.** *(session-settled: user-approved — chosen over throwing: a build-log warning is enough to catch a Vite upgrade, and a throw would break consumer builds on an internal Vite change.)* Governs R3.

**KTD4 — Accept the ~128 KB if a cheap Custom View check is not reliable.** *(session-settled: user-approved — chosen over resolving the full config at build time: correctness of the skip is not worth build-time config resolution.)* Governs R4.

**KTD5 — The R3 warning cannot use `this.warn`.** `resolveDependencies` is a plain callback inside the plugin's `config()` return, not a Rollup plugin hook, so it has no plugin context. The warning has to go through a captured logger or `console.warn`. This is a constraint discovered in the code, not a preference.

---

## Implementation Units

### U1. Default a missing root to a warning

**Goal:** A partial root match no longer fails the build, and the changeset describes what actually happens.

**Requirements:** R1 (KTD1)

**Dependencies:** none

**Files:**
- `packages/mc-scripts/src/vite-plugins/vite-plugin-modulepreload-shell-chunks.ts`
- `packages/mc-scripts/src/vite-plugins/vite-plugin-modulepreload-shell-chunks.spec.ts`
- `.changeset/lucky-pianos-preload.md`

**Approach:**
1. Flip the `onMissing` default from `'error'` to `'warn'`.
2. Update the `Options` JSDoc so `'warn'` is documented as the default and `'error'` as opt-in.
3. Rewrite the message's closing sentence: it currently instructs the reader to update `roots`, which a consumer cannot reach. Say what happened and that the optimisation is now partial, without prescribing an action only this repo can take.
4. Fix the changeset's final paragraph, which states the check "is on by default and configurable via the plugin's `onMissing` option". Neither half holds for a consumer: the build no longer fails, and the option is not exposed by `build-vite.ts`.

**Patterns to follow:** the existing `onMissing === 'error'` branch already calls `this.error`/`this.warn` — keep both paths, only the default changes.

**Test scenarios:**
- Partial root match with no options: emits a warning, the build is not failed, and the resolved hints still contain the matched roots' chunks.
- Partial root match with `onMissing: 'error'` passed explicitly: still fails, so the opt-in is not lost.
- All roots match: neither warns nor errors.
- Zero roots match: stays silent (the existing "entry never reaches these modules" case), and is not confused with the partial case.

**Verification:** the plugin spec passes, and the changeset no longer promises configurability.

**Size:** S

---

### U2. Warn when the plugin/Vite ordering breaks

**Goal:** A `resolved` that is still `null` when the HTML host asks for dependencies produces a warning instead of silently dropping every hint.

**Requirements:** R3 (KTD3, KTD5)

**Dependencies:** none

**Files:**
- `packages/mc-scripts/src/vite-plugins/vite-plugin-modulepreload-shell-chunks.ts`
- `packages/mc-scripts/src/vite-plugins/vite-plugin-modulepreload-shell-chunks.spec.ts`

**Approach:**
1. Split the current combined condition. `hostType !== 'html'` is the normal per-dynamic-import call and stays silent. `hostType === 'html'` with `resolved === null` is the anomaly and warns.
2. Emit through a logger captured in the plugin closure, or `console.warn` — per KTD5, no plugin context is available at that call site. Whichever the implementer picks, the spec must be able to observe it.
3. Keep returning `deps` unchanged in both cases; this unit adds a signal, it does not change output.
4. The comment above `generateBundle` currently asserts the ordering as fact ("so `resolved` is always populated"). Soften it to name the assumption and point at the new guard.

**Execution note:** write the failing case first — invoke the captured `resolveDependencies` with `hostType: 'html'` before any `generateBundle` call and assert the warning. The existing spec already constructs the plugin and reaches into its `config()` return, so the harness exists.

**Patterns to follow:** `packages/mc-scripts/src/vite-plugins/vite-plugin-modulepreload-shell-chunks.spec.ts` — the `pluginModulePreloadShellChunks` describe block already exercises `resolveDependencies` directly.

**Test scenarios:**
- `hostType: 'html'` before `generateBundle` ran: warns once, returns `deps` unchanged.
- `hostType: 'js'` before `generateBundle` ran: silent, returns `deps` unchanged.
- `hostType: 'html'` after `generateBundle` ran: silent, returns `deps` merged with the shell chunks.
- Repeated `html` calls with `resolved` still null: does not spam one warning per call (or, if it does, the spec pins that as the accepted behaviour).

**Verification:** the plugin spec passes, and the ordering comment no longer states the assumption as a guarantee.

**Size:** S

---

### U3. Assert the CDN-prefixed tags in CI

**Goal:** The playground build in CI fails if the built `index.html` stops carrying modulepreload tags with the `__CDN_URL__` prefix.

**Requirements:** R2 (KTD2)

**Dependencies:** U1, U2 — land the plugin's behaviour changes before pinning its output.

**Files:**
- `.github/workflows/main.yml`

**Approach:**
1. Add a step to the `test_playground` job immediately after `Building Playground application` (which runs `pnpm playground:build`).
2. Assert against the built `index.html`: at least one `rel="modulepreload"` tag, and the `href` carrying the `__CDN_URL__` prefix. Fail the step when either is absent.
3. Keep it a shell assertion, not a new test file — the job already owns the build artifact and this is a build-output contract, not unit behaviour.

**Deferred to implementation:** the exact built path and whether `__CDN_URL__` survives literally into the HTML. The plugin's own JSDoc says `resolveDependencies` output is rendered through `renderBuiltUrl`, which is what applies the prefix — but confirm against a real local `pnpm playground:build` before writing the matcher, rather than asserting a string that never appears.

**Execution note:** run `pnpm playground:build` locally first and read the emitted `index.html`. Write the assertion against what is actually there.

**Test scenarios:** `Test expectation: none — this unit is a CI assertion, and its own correctness is verified by running the build locally and confirming the assertion passes on current output and fails on output with the tags removed.`

**Verification:** the step passes on this branch's build output, and fails when the modulepreload tags are stripped from the artifact by hand.

**Size:** S

---

### U4. Investigate skipping the plugin for Custom Views

**Goal:** Custom View builds stop carrying shell-chunk hints they cannot use — or the cost is accepted with the reason written down.

**Requirements:** R4 (KTD4)

**Dependencies:** none

**Files:**
- `packages/mc-scripts/src/commands/build-vite.ts`
- `.changeset/lucky-pianos-preload.md`

**Approach:**
1. `build-vite.ts` currently has no notion of application vs Custom View — it imports `paths` and `generateTemplate` and never loads the config. So this needs new detection, not a lookup of something already in scope.
2. The cheap candidate: decide on which config file is present. `packages/application-config/src/load-config.ts` locates `custom-view-config` through its own cosmiconfig explorer, and `process-config.ts` branches on `configFileName.includes('custom-view-config')` — so file presence is already the signal the config layer itself uses.
3. Gate the plugin on that: `pluginModulePreloadShellChunks()` only for the custom-application path.
4. If detection proves unreliable — an app that carries both config files, a non-standard filename cosmiconfig resolves but a plain check misses — stop. Per KTD4 the 128 KB is accepted. Leave the plugin unconditional and rewrite the changeset's "Note for Custom Views" paragraph to say the hints are knowingly emitted and why the skip was not taken.

**Deferred to implementation:** whether file-presence detection is reliable enough. That is the unit's question; either outcome satisfies R4.

**Patterns to follow:** `packages/application-config/src/load-config.ts` — reuse its config-name constants rather than hardcoding a filename in `mc-scripts`.

**Test scenarios:**
- Custom-application config present, no Custom View config: the plugin is in the resolved plugin list.
- Custom View config present: the plugin is absent from the list.
- Neither config present: falls back to including the plugin, so a detection gap never silently disables the optimisation for a custom application.
- Applies only if detection is adopted; if it is not, this unit's deliverable is the changeset paragraph and `Test expectation: none — no behavioural change`.

**Verification:** either a Custom View build emits no modulepreload tags for the shell roots, or the changeset records the accepted cost and the plugin list is unchanged.

**Size:** M

---

### U5. Rebase onto current main

**Goal:** The branch sits on `origin/main` with CI re-verified.

**Requirements:** R5

**Dependencies:** U1, U2, U3, U4 — rebase last so the review changes are not re-resolved against a moving base.

**Files:** none

**Approach:** the branch is 24 commits behind. Its diff is four files, three of them new, so conflicts are unlikely; `build-vite.ts` is the one shared file and the change there is a single plugin line plus (after U4) a gate.

**Test scenarios:** `Test expectation: none — no source change.`

**Verification:** the branch is not behind `origin/main`, and the mc-scripts test suite plus the playground build pass on the rebased head.

**Size:** S

---

## Verification Contract

- `packages/mc-scripts` test suite passes.
- `pnpm playground:build` succeeds, and the new CI assertion passes against its output.
- Typecheck and lint clean on every touched file.
- The changeset's claims match the shipped behaviour: no promise of configurability, and an accurate Custom Views paragraph.

---

## Definition of Done

- A partial root match warns; `onMissing: 'error'` still works when passed explicitly.
- A null `resolved` on the HTML host warns and is distinguishable from the normal `js` path.
- CI fails if the CDN-prefixed modulepreload tags disappear from the playground build.
- Custom Views either skip the plugin or the accepted cost is written into the changeset.
- The branch is rebased and green.

---

## Scope Boundaries

### Out of scope

- **The "after" performance measurement.** The reviewer also asked for it, and it is environment-blocked rather than deferred by choice: the harness in `merchant-center-frontend` resolves a *deployed* `baseUrl` and authenticates against Vault or local secrets, and the `before-prefetch` baseline was taken against `mc.europe-west1.gcp.integration`. `compare` warns when `baseUrl` or `env` differ between reports, so a locally-served measurement is not comparable to that baseline. Producing a real "after" needs a frontend built with this branch's `mc-scripts` and deployed somewhere the harness can log into — work outside this repo and outside this plan.
- **Exposing `roots` / `onMissing` to consumers.** KTD1 chose the warn default precisely to avoid needing this. If a consumer ever needs strictness, plumbing the options through is its own change.
- **Preloading `application-shell-splitter`.** Already excluded on the PR with a recorded reason; it needs a throttled measurement.

### Deferred to follow-up work

- **The 660 ms gap after the main file downloads.** Surfaced during this PR's investigation, unrelated to the plugin. The PR author is filing the ticket.

---

## Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| `__CDN_URL__` does not appear literally in the built HTML, so the U3 assertion is written against a string that never exists and passes vacuously or fails spuriously | Medium | U3 requires reading a real local build before writing the matcher, and verifying the assertion fails when the tags are removed |
| Config-file detection misclassifies an app as a Custom View and silently disables the optimisation | Medium | U4's fallback case includes the plugin when neither config is found, so a detection gap fails toward the current behaviour |
| Warning instead of failing means a renamed shell chunk degrades the optimisation unnoticed in this repo too | Medium | U3's CI assertion is the backstop: the tags disappearing is what CI now catches, independent of `onMissing` |
| The U2 warning fires on every `resolveDependencies` call and floods the build log | Low | A test scenario pins the repeat behaviour either way |

---

## Open Questions

- Is file-presence detection sufficient to identify a Custom View build (U4)? Either answer satisfies R4 — this is the unit's investigation, not a blocker.
