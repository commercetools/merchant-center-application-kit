/* eslint-disable global-require */

module.exports = {
  pathPrefix: '/custom-applications/playground',
  siteMetadata: {
    title: `AppKit UI components | Playground`,
    description: ``,
    author: `commercetools`,
    repositoryUrl:
      'https://github.com/commercetools/merchant-center-application-kit',
  },
  plugins: [
    `gatsby-plugin-emotion`,
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Open Sans',
            variants: [
              '300',
              '300i',
              '400',
              '400i',
              '600',
              '600i',
              '700',
              '700i',
            ],
          },
        ],
      },
    },
  ],
};
