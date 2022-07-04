echo "Importing moment.js locale metadata files."
mkdir -p ./compiled-data/moment/locales
cp -R ../../node_modules/moment/dist/locale/*.js ./compiled-data/moment/locales
# copied files have a relative import to 'moment' so we need to update it to be global
find ./compiled-data/moment/locales -name '*.js' -exec sed -i '' -e 's/..\/moment/moment/g' {} \;
