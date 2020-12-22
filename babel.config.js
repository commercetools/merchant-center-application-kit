module.exports = {
  presets: [
    [
      '@commercetools-frontend/babel-preset-mc-app',
      {
        // TODO: change this to `automatic` when using the new runtime
        runtime: 'classic',
        keepPropTypes: true,
      },
    ],
  ],
  plugins: [
    'babel-plugin-import-graphql',
    'babel-plugin-typescript-to-proptypes',
  ],
};
