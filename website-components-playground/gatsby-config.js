/* eslint-disable global-require */

module.exports = {
  pathPrefix: '/app-kit/playground',
  siteMetadata: {
    title: `AppKit UI components | Playground`,
    description: ``,
    author: `commercetools`,
    repositoryUrl:
      'https://github.com/commercetools/merchant-center-application-kit',
  },
  plugins: [
    /**
     *  Sources for loading content
     */

    /*
      gatsby-source-filesystem notes:
      https://www.gatsbyjs.org/packages/gatsby-source-filesystem/?=file#how-to-query
      Most of these files get queried through other transformers,
      but the `name` property here allows filtering allFile queries:
      allFile(filter: { sourceInstanceName: { eq: "blog" } }) {
        edges {
          node { etc...
    */
    // Pages for React components
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `components`,
        path: `${__dirname}/../packages/application-components/src/components/`,
        ignore: ['.js'],
      },
    },

    /**
     * Plugins for general functionality
     */
    `gatsby-plugin-emotion`,
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          // https://design.google/library/choosing-web-fonts-beginners-guide/
          'Open+Sans:300,300i,400,400i,600,600i,700,700i',
        ],
      },
    },
  ],
};
