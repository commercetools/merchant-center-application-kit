/**
 * @type {import('@babel/core').TransformOptions}
 */
const isTest =
  process.env.NODE_ENV === 'test' || process.env.CYPRESS_COVERAGE === 'true';

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
    require('./babel-plugin-package-version'),
    isTest && 'babel-plugin-istanbul',
  ].filter(Boolean),
};
