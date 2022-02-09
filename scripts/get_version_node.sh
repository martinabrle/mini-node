#/bin/bash

PACKAGE_FILENAME=""
while getopts f: flag
do
    case "${flag}" in
        f) PACKAGE_FILENAME=${OPTARG};
        \?) echo "Invalid option: -"$OPTARG"" >&2
            echo "Usage: get_version_node -f ./package.json" >&2
            exit 1;;
        : ) echo "Option -"$OPTARG" requires an argument." >&2
            echo "Usage: get_version_node -f ./package.json" >&2
            exit 1;;
    esac
done

if [ ! -f "$PACKAGE_FILENAME" ]; then
    echo "$PACKAGE_FILENAME does not exist." >&2
    exit 1;
fi

PACKAGE_VERSION=""

PACKAGE_VERSION=$(cat "${PACKAGE_FILENAME}" | jq '.version')
PACKAGE_VERSION="${PACKAGE_VERSION%\"}"
PACKAGE_VERSION="${PACKAGE_VERSION#\"}"

if [ ${#PACKAGE_VERSION} -le 5 ]; then
  echo "Unable to extract version number from ${PACKAGE_VERSION}. Expected format is MAJOR.MINOR.PATCH. " >&2
  exit 1;
fi

exit 0;
