#!/bin/bash

PACKAGE_FILENAME=""
while getopts f: flag
do
    case "${flag}" in
        f)
            PACKAGE_FILENAME=${OPTARG}
            ;;
        \?)
            echo "Error: Invalid syntax" >&2
            echo "Usage: get_version_node -f ./package.json" >&2
            exit 1
            ;;
        : )
            echo "Error: Invalid syntax" >&2
            echo "Usage: get_version_node -f ./package.json" >&2
            exit 1
            ;;
    esac
done

if [[ -z $PACKAGE_FILENAME ]]; then
    echo "Error: Invalid syntax" >&2
    echo "Usage: get_version_node -f ./package.json" >&2
    exit 1
fi

if [ ! -f "$PACKAGE_FILENAME" ]; then
    echo "Error: $PACKAGE_FILENAME does not exist." >&2
    echo "Usage: get_version_node -f ./package.json" >&2
    exit 1
fi

PACKAGE_VERSION=""

PACKAGE_VERSION=$(cat "${PACKAGE_FILENAME}" | jq '.version')
PACKAGE_VERSION="${PACKAGE_VERSION%\"}"
PACKAGE_VERSION="${PACKAGE_VERSION#\"}"

if [ ${#PACKAGE_VERSION} -le 4 ]; then
  echo "Unable to extract version number from ${PACKAGE_FILENAME}. Extracted version: '${PACKAGE_VERSION}', expected format is MAJOR.MINOR.PATCH. " >&2
  exit 1
fi

echo "${PACKAGE_VERSION}"