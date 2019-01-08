#!/usr/bin/env bash

set -e

TEMPLATE=$1

if [ -z "$TEMPLATE" ]; then
  echo "Provide a template name (e.g. starter)"
  exit 1
fi

TEMPLATE_VERSION="${TRAVIS_PULL_REQUEST_BRANCH:-$TRAVIS_BRANCH}"
TEST_APP_NAME=test-install-app-starter

echo "Installing application for template $TEMPLATE"
yarn run create-mc-app \
  --template="$TEMPLATE" \
  --template-version="$TEMPLATE_VERSION" \
  "$TEST_APP_NAME"
