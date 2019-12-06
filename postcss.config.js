module.exports = () => {
  return {
    parser: false,
    map: false,
    plugins: {
      'postcss-import': {},
      'postcss-custom-properties': {
        preserve: false,
        importFrom: [
          require.resolve(
            '@commercetools-uikit/design-system/materials/custom-properties.css'
          ),
        ],
      },
    },
  };
};
