// Do this as the first thing so that any code reading it knows the right env.
process.env.BUILD_ROLLUP = true;

const fs = require('fs');
const babel = require('rollup-plugin-babel');
const readPkgUp = require('read-pkg-up');
const getBabelPreset = require('@commercetools-frontend/babel-preset-mc-app');
const {
  browserslist,
} = require('@commercetools-frontend/mc-scripts/package.json');
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
const [, packageName] = pkg.name.split('@commercetools-frontend/');
const extensions = ['.js', '.ts', '.tsx'];
const babelOptions = getBabelPreset();

const createPlugins = format => {
  const isFormatEs = format === 'es';
  return [
    peerDeps({
      includeDependencies: true,
    }),
    babel({
      extensions,
      runtimeHelpers: true,
      ...babelOptions,
      plugins: [
        babelPluginImportGraphQL.default,
        ...babelOptions.plugins,
        'babel-plugin-typescript-to-proptypes',
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
      extensions,
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
          autoprefixer: {
            grid: true,
            overrideBrowserslist: browserslist.production,
          },
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
  ];
};

const createConfig = cliArgs => {
  if (/\/test-utils\//.test(cliArgs.input)) {
    return {
      input: cliArgs.input,
      output: {
        format: 'cjs',
        file: `test-utils/index.js`,
        sourcemap: true,
      },
      plugins: createPlugins('cjs'),
    };
  }

  return [
    // Bundle for cjs format
    {
      input: cliArgs.input,
      output: {
        format: 'cjs',
        // Determine by the existence of the `--dir` option if the bundle should generate
        // multiple chunks, as `--file` and `--dir` cannot be used together.
        ...(cliArgs.dir
          ? {
              chunkFileNames: `${packageName}-[name]-[hash].cjs.js`,
              entryFileNames: `${packageName}-[name].cjs.js`,
            }
          : {
              file: `dist/${packageName}.cjs.js`,
            }),
        sourcemap: true,
      },
      plugins: createPlugins('cjs'),
    },
    // Bundle for es format
    {
      input: cliArgs.input,
      output: {
        format: 'es',
        // Determine by the existence of the `--dir` option if the bundle should generate
        // multiple chunks, as `--file` and `--dir` cannot be used together.
        ...(cliArgs.dir
          ? {
              chunkFileNames: `${packageName}-[name]-[hash].es.js`,
              entryFileNames: `${packageName}-[name].es.js`,
            }
          : {
              file: `dist/${packageName}.es.js`,
            }),
        sourcemap: true,
      },
      plugins: createPlugins('es'),
    },
  ];
};

module.exports = createConfig;
