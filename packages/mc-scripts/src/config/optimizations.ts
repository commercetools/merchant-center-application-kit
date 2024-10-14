import chalk from 'chalk';

// Dependencies to be split/grouped into separate chunks.
// This is useful to reduce the main bundle size and have more
// dedicated caching strategy for specific chunks.
const manualChunks = {
  'commercetools-uikit-icons': ['@commercetools-uikit/icons'],
  moment: ['moment', 'moment-timezone'],
  'app-shell': [
    '@commercetools-frontend/application-shell',
    '@commercetools-frontend/application-shell-connectors',
  ],
};

const removeNonExistantDependencies = (
  manualChunks: Record<string, string[]>,
  appDependencies: string[]
) => {
  return Object.entries(manualChunks).reduce(
    (chunkGroups, [chunkName, vendors]) => {
      const existingVendors = vendors.filter((vendor) =>
        appDependencies.includes(vendor)
      );
      if (existingVendors.length > 0) {
        chunkGroups[chunkName] = existingVendors;
      } else {
        console.log(
          chalk.yellow(
            `\nFiltering out chunk "${chunkName}" because its configured dependencies does not exist in the application: ${vendors}\n`
          )
        );
      }
      return chunkGroups;
    },
    {} as Record<string, string[]>
  );
};

// Reference: https://rollupjs.org/configuration-options/#output-manualchunks
export function getViteCacheGroups(appDependencies: Record<string, string>) {
  return removeNonExistantDependencies(
    manualChunks,
    Object.keys(appDependencies)
  );
}

// Reference: https://webpack.js.org/plugins/split-chunks-plugin/
export function getWepbackCacheGroups(appDependencies: Record<string, string>) {
  const filteredDependencies = removeNonExistantDependencies(
    manualChunks,
    Object.keys(appDependencies)
  );

  const result = Object.entries(filteredDependencies).reduce(
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

  return result;
}
