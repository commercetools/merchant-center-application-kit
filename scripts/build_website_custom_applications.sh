#!/usr/bin/env bash

set -e

echo "Preparing production builds"

pnpm compile-intl
node scripts/gatsby-cache.mjs pre

echo "Building documentation websites (Custom Applications)"

pnpm --filter @commercetools-website/custom-applications run build
pnpm --filter @commercetools-website/components-playground run build

node scripts/gatsby-cache.mjs post

echo "Moving public folders into vercel-public"

rm -rf vercel-public
cp -R public/website vercel-public
cp -R website-components-playground/dist vercel-public/playground
