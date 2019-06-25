module.exports = () => {
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
              '--color-info': 'blue',
              '--small-spacing': '4px',
              '--large-spacing': '8px',
            },
          },
        ],
      },
    },
  };
};
