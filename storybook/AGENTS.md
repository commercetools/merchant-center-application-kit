# storybook

See root `AGENTS.md` for monorepo-wide context.

## Purpose

Internal Storybook that hosts the visual regression tests Chromatic screenshots.

**This is not a docs site.** The stories are VRT fixtures: `AllVariants` stacks, no
args, no prop tables. Component documentation lives on
[docs.commercetools.com](https://docs.commercetools.com/merchant-center-customizations).
To browse the components, Chromatic hosts the built Storybook for every CI run and
gives a permalink per branch.

## Key Context

- **Stories live here**, in `src/stories/`, with shared scaffolding in `src/fixtures/`. They import components through public entrypoints (`@commercetools-frontend/*`), so the published packages carry no test scaffolding and nothing in them depends on this private workspace.
- **Every story is captured.** Chromatic's capture-by-default stands, because every story here exists to be snapshotted. Opt one out with `chromatic: { disableSnapshot: true }`. There are no tags or parameters to set.
- **Two decorators, both global.** `providers-decorator` supplies the stack these components assume (Apollo with a seeded cache, FlopFlip, react-intl, a `MemoryRouter`, plus `ThemeProvider` and `PortalsContainer`). `padding-decorator` adds 1rem, because Chromatic crops to rendered content and edge-painted focus rings would clip.
- **`VisualSpec` and `VisualSpecGroup`** (`src/helpers/`) wrap each captured state. Picking the wrong one is the most common way a story renders wrong.
- Chromatic runs against the **`app-kit-components`** project. The Cypress playground suite is a separate Chromatic project and does not involve this workspace.

## How To Work Here

| Task          | Command                                                      |
| ------------- | ------------------------------------------------------------ |
| Dev server    | `pnpm storybook:start` — port 6006                           |
| Build         | `pnpm storybook:build` — this is what Chromatic builds in CI |
| Browse hosted | TODO: paste the Chromatic permalink for `main`               |

**Don't run Chromatic locally.** A local run publishes into the same project and lands
in its build history, where it can take a baseline that no PR reviewed. Debug against
`pnpm storybook:start` and let the PR build do the comparison.

### Adding a VRT story

Add `<component>.stories.tsx` to `src/stories/`, importing the component from its
public entrypoint (`@commercetools-frontend/*`), never a deep path. Then:

1. `title: 'Application Components/<Name>'`, and `component:` when the export is a single component.
2. Wrap each state in the right helper:

| Helper            | Layout                                   | Use for                                          |
| ----------------- | ---------------------------------------- | ------------------------------------------------ |
| `VisualSpec`      | Label beside content, box shrinks to fit | Small inline elements: stamps, badges, buttons   |
| `VisualSpecGroup` | Label above, children stretch full width | Anything page-sized, full-width, or portal-based |

`VisualSpec`'s box is a flex item, so it shrink-wraps, and any child at
`width: 100%` resolves against that shrunk width. A full-width page container comes
out ~590px instead of filling the frame, and a dialog's `getParentSelector` target
comes out **0px wide and captures nothing**.

3. Name the export for what it captures. Several states sharing one snapshot go in
   `AllVariants`; otherwise use one descriptively named export per state. A lone state
   needs no helper, since the label would only repeat the story name.

## Gotchas

- `src/stubs/supported-locales.ts` exists because `packages/l10n` reads its locale list through `babel-plugin-preval`, which Vite doesn't run, so the import lands on a CJS file with no default export and the `application-shell` barrel fails to load.
- `src/stubs/msw.ts` exists because Storybook 9.1 injects a module mocker that imports `msw/browser`, which msw v1 doesn't have. Delete it when msw reaches v2.
- `globals.css` must import `custom-properties.css`. `resets.css` sets `font-family: var(--font-family)` with no inline fallback, so without it everything renders in the browser's default serif.
- app-kit's own tokens (`--margin-for-page-content` and friends) are defined by the `ThemeProvider` in `providers-decorator`, and have **no** inline fallbacks. Remove it and page layouts lose their padding silently.
- No viewport is pinned. Chromatic's default applies, deliberately.
- `main.ts` shims `window.app` and `process.env`, two runtime globals the MC injects and Storybook doesn't. Reasons are in place; without them the Custom Views selector renders nothing, silently.
- Modal-page stories need `shouldDelayOnClose={false}`. `ModalPage` defaults it to `true`, which unmounts the modal via internal state before `onClose` runs, so a no-op handler won't keep it open and nothing re-opens it.
