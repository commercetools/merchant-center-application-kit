const fs = require('fs');
const path = require('path');
const {
  browserslist,
} = require('@commercetools-frontend/mc-scripts/package.json');

module.exports = {
  parser: false,
  map: false,
  plugins: {
    'postcss-import': {},
    'postcss-modules': {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      getJSON: function (cssFileName, json, outputFileName) {
        if (process.env.NODE_ENV === 'test') {
          return;
        }
        const fileName = path.basename(outputFileName);
        const compiledDir = path.dirname(outputFileName);
        if (!fs.existsSync(compiledDir)) {
          fs.mkdirSync(compiledDir);
        }
        fs.writeFileSync(
          `${path.join(compiledDir, fileName)}.json`,
          JSON.stringify(json),
          { encoding: 'utf8' }
        );
        fs.writeFileSync(
          `${path.join(compiledDir, fileName)}.json`,
          JSON.stringify(json),
          { encoding: 'utf8' }
        );
        fs.writeFileSync(
          `${path.join(compiledDir, fileName)}.json.d.ts`,
          `/* eslint-disable prettier/prettier */
          declare const styles: ${JSON.stringify(
            json
          )}; export default styles;`,
          { encoding: 'utf8' }
        );
      },
    },
    ...(process.env.NODE_ENV !== 'test'
      ? {
          'postcss-preset-env': {
            autoprefixer: {
              grid: true,
              overrideBrowserslist: browserslist.production,
            },
          },
        }
      : {}),
    'postcss-custom-media': {
      importFrom: require.resolve(
        '@commercetools-frontend/application-components/materials/media-queries.css'
      ),
    },
    'postcss-custom-properties': {
      preserve: false,
      importFrom: [
        require.resolve(
          '@commercetools-uikit/design-system/materials/custom-properties.css'
        ),
      ],
    },
    ...(process.env.NODE_ENV !== 'test'
      ? { 'postcss-discard-comments': {} }
      : {}),
    'postcss-color-mod-function': {},
  },
};
