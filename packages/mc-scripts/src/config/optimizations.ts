import chalk from 'chalk';

// Dependencies to be split/grouped into separate chunks for the Webpack build.
// This is useful to reduce the main bundle size and have more dedicated
// caching strategy for specific chunks.
//
// NOTE: this is intentionally Webpack-only. The Vite build does NOT use
// manualChunks — Rollup's declarative manualChunks form does not claim
// transitive deps, which caused a chunk-level cycle (icons ↔ app-shell) that
// crashed at runtime with a TDZ ("aM is undefined") error. Rollup's default
// chunking handles co-location correctly; Webpack's splitChunks with a regex
// test has different, cycle-safe semantics (shared modules are hoisted into a
// shared chunk automatically).
const manualChunks: Record<string, string[]> = {
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
