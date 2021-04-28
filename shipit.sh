#!/bin/bash

NODE_VERSION='14'

# fetch new code
git fetch
git reset --hard origin/master

# make sure correct node is installed and use that version
nvm install ${NODE_VERSION}
nvm use ${NODE_VERSION}
npm install

# build site
npm run generate
npm run deploy

# bust cloudflare cache
# CLOUDFLARE_ZONE_ID=TODO_SET_THIS_VALUE
# curl -X DELETE "https://cloudflare.fftf.xyz/zones/${CLOUDFLARE_ZONE_ID}/cache" \
#      -H "X-Auth-Key: ${CLOUDFLARE_ZONE_KEY}"
