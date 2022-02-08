#/bin/bash

#For packages to work with this script, they need the name format of "long-package-name-vX.YY.ZZZ[.zip|.tar|...]", where X.YY.ZZZ is a semver
PACKAGE_NAME=""
REPO=""
OWNER=""

while getopts o:r:p: flag
do
    case "${flag}" in
        o) OWNER=${OPTARG};;
        r) REPO=${OPTARG};;
        p) PACKAGE_NAME=${OPTARG};;
        \?) echo "Invalid option: -"$OPTARG"" >&2
            exit 1;;
        : ) echo "Option -"$OPTARG" requires an argument." >&2
            exit 1;;
    esac
done

PACKAGE_NAME_PREFIX="${PACKAGE_NAME}-v"

latest_release_name=`curl -s https://api.github.com/repos/${OWNER}/${REPO}/releases | jq "[ .[] | select(.name | startswith(\"${PACKAGE_NAME_PREFIX}\")) | { name: .name } ][0].name"`

#no release name containing the version found - return 1.0.0
if [ ${#latest_release_name} -le 5 ]; then
  echo "0.0.0" ;
  exit 0;
fi

#remove both trailing and leading double quotes
latest_release_name="${latest_release_name%\"}"
latest_release_name="${latest_release_name#\"}"

#Remove both prefix and suffix from the package name to extract the version number

latest_release_name="mini-node-api-v1.0.0-beta-pre-release"

ext1=".zip"
ext2=".tar.gz"
ext3=".gzip"
ext4=".tar"
ext5=".gz"
ext6=".exe"
ext7="-prerelease"
ext8="-pre-release"
ext9="-pre"
ext10="-release"
ext11="-alpha"
ext12="-beta"

latest_release_name=$(echo "$latest_release_name" | sed -e "s/^$PACKAGE_NAME_PREFIX//" -e "s/$ext1$//" -e "s/$ext2$//" -e "s/$ext3$//" -e "s/$ext4$//" -e "s/$ext5$//" -e "s/$ext6$//" -e "s/$ext7$//" -e "s/$ext8$//" -e "s/$ext9$//" -e "s/$ext10$//" -e "s/$ext11$//" -e "s/$ext12$//")

echo $latest_release_name

exit 0;
