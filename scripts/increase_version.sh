#/bin/bash

while getopts v: flag
do
    case "${flag}" in
        v) VERSION=${OPTARG};
           echo `echo "${VERSION}"| awk -vFS=. -vOFS=. '{$NF++;print}'`;
           exit 0;;
        \?) echo "Invalid option: -"$OPTARG"" >&2
            echo "Usage: increase_semver -v MAJOR.MINOR.PATCH (example: increase_semver -v 1.2.1)" >&2
            exit 1;;
        : ) echo "Option -"$OPTARG" requires an argument." >&2
            echo "Usage: increase_semver -v MAJOR.MINOR.PATCH (example: increase_semver -v 1.2.1)" >&2
            exit 1;;
    esac
done

echo "Usage: increase_semver -v MAJOR.MINOR.PATCH (example: increase_semver -v 1.2.1)" >&2
exit 1;