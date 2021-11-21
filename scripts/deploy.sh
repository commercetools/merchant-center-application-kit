#!/usr/bin/env bash

set -e


if [ "$VERCEL_PROJECT" = "app-kit-playground" ]; then
  echo "Deploying Vercel project $VERCEL_PROJECT."

  yarn build
  yarn workspace playground run build
  yarn workspace playground run compile-html

else
  echo "Deploying Custom Applications documentation."

  yarn build:website
  rm -rf public
  mv website/public public
fi
