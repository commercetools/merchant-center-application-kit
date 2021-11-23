#!/usr/bin/env bash

set -e

yarn husky install
yarn manypkg check
yarn preconstruct dev
# We need to run prettier to avoid unnecessary formatting changes to package.json (due to Yarn install).
yarn prettier --write --parser json '**/package.json' &>/dev/null

yarn patch-package
yarn compile-css-modules
