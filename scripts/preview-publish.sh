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
#   BRANCH_NAME  — the PR head ref (any branch with an open PR)
#   GITHUB_TOKEN — used by publish-all-snapshot-packages.mjs and update-npm-tag.mjs
#
# This script sets SKIP_POSTINSTALL_DEV_SETUP=1 for its own duration so
# that any pnpm install triggered by changeset version doesn't re-run
# preconstruct dev (which would overwrite the real builds with dev proxies).

set -euo pipefail

# ── Guard: prevent preconstruct dev from clobbering builds ───────────
export SKIP_POSTINSTALL_DEV_SETUP=1

# ── TEMPORARY diagnostics: why does the npm publish 404? ─────────────
# A 404 on PUT is how npm reports an unauthorized write. When the OIDC token
# exchange fails, npm only says why at verbose level, and `changeset publish`
# hides that output, so print the relevant lines of npm's debug log on exit.
export NPM_CONFIG_LOGLEVEL=verbose

dump_npm_logs() {
  for f in "${HOME}"/.npm/_logs/*.log; do
    [ -f "$f" ] || continue
    echo "::group::npm debug log (filtered): $f"
    grep -iE 'oidc|trusted|provenance|sigstore|id.token|exchange|http fetch (PUT|POST)|404|403|401|unauthor|auth' "$f" \
      | sed -E 's/eyJ[A-Za-z0-9._-]+/[jwt-redacted]/g; s/([Bb]earer) [^ ]+/\1 [redacted]/g' \
      | head -80 || true
    echo "::endgroup::"
  done
}
trap dump_npm_logs EXIT

# Print the non-secret claims of the OIDC token npm would use.
if [ -n "${ACTIONS_ID_TOKEN_REQUEST_URL:-}" ]; then
  OIDC_TOKEN=$(curl -sS -H "Authorization: bearer ${ACTIONS_ID_TOKEN_REQUEST_TOKEN}" \
    "${ACTIONS_ID_TOKEN_REQUEST_URL}&audience=npm:registry.npmjs.org" \
    | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>process.stdout.write(JSON.parse(s).value))')
  echo "::add-mask::${OIDC_TOKEN}"
  echo "::group::OIDC token claims"
  echo "${OIDC_TOKEN}" | node -e '
    let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{
      const c=JSON.parse(Buffer.from(s.trim().split(".")[1],"base64url").toString());
      const keys=["sub","aud","ref","ref_type","event_name","repository","workflow","workflow_ref","job_workflow_ref","environment","runner_environment","repository_visibility"];
      console.log(JSON.stringify(Object.fromEntries(keys.map(k=>[k,c[k]])),null,2));
    })'
  echo "::endgroup::"
else
  echo "ACTIONS_ID_TOKEN_REQUEST_URL is NOT set: no OIDC token is available to this step"
fi

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
pnpm changeset publish --tag "${PREVIEW_TAG}" 2>&1 | tee /tmp/publish-output.txt
node ./scripts/publish-all-snapshot-packages.mjs "${PREVIEW_TAG}"
node ./scripts/update-npm-tag.mjs "${PREVIEW_TAG}"

# ── Extract published version for workflow output ────────────────────
VERSION=$(grep -oP '@commercetools-frontend/application-shell@\K[^\s]+' /tmp/publish-output.txt | head -1)
echo "version=${VERSION}" >> "$GITHUB_OUTPUT"
