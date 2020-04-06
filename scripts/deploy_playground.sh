#!/usr/bin/env bash

set -e

: "${ZEIT_NOW_PLAYGROUND?Required env variable ZEIT_NOW_PLAYGROUND}"

echo "Deploying Playground for production GCP-EU"
yarn --cwd playground deploy:eu \
  --confirm \
  --no-clipboard \
  --scope=commercetools-playground \
  --token="$ZEIT_NOW_PLAYGROUND"

echo "Deploying Playground for production GCP-US"
yarn --cwd playground deploy:us \
  --confirm \
  --no-clipboard \
  --scope=commercetools-playground \
  --token="$ZEIT_NOW_PLAYGROUND"
