#!/bin/bash

PACKAGE_FILENAME=""
PACKAGE_VERSION=""
while getopts f:v: flag
do
    case "${flag}" in
        v)
            PACKAGE_VERSION=${OPTARG}
            ;;
        f)
            PACKAGE_FILENAME=${OPTARG}
            ;;
        \?)
            echo "Error: Invalid syntax" >&2
            echo "Usage: update_version_node -f ./package.json -v 1.3.89" >&2
            exit 1;;
        : ) echo "Error: Invalid syntax" >&2
            echo "Usage: update_version_node -f ./package.json -v 1.3.89" >&2
            exit 1;;
    esac
done

if [[ -z $PACKAGE_FILENAME || -z $PACKAGE_VERSION ]]; then
  echo "Error: Invalid syntax" >&2
  echo "Usage: update_version_node -f ./package.json -v 1.3.89" >&2
  exit 1
fi

if [ ! -f "$PACKAGE_FILENAME" ]; then
    echo "Error: $PACKAGE_FILENAME does not exist." >&2
    exit 1
fi

cat "${PACKAGE_FILENAME}" | jq ". |= . + { \"version\": \"${PACKAGE_VERSION}\" }" > "${PACKAGE_FILENAME}.new"
mv "${PACKAGE_FILENAME}" "${PACKAGE_FILENAME}.old"
mv "${PACKAGE_FILENAME}.new" "${PACKAGE_FILENAME}"
rm -f "${PACKAGE_FILENAME}.old"
