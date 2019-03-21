#!/usr/bin/env bash

set -e

: "${NPM_TOKEN?Required env variable NPM_TOKEN}"

# Only trigger the canary release when:
# - the branch is `master`
# - the build has not been triggered by a pull request
# - the commit message does not contain `[skip publish]`
if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_PULL_REQUEST" = "false" ] && [[ ! "$TRAVIS_COMMIT_MESSAGE" =~ \[skip\ publish\] ]]; then
  echo "Configuring npm for automation bot"
  cat > ~/.npmrc << EOF
email=npmjs@commercetools.com
//registry.npmjs.org/:_authToken=$NPM_TOKEN
EOF

  echo "Working tree status"
  git status

  echo "Releasing canary version"
  yarn release:canary

else
  echo "Not on master branch, skipping release"
fi
