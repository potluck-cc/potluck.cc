if [ -f "IsUserSubscribed.zip" ]; then
    rm ./IsUserSubscribed.zip
fi

mkdir dist

cp ./package.json ./dist/package.json

cd dist

rm -rf package-lock.json
rm -rf test

npm i --prod
zip -r IsUserSubscribed.zip ./
cp IsUserSubscribed.zip ../../../dist
mv IsUserSubscribed.zip ../
