module.exports = {
  presets: [
    [
      '@commercetools-frontend/babel-preset-mc-app',
      {
        runtime: 'automatic',
        keepPropTypes: true,
        disableLooseMode: process.env.CYPRESS_CI === 'true',
      },
    ],
  ],
  plugins: [
    'babel-plugin-import-graphql',
    'babel-plugin-typescript-to-proptypes',
  ],
};
