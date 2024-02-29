#!/usr/bin/env bash

set -e

echo "Compiling i18n data."
pnpm compile-intl

if [ "$1" = "--watch" ]; then

  echo "Building packages in watch mode."
  preconstruct watch

else

  if [ -n "$SKIP_PRECONSTRUCT_BUILD" ]; then
    echo "Skipping building packages."

  else
    echo "Building packages (Preconstruct)."
    time preconstruct build

  fi

  echo "Building CLI packages."
  NODE_ENV=production pnpm --filter @commercetools-frontend/codemod run build
fi
