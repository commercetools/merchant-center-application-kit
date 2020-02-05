#!/usr/bin/env bash

set -e

: "${TEMPLATE_NAME?Required env variable TEMPLATE_NAME}"

SANDBOX_FOLDER="sandbox-installation-template"

if [ -z "$GITHUB_REF" ]; then
  BRANCH_NAME="master"
else
  BRANCH_NAME="${GITHUB_REF#refs/heads/}"
fi

echo "Current branch: $BRANCH_NAME"

mkdir "$SANDBOX_FOLDER"

# Copy the `create-mc-app` package into this folder, so that we can install
# the dependencies only for this package.
echo "Installing copy of create-mc-app package in folder $SANDBOX_FOLDER"
cp -R packages/create-mc-app "$SANDBOX_FOLDER/create-mc-app"
cd "$SANDBOX_FOLDER/create-mc-app"
npm install

# After installing the dependencies, go back to the parent folder and run
# the command to install the template
cd ..
echo "Installing $TEMPLATE_NAME template"
./create-mc-app/node_modules/.bin/create-mc-app \
  my-starter-app \
  --template "$TEMPLATE_NAME" \
  # Use the branch name to ensure that in pull requests we're testing the latest code
  --template-version "$BRANCH_NAME"

# Build the application
echo "Building the production bundle for the $TEMPLATE_NAME template"
cd my-starter-app
npm run build
