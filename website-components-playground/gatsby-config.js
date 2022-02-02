/* eslint-disable global-require */

module.exports = {
  // https://www.gatsbyjs.com/docs/reference/release-notes/v2.28/#feature-flags-in-gatsby-configjs
  // https://www.gatsbyjs.com/docs/reference/release-notes/v2.30
  flags: {
    DEV_SSR: true,
    FAST_DEV: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
  },
  pathPrefix: '/custom-applications/playground',
  siteMetadata: {
    title: `AppKit UI components | Playground`,
    description: ``,
    author: `commercetools`,
    repositoryUrl:
      'https://github.com/commercetools/merchant-center-application-kit',
  },
  plugins: [`gatsby-plugin-emotion`],
};
