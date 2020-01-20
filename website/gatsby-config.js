/* eslint-disable global-require */
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  pathPrefix: '/custom-applications',
  siteMetadata: {
    title: 'Custom applications',
    description: 'Develop applications for the Merchant Center',
    author: 'commercetools',
    betaLink: '/support-policy',
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
        path: `${__dirname}/../packages/application-components/src/`,
        ignore: ['.js', '.tsx'],
      },
    },
    // Docs theme
    {
      resolve: '@commercetools-docs/gatsby-theme-docs',
      options: {
        websiteKey: 'custom-applications',
        beta: true,
        excludeFromSearchIndex: isProd,
        gaTrackingId: 'UA-38285631-3',
        // Patch the slug creation to get meaningful slugs for the application components
        createNodeSlug: (originalSlug, { node }) => {
          const isNodeForAppComponent =
            node.fileAbsolutePath &&
            node.fileAbsolutePath.includes('packages/application-components');
          if (isNodeForAppComponent) {
            return originalSlug.replace(
              /^\/components\/(.*)\/(.*)\/$/,
              '/components/$2/'
            );
          }
          return originalSlug;
        },
      },
    },
  ],
};
