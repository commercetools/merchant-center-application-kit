#!/usr/bin/env bash

set -e

echo "Preparing production builds"

yarn compile-intl

# Import moment.js locale metadata files.
mkdir -p ./packages/i18n/compiled-data/moment/locales
cp -R node_modules/moment/dist/locale/*.js ./packages/i18n/compiled-data/moment/locales
find ./packages/i18n/compiled-data/moment/locales -name '*.js' -exec sed -i '' -e 's/..\/moment/moment/g' {} \;

yarn node scripts/gatsby-cache.mjs pre

echo "Building Gatsby websites"

yarn workspace @commercetools-website/custom-applications build
yarn workspace @commercetools-website/components-playground build

yarn node scripts/gatsby-cache.mjs post

echo "Group websites into one folder"

rm -rf vercel-public
cp -R public/website vercel-public
cp -R public/website-components-playground vercel-public/playground
