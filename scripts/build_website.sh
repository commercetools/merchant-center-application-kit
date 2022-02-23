#!/usr/bin/env bash

set -e

echo "Preparing production builds"

yarn compile-intl
yarn node scripts/gatsby-cache.mjs pre

echo "Building Gatsby websites"

NODE_ENV=production yarn workspaces foreach \
  --include '@commercetools-website/*' \
  --parallel \
  --interlaced \
  --verbose \
  run build

yarn node scripts/gatsby-cache.mjs post

echo "Checking links locally"

yarn workspace @commercetools-website/custom-applications check-links

echo "Group websites into one folder"

rm -rf vercel-public
cp -R public/website vercel-public
cp -R public/website-components-playground vercel-public/playground
