#!/usr/bin/env bash

set -e

echo "Preparing production builds"

echo "Building components playground (Custom Applications)"

pnpm --filter @commercetools-website/components-playground run build

echo "Moving dist folders into vercel-public"

rm -rf vercel-public
mkdir -p vercel-public
cp -R website-components-playground/dist vercel-public/playground
