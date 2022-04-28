#!/usr/bin/env bash

set -e

echo "Compiling i18n data."
yarn compile-intl

if [ "$1" = "--watch" ]; then

  echo "Building packages in watch mode."
  preconstruct watch & \
  NODE_ENV=production yarn workspace @commercetools-frontend/codemod build:bundles:watch & \
  NODE_ENV=production yarn workspace @commercetools-frontend/mc-html-template build:bundles:watch & \
  NODE_ENV=production yarn workspace @commercetools-frontend/mc-scripts build:bundles:watch

else

  if [ -n "$SKIP_PRECONSTRUCT_BUILD" ]; then
    echo "Skipping building packages."

  else
    echo "Building packages (Preconstruct)."
    preconstruct build

  fi

  echo "Building CLI packages."
  NODE_ENV=production yarn workspace @commercetools-frontend/codemod build
  NODE_ENV=production yarn workspace @commercetools-frontend/mc-html-template build
  NODE_ENV=production yarn workspace @commercetools-frontend/mc-scripts build
fi
