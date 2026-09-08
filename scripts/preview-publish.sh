#!/usr/bin/env bash

# Publish preview/snapshot releases from a PR branch.
#
# This script lives in the repo (not inline in the workflow YAML) so that
# changes are picked up from the checked-out PR branch.  GitHub Actions
# resolves issue_comment-triggered workflow files from the default branch,
# but composite actions and scripts are resolved from the checkout — so
# keeping the logic here avoids the "fixes on the PR never run" trap.
#
# Required env vars:
#   BRANCH_NAME  — the PR head ref (e.g. preview/save-toolbar-cqw-v2)
#   GITHUB_TOKEN — used by publish-all-snapshot-packages.mjs and update-npm-tag.mjs
#
# This script sets SKIP_POSTINSTALL_DEV_SETUP=1 for its own duration so
# that any pnpm install triggered by changeset version doesn't re-run
# preconstruct dev (which would overwrite the real builds with dev proxies).

set -euo pipefail

# ── Guard: prevent preconstruct dev from clobbering builds ───────────
export SKIP_POSTINSTALL_DEV_SETUP=1

# ── Compute preview tag from branch name ─────────────────────────────
PREVIEW_TAG=$(echo "$BRANCH_NAME" | sed -e 's/^preview\///' | sed -e 's/[^a-zA-Z0-9-]/-/g')
echo "Preview tag: ${PREVIEW_TAG}"

# ── Bump versions to snapshot ────────────────────────────────────────
# changeset version may trigger pnpm install (to update the lockfile
# after modifying package.json versions).  SKIP_POSTINSTALL_DEV_SETUP
# prevents the postinstall hook from running preconstruct dev.
pnpm changeset version --snapshot "${PREVIEW_TAG}"

# ── Rebuild everything ───────────────────────────────────────────────
# After changeset version, pnpm install may have re-run.  Even with
# SKIP_POSTINSTALL_DEV_SETUP the safest approach is an explicit rebuild
# so the published tarballs always contain real compiled output.
pnpm build

# ── Publish ──────────────────────────────────────────────────────────
# changeset publish only covers packages with an explicit changeset.
# publish-all-snapshot-packages.mjs force-publishes the remaining public
# packages so fixed-group consumers can install the full matching set.
pnpm changeset publish --tag "${PREVIEW_TAG}"
node ./scripts/publish-all-snapshot-packages.mjs "${PREVIEW_TAG}"
node ./scripts/update-npm-tag.mjs "${PREVIEW_TAG}"
