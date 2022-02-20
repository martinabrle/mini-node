#!/bin/bash

VERSION=""
while getopts v: flag
do
    case "${flag}" in
        v)
            VERSION=${OPTARG};
            ;;
        \?)
            echo "Error: Invalid syntax" >&2
            echo "Usage: increase_version -v MAJOR.MINOR.PATCH (example: increase_version -v 1.2.1)" >&2
            exit 1;;
        : )
            echo "Error: Invalid syntax" >&2
            echo "Usage: increase_version -v MAJOR.MINOR.PATCH (example: increase_version -v 1.2.1)" >&2
            exit 1;;
    esac
done

if [[ -z $VERSION ]]; then
    echo "Error: Invalid syntax" >&2
    echo "Usage: increase_version -v MAJOR.MINOR.PATCH (example: increase_version -v 1.2.1)" >&2
    exit 1
fi

if [ ${#VERSION} -le 4 ]; then
    echo "Error: Invalid syntax" >&2
    echo "Usage: increase_version -v MAJOR.MINOR.PATCH (example: increase_version -v 1.2.1)" >&2
    exit 1
fi

echo `echo "${VERSION}"| awk -vFS=. -vOFS=. '{$NF++;print}'`;
