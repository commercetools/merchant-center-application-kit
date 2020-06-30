#!/usr/bin/env bash

set -e

: "${VERCEL_TOKEN_PLAYGROUND?Required env variable VERCEL_TOKEN_PLAYGROUND}"

echo "Deploying Playground for production GCP-EU"
yarn --cwd playground compile-html:gcp-eu
rm -rf playground/vercel-deployments/state-machines-gcp-eu/public
cp -R playground/public playground/vercel-deployments/state-machines-gcp-eu
yarn --cwd playground/vercel-deployments/state-machines-gcp-eu run deploy --token="$VERCEL_TOKEN_PLAYGROUND"

echo "Deploying Playground for production GCP-US"
yarn --cwd playground compile-html:gcp-us
rm -rf playground/vercel-deployments/state-machines-gcp-us/public
cp -R playground/public playground/vercel-deployments/state-machines-gcp-us
yarn --cwd playground/vercel-deployments/state-machines-gcp-us run deploy --token="$VERCEL_TOKEN_PLAYGROUND"
