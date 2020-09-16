#!/bin/bash
set -euo pipefail

# if [[ -z "$NPM_TOKEN" ]]; then
#   echo "No NPM_TOKEN, exiting.."
#   exit 0
# fi

# if [[ -z "$AWS_ACCESS_KEY_ID" ]]; then
#   echo "No AWS_ACCESS_KEY_ID, exiting.."
#   exit 0
# fi

# if [[ -z "$AWS_SECRET_ACCESS_KEY" ]]; then
#   echo "No AWS_SECRET_ACCESS_KEY, exiting.."
#   exit 0
# fi

export CDN_PUBLISH_PATH="https://cdn.dwolla.com/v2-alpha/" \
  AWS_REGION="us-west-2" \
  S3_BUCKET="dwolla-public-cdn-us-west-2"

# echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" >>~/.npmrc

echo "Publishing..."
exec yarn build # run lerna publish from-git --yes
