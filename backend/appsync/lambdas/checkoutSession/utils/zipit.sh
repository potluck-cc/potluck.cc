if [ -f "checkoutSession.zip" ]; then
    rm ./checkoutSession.zip
fi

mkdir dist

cp ./package.json ./dist/package.json

cd dist

rm -rf package-lock.json
rm -rf test

npm i --prod
zip -r checkoutSession.zip ./
cp checkoutSession.zip ../../../dist
mv checkoutSession.zip ../
