# assets

Subdirectory context — supplements the root `AGENTS.md`. Only includes what
an agent needs to know to work safely in this package specifically.

## Purpose

Provides static assets (SVG images, logos, application icons, favicon, robots.txt) and exposes the package's filesystem location via `packageLocation`, consumed by the Merchant Center build tooling and shell.

## Key Context

This is a plain asset package with no build step. The entry point (`index.js`) exports only `packageLocation` so that consuming packages can resolve asset paths at build time. Asset files are organized into subdirectories: `images/`, `logos/`, `application-icons/`, `html-page/`.

## Divergences from Root

- Excluded from preconstruct (`!packages/assets` in root `package.json`). There is no `src/` directory, no `dist/` output, and no compilation step.
- Has no test files.
