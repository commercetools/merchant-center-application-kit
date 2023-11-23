#!/usr/bin/env bash

set -e

echo "Preparing production builds"

pnpm compile-intl
node scripts/gatsby-cache.mjs pre @commercetools-website/custom-applications

echo "Building documentation websites (Custom Applications)"

pnpm --filter @commercetools-website/custom-applications run build
pnpm --filter @commercetools-website/components-playground run build

node scripts/gatsby-cache.mjs post @commercetools-website/custom-applications

echo "Moving public folders into vercel-public"

rm -rf vercel-public
cp -R public/website vercel-public
cp -R website-components-playground/dist vercel-public/playground
