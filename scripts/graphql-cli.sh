#!/usr/bin/env bash

set -e

# Load the dotenv variables into the shell context.
export $(egrep -v '^#' .env | xargs)

# Proxy the command options to the `graphql-cli` script.
yarn graphql "$@" --overwrite
