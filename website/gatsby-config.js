/* eslint-disable global-require */
const dummyVersions = {
  latest: 'v0.0.0',
  next: 'v0.0.0',
};

module.exports = {
  pathPrefix: '/custom-applications',
  siteMetadata: {
    title: 'Custom applications',
    description: 'Develop applications for the Merchant Center',
    author: 'commercetools',
    betaLink: '/support-policy',
    repositoryUrl:
      'https://github.com/commercetools/merchant-center-application-kit',
    publishedVersions:
      // Keep the version fixed in case we build the website for snapshot testing.
      // This way, we avoid invalid snapshots every time we release a new version.
      process.env.BUILD_TARGET === 'percy'
        ? dummyVersions
        : require('./versions'),
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
        excludeFromSearchIndex: false,
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
