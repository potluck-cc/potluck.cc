if [ -f "completeCheckout.zip" ]; then
    rm ./completeCheckout.zip
fi

mkdir dist

cp ./package.json ./dist/package.json

cd dist

rm -rf package-lock.json
rm -rf test

npm i --prod
zip -r completeCheckout.zip ./
cp completeCheckout.zip ../../../dist
mv completeCheckout.zip ../
