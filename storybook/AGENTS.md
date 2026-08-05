# storybook

See root `AGENTS.md` for monorepo-wide context.

## Purpose

Internal Storybook that hosts the visual regression tests Chromatic screenshots.

## Key Context

- **Stories are colocated in `packages/*`**, not here. This workspace holds only the Storybook config, decorators and shared helpers. The one exception is `application-icons`, which reads SVGs out of `packages/assets` and so has no owning component package.
- **Every story is captured.** Chromatic's capture-by-default stands, because every story here exists to be snapshotted. Opt one out with `chromatic: { disableSnapshot: true }`. There are no tags or parameters to set.
- **Two decorators, both global.** `providers-decorator` supplies the stack these components assume (Apollo with a seeded cache, FlopFlip, react-intl, a `MemoryRouter`, plus `ThemeProvider` and `PortalsContainer`). `padding-decorator` adds 1rem, because Chromatic crops to rendered content and edge-painted focus rings would clip.
- **`VisualSpec` and `VisualSpecGroup`** (`src/helpers/`) wrap each captured state, imported via the `@/storybook-helpers` alias. Picking the wrong one is the most common way a story renders wrong — see below.
- Chromatic runs against the **`app-kit-components`** project. The Cypress playground suite is a separate Chromatic project and does not involve this workspace.

## How To Work Here

| Task              | Command                                                       | Notes                                       |
| ----------------- | ------------------------------------------------------------- | ------------------------------------------- |
| Start dev server  | `pnpm storybook:start` (from root)                            | Port 6006; collides with ui-kit's Storybook |
| Start on any port | `pnpm --dir storybook exec storybook dev -p 6010`             | Use when 6006 is taken                      |
| Build             | `pnpm storybook:build` (from root)                            | What Chromatic builds in CI                 |
| Run Chromatic     | `pnpm --dir storybook exec chromatic --project-token=<token>` | Add `--dry-run` to build without publishing |

### Adding a VRT story

Colocate `<component>.stories.tsx` next to the component source in `packages/*`, then:

1. `title: 'Application Components/<Name>'`, and `component:` when the export is a single component.
2. Wrap each state in the right helper:

| Helper            | Layout                                   | Use for                                          |
| ----------------- | ---------------------------------------- | ------------------------------------------------ |
| `VisualSpec`      | Label beside content, box shrinks to fit | Small inline elements — stamps, badges, buttons  |
| `VisualSpecGroup` | Label above, children stretch full width | Anything page-sized, full-width, or portal-based |

`VisualSpec`'s box is a flex item, so it shrink-wraps, and any child at
`width: 100%` resolves against that shrunk width. A full-width page container comes
out ~590px instead of filling the frame, and a dialog's `getParentSelector` target
comes out **0px wide and captures nothing**. When in doubt for a page component,
use `VisualSpecGroup`.

## Gotchas

- Stories in `packages/*` import Storybook types through a root-`tsconfig.json` `paths` entry, because pnpm keeps `@storybook/react-vite` in this workspace. Type-only imports, so nothing resolves it at runtime.
- `src/stubs/msw.ts` exists because Storybook 9.1 injects a module mocker that imports `msw/browser`, which msw v1 doesn't have. Delete it when msw reaches v2.
- `globals.css` must import `custom-properties.css`. `resets.css` sets `font-family: var(--font-family)` with no inline fallback, so without it everything renders in the browser's default serif.
- app-kit's own tokens (`--margin-for-page-content` and friends) are defined by the `ThemeProvider` in `providers-decorator`, and have **no** inline fallbacks. Remove it and page layouts lose their padding silently.
- No viewport is pinned. Chromatic's default applies, deliberately.
