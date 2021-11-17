#!/usr/bin/env bash

set -e

: "${VERCEL_TOKEN_PLAYGROUND?Required env variable VERCEL_TOKEN_PLAYGROUND}"

echo "Deploying Playground for production GCP-EU"
yarn --cwd playground compile-html:gcp-eu
rm -rf playground/vercel-deployments/state-machines-gcp-eu/public
cp -R playground/public playground/vercel-deployments/state-machines-gcp-eu
pushd playground/vercel-deployments/state-machines-gcp-eu
npm run deploy -- --token="$VERCEL_TOKEN_PLAYGROUND"
popd

echo "Deploying Playground for production GCP-US"
yarn --cwd playground compile-html:gcp-us
rm -rf playground/vercel-deployments/state-machines-gcp-us/public
cp -R playground/public playground/vercel-deployments/state-machines-gcp-us
pushd playground/vercel-deployments/state-machines-gcp-us
npm run deploy -- --token="$VERCEL_TOKEN_PLAYGROUND"
popd