if [ -f "createPortalSession.zip" ]; then
    rm ./createPortalSession.zip
fi

mkdir dist

cp ./package.json ./dist/package.json

cd dist

rm -rf package-lock.json
rm -rf test

npm i --prod
zip -r createPortalSession.zip ./
cp createPortalSession.zip ../../../dist
mv createPortalSession.zip ../
