#!/usr/bin/env bash

set -e

echo "Moving public folder into public/custom-applications"

mv public custom-applications
mkdir public
mv custom-applications public/