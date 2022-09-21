// Dependencies to be split/grouped into separate chunks.
// This is useful to reduce the main bundle size and have more
// dedicated caching strategy for specific chunks.
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

export { manualChunks };
