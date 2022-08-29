#!/usr/bin/env bash

set -e

if [ -n "$SKIP_POSTINSTALL_DEV_SETUP" ]; then
  echo "Skipping development setup."
# https://github.com/renovatebot/renovate/discussions/17442#discussioncomment-3499129
elif [ "$BUILDPACK" == "true" ]; then
  echo "Running in Renovate. Skipping post install steps."
else
  echo "Preparing development setup."

  yarn setup
fi

echo "Running prettier on package.json files"
# We need to run prettier to avoid unnecessary formatting changes to package.json (due to Yarn install).
yarn prettier --write --parser json '**/package.json' &>/dev/null
