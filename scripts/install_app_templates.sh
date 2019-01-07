#!/usr/bin/env bash

set -e

TEMPLATE_VERSION="${TRAVIS_PULL_REQUEST_BRANCH:-$TRAVIS_BRANCH}"

TEST_APP_NAME=test-install-app-starter
TEMPLATE=starter

echo "Installing application for template $TEMPLATE"
yarn run create-mc-app \
  --template="$TEMPLATE" \
  --template-version="$TEMPLATE_VERSION" \
  "$TEST_APP_NAME"
