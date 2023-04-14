#!/usr/bin/env bash

set -e

if [ -n "$SKIP_POSTINSTALL_DEV_SETUP" ]; then
  echo "Skipping development setup."

else
  echo "Preparing development setup."
  pnpm husky install
  pnpm preconstruct dev

fi
