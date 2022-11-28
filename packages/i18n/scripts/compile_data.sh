#!/usr/bin/env bash

set -e

echo "Compiling i18n messages data."
yarn formatjs compile-folder --format=./transifex-transformer.js --ast data compiled-data

echo "Generating moment locale imports."
yarn node scripts/generate-moment-locale-imports.js
