#!/usr/bin/env bash

set -e

mv public custom-applications
mkdir public
mv custom-applications public/
# Copy the custom application config `schema.json` to the website static assets.
cp ../packages/application-config/schema.json public/custom-applications/static/
