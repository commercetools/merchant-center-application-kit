#!/usr/bin/env bash

set -e

: "${NPM_TOKEN?Required env variable NPM_TOKEN}"

# Always skip it if it's not master branch or the commit message contains `[skip publish]`
if [ "$TRAVIS_BRANCH" = "master" ] && [[ ! "$TRAVIS_COMMIT_MESSAGE" =~ \[skip\ publish\] ]]; then
  echo "Configuring npm for automation bot"
  cat > ~/.npmrc << EOF
email=npmjs@commercetools.com
//registry.npmjs.org/:_authToken=$NPM_TOKEN
EOF

  echo "Releasing canary version"
  yarn release-canary

else
  echo "Not on master branch, skipping release"
fi
