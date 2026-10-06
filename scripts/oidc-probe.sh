#!/usr/bin/env bash
# TEMPORARY: print the non-secret OIDC claims and ask npm whether it accepts
# this identity for a few packages (the token exchange the npm CLI does before
# publishing). Publishes nothing. A success body contains an npm token, so it
# is never printed.
set -euo pipefail

if [ -z "${ACTIONS_ID_TOKEN_REQUEST_URL:-}" ]; then
  echo "ACTIONS_ID_TOKEN_REQUEST_URL is NOT set: no OIDC token is available"
  exit 1
fi

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

echo "::group::npm OIDC token exchange probe"
for PKG in '@commercetools-frontend/constants' '@commercetools-frontend/sentry' '@commercetools-frontend/application-shell'; do
  ENC=$(node -e 'process.stdout.write(encodeURIComponent(process.argv[1]))' "$PKG")
  CODE=$(curl -sS -o /tmp/exchange-body.txt -w '%{http_code}' -X POST \
    -H "Authorization: Bearer ${OIDC_TOKEN}" \
    "https://registry.npmjs.org/-/npm/v1/oidc/token/exchange/package/${ENC}" || echo "curl-failed")
  if [[ "$CODE" == 2* ]]; then
    echo "${PKG}: HTTP ${CODE} (exchange accepted, body not printed)"
  else
    echo "${PKG}: HTTP ${CODE}"
    sed -E 's/eyJ[A-Za-z0-9._-]+/[jwt-redacted]/g' /tmp/exchange-body.txt | head -c 1500
    echo
  fi
done
echo "::endgroup::"
