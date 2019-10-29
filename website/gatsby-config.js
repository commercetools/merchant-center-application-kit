/* eslint-disable global-require */

module.exports = {
  pathPrefix: '/app-kit',
  siteMetadata: {
    title: 'AppKit',
    description: 'Develop applications for the Merchant Center',
    author: 'commercetools',
    repositoryUrl:
      'https://github.com/commercetools/merchant-center-application-kit',
    currentVersion:
      // Keep the version fixed in case we build the website for snapshot testing.
      // This way, we avoid invalid snapshots every time we release a new version.
      process.env.BUILD_TARGET === 'percy'
        ? '0.0.0'
        : require('../lerna.json').version,
  },
  plugins: [
    // Pages for React components
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'components',
        path: `${__dirname}/../packages/application-components/src/components/`,
        ignore: ['.js', '.tsx'],
      },
    },

    '@commercetools-docs/gatsby-theme-docs',
  ],
};
