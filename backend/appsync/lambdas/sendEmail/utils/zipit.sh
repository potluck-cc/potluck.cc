if [ -f "sendEmail.zip" ]; then
    rm ./sendEmail.zip
fi

mkdir dist

cp ./package.json ./dist/package.json

cd dist

rm -rf package-lock.json
rm -rf test

npm i --prod
zip -r sendEmail.zip ./
cp sendEmail.zip ../../../dist
mv sendEmail.zip ../
