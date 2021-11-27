#!/usr/bin/env bash

set -e

# Copy the custom application config `schema.json` to the website static assets.
echo "Copying JSON schema for Custom Applications"
cp ../packages/application-config/schema.json static/
