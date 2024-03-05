#!/usr/bin/env bash

set -e

export NODE_ENV="production"

echo "Compiling i18n messages data."
pnpm formatjs compile-folder --format=./transifex-compiler.js --ast data compiled-data

echo "Generating moment locale imports."
node scripts/generate-moment-locale-imports.js
