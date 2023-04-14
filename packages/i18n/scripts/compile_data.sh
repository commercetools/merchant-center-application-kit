#!/usr/bin/env bash

set -e

echo "Compiling i18n messages data."
pnpm formatjs compile-folder --format=./transifex-transformer.js --ast data compiled-data

echo "Generating moment locale imports."
node scripts/generate-moment-locale-imports.js
