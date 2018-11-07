#!/usr/bin/env bash

set -e

PYTHON_VERSION=python3.6

echo "Installing $PYTHON_VERSION"
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get update
sudo apt-get install "$PYTHON_VERSION"

echo "Installing pip for $PYTHON_VERSION"
curl https://bootstrap.pypa.io/get-pip.py | sudo -H "$PYTHON_VERSION"

echo "Installing transifex client"
"$PYTHON_VERSION" -m pip install --user transifex-client
export PATH="$HOME/.local/bin:$PATH"
