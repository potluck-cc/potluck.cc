#!/bin/bash

if [ -f "awsAppsyncLayer.zip" ]; then
    rm ./awsAppsyncLayer.zip
fi

mkdir dist
mkdir dist/nodejs

cp ./package.json ./dist/nodejs/package.json

cd dist/nodejs

npm i --prod

# remove unneeded files
rm package-lock.json
rm package.json

cd ../
zip -r awsAppsyncLayer.zip ./
mv awsAppsyncLayer.zip ../
