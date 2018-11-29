const fs = require('fs');
const babel = require('rollup-plugin-babel');
const readPkgUp = require('read-pkg-up');
const getBabelPreset = require('@commercetools-frontend/babel-preset-mc-app');
const browserslist = require('@commercetools-frontend/mc-scripts/config/browserslist');
const resolve = require('rollup-plugin-node-resolve');
const json = require('rollup-plugin-json');
const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const builtins = require('rollup-plugin-node-builtins');
const babelPluginImportGraphQL = require('babel-plugin-import-graphql');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssCustomMediaQueries = require('postcss-custom-media');
const postcssColorModFunction = require('postcss-color-mod-function');
const postcssDiscardComments = require('postcss-discard-comments');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssReporter = require('postcss-reporter');

const { pkg } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
});

const format = process.env.npm_lifecycle_event.split(':')[1];
const isCJS = format === 'cjs';

const babelOptions = getBabelPreset();

/**
 * Note:
 *   In order to avoid bundling dependencies here and within consumers
 *   we consider them external as they will be "bundled" by the consumers bundler (e.g. webpack) or
 *   resolved by Node.js anyway.
 *
 *   However, some dependencies are made available through flopflip has they can not
 *   be bundled twice in different versions. Something which can easily happen and causes hard
 *   to discover bugs. THose dependencies are not considered to be external.
 */
const dependenciesRequiringToBeBundled = ['@flopflip/react-broadcast'];
const pkgDependencies = Object.keys(pkg.dependencies || {});
const pkgPeerDependencies = Object.keys(pkg.peerDependencies || {});
const pkgOptionalDependencies = Object.keys(pkg.optionalDependencies || {});

const externalDependencies = pkgDependencies
  .concat(pkgPeerDependencies)
  .concat(pkgOptionalDependencies)
  .filter(
    potentiallyExternalDependency =>
      !dependenciesRequiringToBeBundled.includes(potentiallyExternalDependency)
  );

const config = {
  output: {
    name: pkg.name,
    sourcemap: true,
  },
  external: externalDependencies,
  plugins: [
    babel({
      exclude: '**/node_modules/**',
      runtimeHelpers: true,
      ...babelOptions,
      plugins: [babelPluginImportGraphQL.default, ...babelOptions.plugins],
    }),
    // To convert CJS modules to ES6
    commonjs({
      include: 'node_modules/**',
    }),
    resolve({
      module: true,
      jsnext: true,
      main: true,
      preferBuiltins: true,
      modulesOnly: true,
    }),
    json(
      // generate a named export for every property of the JSON object
      // disable for CJS build, as we don't want to mix default and
      // named exports
      { namedExports: !isCJS }
    ),
    builtins(),
    postcss({
      include: ['**/*.mod.css'],
      exclude: ['node_modules/**/*.css'],
      modules: true,
      importLoaders: 1,
      localIdentName: '[name]__[local]___[hash:base64:5]',
      plugins: [
        postcssImport(),
        postcssPresetEnv({
          browsers: browserslist.production,
          autoprefixer: { grid: true },
        }),
        postcssCustomMediaQueries({
          importFrom: require.resolve(
            '@commercetools-frontend/ui-kit/materials/media-queries.mod.css'
          ),
        }),
        // we need to place the postcssDiscardComments BEFORE postcssCustomProperties,
        // otherwise we will end up with a bunch of empty :root elements
        // wherever there are imported comments
        // see https://github.com/postcss/postcss-custom-properties/issues/123
        // and https://github.com/commercetools/ui-kit/pull/173
        postcssDiscardComments(),
        postcssCustomProperties({
          preserve: false,
          importFrom: require.resolve(
            '@commercetools-frontend/ui-kit/materials/custom-properties.css'
          ),
        }),
        postcssColorModFunction(),
        postcssReporter(),
      ],
    }),
  ],
};

module.exports = config;
