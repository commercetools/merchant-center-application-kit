#!/usr/bin/env bash

set -e

# Copy the custom application config `schema.json` to the website static assets.
echo "Copying JSON schema for Custom Views"
cp ../packages/application-config/custom-view.schema.json static/
