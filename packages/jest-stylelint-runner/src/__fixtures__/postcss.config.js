module.exports = ctx => {
  return {
    parser: false,
    map: false,
    plugins: {
      'postcss-import': {},
      'postcss-custom-properties': {
        preserve: false,
        importFrom: [
          {
            customProperties: {
              '--color-primary': 'green',
              '--color-dark': 'black',
            },
          },
        ],
      },
    },
  };
};
