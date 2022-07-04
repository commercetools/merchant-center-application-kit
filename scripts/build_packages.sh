#!/usr/bin/env bash

set -e

echo "Compiling i18n data."
yarn compile-intl

echo "Copying moment.js locale metadata files."
mkdir -p ./packages/i18n/compiled-data/moment/locales
cp -R node_modules/moment/dist/locale/*.js ./packages/i18n/compiled-data/moment/locales
# copied files have a relative import to 'moment' so we need to update it to be global
find ./packages/i18n/compiled-data/moment/locales -name '*.js' -exec sed -i '' -e 's/..\/moment/moment/g' {} \;

echo "Compiling CSS modules."
yarn compile-css-modules

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
  NODE_ENV=production yarn workspace @commercetools-frontend/codemod build
fi
