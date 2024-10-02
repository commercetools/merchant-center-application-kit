// Helper function to check if a module exists
const moduleExists = (moduleName: string) => {
  try {
    require.resolve(moduleName);
    return true;
  } catch (err) {
    return false;
  }
};

// Dependencies to be split/grouped into separate chunks.
// This is useful to reduce the main bundle size and have more
// dedicated caching strategy for specific chunks.
// https://webpack.js.org/plugins/split-chunks-plugin/
// https://rollupjs.org/configuration-options/#output-manualchunks
const manualChunks = {
  'commercetools-uikit-icons': ['@commercetools-uikit/icons'],
  moment: ['moment', 'moment-timezone'],
  'app-shell': [
    '@commercetools-frontend/application-shell',
    '@commercetools-frontend/application-shell-connectors',
  ],
};

// Filter out non-existent modules
const filteredManualChunks = Object.entries(manualChunks).reduce(
  (acc, [chunkName, vendors]) => {
    const existingVendors = vendors.filter(moduleExists);
    if (existingVendors.length > 0) {
      acc[chunkName] = existingVendors;
    }
    return acc;
  },
  {} as Record<string, string[]>
);

const webpackCacheGroups = Object.entries(filteredManualChunks).reduce(
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
