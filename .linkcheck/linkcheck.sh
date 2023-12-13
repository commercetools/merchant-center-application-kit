#!/usr/bin/env bash

set -e

os=$(uname)
machine=$(uname -m)

case $os in
  Linux*)
    binary_name_system="linux"
    ;;
  Darwin*)
    binary_name_system="macos"
    ;;
  *)
    echo "The script only supports macos or linux systems, instead got $os".
    ;;
esac

case $machine in
  arm64*)
    binary_name_machine="arm64"
    ;;
  *)
    binary_name_machine="x64"
    ;;
esac

$(dirname "$0")/releases/3.0.0/"$binary_name_system-$binary_name_machine"/linkcheck "$@"
