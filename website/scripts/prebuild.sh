#!/usr/bin/env bash

set -e

echo "Cleaning public/custom-applications"

rm -rf public/custom-applications

echo "Copying application config schema.json to static folder"

# Copy the custom application config `schema.json` to the website static assets.
cp ../packages/application-config/schema.json static/
