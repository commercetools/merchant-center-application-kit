module.exports = ctx => {
  return {
    parser: false,
    map: false,
    plugins: {
      'postcss-import': {},
      'postcss-custom-properties': {
        preserve: false,
        importFrom: [
          require.resolve(
            '@commercetools-frontend/ui-kit/materials/custom-properties.css'
          ),
        ],
      },
    },
  };
};
