// eslint-disable-next-line import/extensions
import colorPresets from '@commercetools-docs/gatsby-theme-docs/color-presets/index.mjs';

/**
 * @type {import('gatsby').GatsbyConfig}
 */
const config = {
  // find the flags of the most recent gatsby release here:
  // https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/utils/flags.ts#L79
  flags: {
    DEV_SSR: false, // good for catching bugs when developing, but too slow for productive content authoring
  },
  pathPrefix: '/custom-views',
  siteMetadata: {
    title: 'Custom Views',
    description: 'Develop Custom Views for the Merchant Center',
    author: 'commercetools',
    breadcrumbs: 'Composable Commerce',
    beta: false,
    betaLink:
      'https://docs.commercetools.com/offering/api-contract#public-beta',
    repositoryUrl:
      'https://github.com/commercetools/merchant-center-application-kit',
    excludeFromSearchIndex: true,
    globalNotification: {
      active: true,
      notificationType: 'warning',
      content:
        'This is the early access documentation preview for Custom Views. This documentation might not be in sync with our [official documentation](https://docs.commercetools.com).',
    },
  },
  plugins: [
    // Docs theme
    {
      resolve: '@commercetools-docs/gatsby-theme-docs',
      options: {
        websiteKey: 'custom-views',
        colorPreset: colorPresets.merchantCenterDeveloperDocs.key,
        gaTrackingIds: ['G-XGR7PSLVB2', 'UA-38285631-3'],
        hubspotTrackingCode: '4784080',
        overrideDefaultConfigurationData: ['**/top-*', '**/footer*'],
      },
    },
    'gatsby-plugin-pnpm',
  ],
};

export default config;
