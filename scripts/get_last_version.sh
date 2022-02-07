#/bin/bash
curl https://api.github.com/repos/martinabrle/mini-node/releases |jq '.[] | select(.name | startswith("mini-node-api-v")) | .name'
