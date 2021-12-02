const colorPresets = require('@commercetools-docs/gatsby-theme-docs/color-presets');

module.exports = {
  // https://www.gatsbyjs.com/docs/reference/release-notes/v2.28/#feature-flags-in-gatsby-configjs
  // https://www.gatsbyjs.com/docs/reference/release-notes/v2.30
  flags: {
    DEV_SSR: false, // good for catching bugs when developing, but too slow for productive content authoring
    FAST_DEV: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
  },
  pathPrefix: '/custom-applications',
  siteMetadata: {
    title: 'Custom Applications',
    description: 'Develop applications for the Merchant Center',
    author: 'commercetools',
    betaLink: '/support-policy',
    repositoryUrl:
      'https://github.com/commercetools/merchant-center-application-kit',
    legacyDocs:
      'https://mc-custom-applications-legacy.vercel.app/custom-applications/_legacy',
  },
  plugins: [
    // Docs theme
    {
      resolve: '@commercetools-docs/gatsby-theme-docs',
      options: {
        websiteKey: 'custom-applications',
        colorPreset: colorPresets.merchantCenterDeveloperDocs.key,
        beta: true,
        excludeFromSearchIndex: false,
        gaTrackingId: 'UA-38285631-3',
      },
    },
  ],
};
