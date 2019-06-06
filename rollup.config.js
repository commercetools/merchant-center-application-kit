// Do this as the first thing so that any code reading it knows the right env.
process.env.BUILD_ROLLUP = true;

const fs = require('fs');
const babel = require('rollup-plugin-babel');
const readPkgUp = require('read-pkg-up');
const getBabelPreset = require('@commercetools-frontend/babel-preset-mc-app');
const browserslist = require('@commercetools-frontend/mc-scripts/config/browserslist');
const resolve = require('rollup-plugin-node-resolve');
const json = require('rollup-plugin-json');
const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const peerDeps = require('rollup-plugin-peer-deps-external');
const builtins = require('rollup-plugin-node-builtins');
const babelPluginImportGraphQL = require('babel-plugin-import-graphql');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssCustomMediaQueries = require('postcss-custom-media');
const postcssColorModFunction = require('postcss-color-mod-function');
const postcssDiscardComments = require('postcss-discard-comments');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssReporter = require('postcss-reporter');

const { package: pkg } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
});
const babelOptions = getBabelPreset();

const createConfig = cliArgs => {
  const isFormatEs = cliArgs.format === 'es';
  return {
    output: {
      name: pkg.name,
      sourcemap: true,
    },
    plugins: [
      peerDeps({
        includeDependencies: true,
      }),
      babel({
        runtimeHelpers: true,
        ...babelOptions,
        plugins: [
          babelPluginImportGraphQL.default,
          ...babelOptions.plugins,
          isFormatEs && [
            'transform-rename-import',
            {
              replacements: [{ original: 'lodash', replacement: 'lodash-es' }],
            },
          ],
        ].filter(Boolean),
      }),
      // To convert CJS modules to ES6
      commonjs({
        include: 'node_modules/**',
      }),
      resolve({
        mainFields: ['module', 'main', 'jsnext'],
        preferBuiltins: true,
        modulesOnly: true,
      }),
      json({ namedExports: false }),
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
              '@commercetools-frontend/application-components/materials/media-queries.css'
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
};

module.exports = createConfig;
