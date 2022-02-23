#!/usr/bin/env bash

set -e

os=$(uname)

case $os in
  Linux*)
    binary_name="linux-x64"
    ;;
  Darwin*)
    binary_name="macos-x64"
    ;;
  *)
    echo "The script only supports macos or linux systems, instead got $os".
    ;;
esac

./releases/2.0.20/$binary_name/linkcheck "$@"
