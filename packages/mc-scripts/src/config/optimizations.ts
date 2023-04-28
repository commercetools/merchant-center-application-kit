// Dependencies to be split/grouped into separate chunks.
// This is useful to reduce the main bundle size and have more
// dedicated caching strategy for specific chunks.
// https://webpack.js.org/plugins/split-chunks-plugin/
// https://rollupjs.org/configuration-options/#output-manualchunks
const manualChunks = {
  'apollo-client': ['@apollo/client'],
  'core-js-pure': ['core-js-pure'],
  'commercetools-uikit-icons': ['@commercetools-uikit/icons'],
  moment: ['moment', 'moment-timezone'],
  react: [
    'react',
    'react-dom',
    'react-router',
    'react-router-dom',
    'react-intl',
  ],
  redux: [
    '@reduxjs/toolkit',
    'redux',
    'react-redux',
    'redux-logger',
    'redux-thunk',
  ],
  'sentry-browser': ['@sentry/browser'],
};

const webpackCacheGroups = Object.entries(manualChunks).reduce(
  (previousChunks, [chunkName, vendors]) => {
    return {
      ...previousChunks,
      [chunkName]: {
        test: new RegExp(`[\\/]node_modules[\\/](${vendors.join('|')})[\\/]`),
        name: chunkName,
        chunks: 'all',
      },
    };
  },
  {}
);

export { manualChunks, webpackCacheGroups };
