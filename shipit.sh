#!/bin/bash

# fetch new code
git fetch
git reset --hard origin/master
npm install

# build site
npm run generate
npm run deploy

# bust cloudflare cache
# CLOUDFLARE_ZONE_ID=TODO_SET_THIS_VALUE
# curl -X DELETE "https://cloudflare.fftf.xyz/zones/${CLOUDFLARE_ZONE_ID}/cache" \
#      -H "X-Auth-Key: ${CLOUDFLARE_ZONE_KEY}"
