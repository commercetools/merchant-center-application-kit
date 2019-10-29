/* eslint-disable global-require */

module.exports = {
  pathPrefix: '/app-kit',
  siteMetadata: {
    title: 'AppKit | commercetools docs',
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
    '@commercetools-docs/gatsby-theme-docs',

    // Assets (e.g. images) used from the markdown pages
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/static/assets`,
      },
    },
    // Data files (.yaml)
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'configurationData',
        path: `${__dirname}/src/data`,
      },
    },
    // Main content pages (.mdx)
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        // NOTE: since we want to programmatically `createPage` in `gatsby-node`,
        // we can't put the `mdx` files into `src/pages`, as `gatsby-plugin-mdx` will
        // create them automatically, resulting in conflicting pages.
        // See https://github.com/gatsbyjs/gatsby/issues/16224#issuecomment-529097809
        path: `${__dirname}/src/content`,
      },
    },
    // Pages for React components
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'components',
        path: `${__dirname}/../packages/application-components/src/components/`,
        ignore: ['.js', '.tsx'],
      },
    },
  ],
};
