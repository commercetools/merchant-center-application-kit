#!/usr/bin/env bash

set -e

TEMPLATE=$1

if [ -z "$TEMPLATE" ]; then
  echo "Provide a template name (e.g. starter)"
  exit 1
fi

TEMPLATE_VERSION="${CIRCLE_BRANCH:-$CIRCLE_PR_NUMBER}"
TEST_APP_NAME=test-install-app-starter
REPO_BINARIES=$(yarn bin)

pushd "$HOME"

echo "Installing application for template $TEMPLATE"
echo "Using template version: $TEMPLATE_VERSION"
node "$REPO_BINARIES/create-mc-app" \
  --template="$TEMPLATE" \
  --template-version="$TEMPLATE_VERSION" \
  "$TEST_APP_NAME"
echo "Running tests for template $TEMPLATE"
yarn --cwd "$TEST_APP_NAME" test
echo "Running the production build of template $TEMPLATE"
yarn --cwd "$TEST_APP_NAME" build
