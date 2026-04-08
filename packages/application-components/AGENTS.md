# application-components

## Purpose

Shared higher-level UI components (modal pages, detail pages, main pages, dialogs, drawers, tabs, maintenance pages) used by Merchant Center customizations to build standard page layouts on top of `@commercetools-uikit` primitives.

## Key Context

- **Component categories**: Dialogs (info, confirmation, form), Modal Pages (info, form, tabular, custom-form), Detail Pages (info, form, tabular, custom-form), Main Pages (info, form, tabular, custom-form), plus Drawer, TabHeader, CustomViewLoader, MaintenancePageLayout, PageNotFound, and page content containers.
- **Radix UI**: Uses `@radix-ui/react-dialog` for dialog/modal primitives — this is unique among sibling packages.
- **Theming**: `src/theming.ts` defines layout design token overrides (margins, paddings, colors) that differ between standard and Custom View contexts. These are transformed into CSS custom property references.
- **Shared internals**: `src/components/internals/` contains reusable sub-components (page headers, top bar, form buttons) used across all page-level components.
- **CSS file in published output**: `materials/media-queries.css` is included in the `files` array and published to npm.
- **Single preconstruct entry point**: `./index.ts`.
- **GraphQL**: Contains one `.settings.graphql` file for Custom Views selector. Generated types in `src/types/generated/`.

## How To Work Here

Root workflows apply. This package has no special commands beyond what the root provides.

## Gotchas

- Many components here are the canonical implementations of Merchant Center page patterns. Changing layout, spacing, or behavior of a page component (e.g. `FormModalPage`, `TabularDetailPage`) affects the look and feel of every downstream custom application that uses it.
- The `internals/` components are not exported publicly but are shared across many exported components — changes there have a wide blast radius within this package.
