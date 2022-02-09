
releaseVersion="${releaseOrigVersion}.${{github.run_number}}"

cat ./package.json | jq ". |= . + { \"version\": \"${releaseVersion}\" }" > ./package.new.json
mv ./package.json ./api/package.old.json
mv ./package.new.json ./api/package.json
rm ./package.old.json

releaseName="mini-node-api-${releaseVersion}"
releaseFileName="mini-node-api-${releaseVersion}.zip"

echo "RELEASE_VERSION=$releaseVersion" >> $GITHUB_ENV
echo "RELEASE_NAME=$releaseName" >> $GITHUB_ENV
echo "RELEASE_FILE_NAME=$releaseFileName" >> $GITHUB_ENV

echo "::set-output name=RELEASE_VERSION::$releaseVersion"
echo "::set-output name=RELEASE_NAME::$releaseName"
echo "::set-output name=RELEASE_FILE_NAME::$releaseFileName"