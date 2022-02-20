#!/bin/bash

VERSION_REPO=$(./get_version_repo.sh -o martinabrle -r mini-node -p mini-node-api)
VERSION_NODE=$(./get_version_node.sh -f ./test.json)
VERSION=""

echo "Repo version: ${VERSION_REPO}"
echo "Node version: ${VERSION_NODE}"

RETVAL_VER_COMP=$(./version_compare.sh "${VERSION_REPO}" "${VERSION_NODE}")

if [ "$RETVAL_VER_COMP" == 0 ] || [ "$RETVAL_VER_COMP" == 1 ]; then
    echo "versions are equal or the repo version is higher"
    VERSION=$(./increase_version.sh -v "$VERSION_REPO")
    ./update_version_node.sh -f ./test.json -v "$VERSION"
elif [ "$RETVAL_VER_COMP" == -1 ]; then
    echo "the node package.json version is higher"
    VERSION="$VERSION_NODE"
else
    echo "error"
    exit 1
fi

echo "New version: $VERSION"
