#!/usr/bin/env bash

set -e

if [[ ! "$TRAVIS_PULL_REQUEST" = "false" ]]; then
  TEMPLATE_VERSION="$TRAVIS_PULL_REQUEST_BRANCH"
else
  TEMPLATE_VERSION=master
fi

if [ -z "$TEMPLATE_VERSION" ]; then
  echo "Skipping build"
else
  TEST_APP_NAME=test-install-app-starter
  TEMPLATE=starter

  echo "Installing application for template $TEMPLATE"
  yarn run create-mc-app \
    --template="$TEMPLATE" \
    --template-version="$TEMPLATE_VERSION" \
    "$TEST_APP_NAME"
fi
