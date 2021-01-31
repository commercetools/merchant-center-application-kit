// This config is mainly used by the stylelint plugin.

module.exports = {
  parser: false,
  map: false,
  plugins: {
    'postcss-import': {},
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
    'postcss-color-mod-function': {},
  },
};
