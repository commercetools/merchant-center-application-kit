const { browserslist } = require('./package.json');

module.exports = {
  parser: false,
  map: false,
  plugins: [
    require('postcss-import')(),
    require('autoprefixer')({
      grid: 'autoplace',
      overrideBrowserslist: browserslist.development,
    }),
    require('postcss-custom-media')({
      importFrom: require.resolve(
        '@commercetools-frontend/application-components/materials/media-queries.css'
      ),
    }),
    require('postcss-custom-properties')({
      preserve: false,
      importFrom: require.resolve(
        '@commercetools-uikit/design-system/materials/custom-properties.css'
      ),
    }),
    require('postcss-color-mod-function')(),
    require('postcss-reporter')(),
  ],
};
