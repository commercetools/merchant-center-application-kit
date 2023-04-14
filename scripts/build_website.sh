#!/usr/bin/env bash

set -e

echo "Preparing production builds"

pnpm compile-intl
node scripts/gatsby-cache.mjs pre

echo "Building documentation websites"

pnpm --filter @commercetools-website/custom-applications run build
pnpm --filter @commercetools-website/components-playground run build

node scripts/gatsby-cache.mjs post

echo "Merging websites into one folder"

rm -rf vercel-public
cp -R public/website vercel-public
cp -R website-components-playground/dist vercel-public/playground
