#!/bin/bash
set -euo pipefail

if [[ -z "$NPM_TOKEN" ]]; then
  echo "No NPM_TOKEN, exiting.."
  exit 0
fi

echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" >>~/.npmrc

echo "Publishing..."
exec yarn run lerna publish from-git --yes
