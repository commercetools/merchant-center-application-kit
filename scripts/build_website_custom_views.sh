#!/usr/bin/env bash

set -e

echo "Preparing production builds"

pnpm compile-intl
node scripts/gatsby-cache.mjs pre

echo "Building documentation website (Custom Views)"

pnpm --filter @commercetools-website/custom-views run build

node scripts/gatsby-cache.mjs post

echo "Moving public folder into vercel-public-custom-views"

rm -rf vercel-public-custom-views
cp -R public/website-custom-views vercel-public-custom-views
