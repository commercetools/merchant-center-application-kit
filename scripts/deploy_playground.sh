#!/usr/bin/env bash

set -e

: "${ZEIT_NOW_PLAYGROUND?Required env variable ZEIT_NOW_PLAYGROUND}"

echo "Deploying Playground for production GCP-EU"
yarn --cwd playground compile-html:gcp-eu
rm -rf playground/now-deployments/state-machines-gcp-eu/public
cp -R playground/public playground/now-deployments/state-machines-gcp-eu
yarn --cwd playground/now-deployments/state-machines-gcp-eu run deploy --token="$ZEIT_NOW_PLAYGROUND"

echo "Deploying Playground for production GCP-US"
yarn --cwd playground compile-html:gcp-us
rm -rf playground/now-deployments/state-machines-gcp-us/public
cp -R playground/public playground/now-deployments/state-machines-gcp-us
yarn --cwd playground/now-deployments/state-machines-gcp-us run deploy --token="$ZEIT_NOW_PLAYGROUND"
