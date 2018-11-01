const fs = require('fs');
const babel = require('rollup-plugin-babel');
const readPkgUp = require('read-pkg-up');
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const json = require('rollup-plugin-json');
const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const getBabelPreset = require('@commercetools-frontend/babel-preset-mc-app');
const builtins = require('rollup-plugin-node-builtins');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssCustomMediaQueries = require('postcss-custom-media');
const postcssColorModFunction = require('postcss-color-mod-function');
const postcssDiscardComments = require('postcss-discard-comments');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssReporter = require('postcss-reporter');

const env = process.env.NODE_ENV;

const { pkg } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
});

const babelOptions = getBabelPreset();
const babelPlugins = babelOptions.plugins;
const babelConfig = {
  ...babelOptions,
  /*
    babel-plugin-import-graphql works a lot better than graphql rollup plugin.
    can also add this to our default babel-config and remove the webpack
    loader
  */
  /* eslint-disable-next-line global-require */
  plugins: [require('babel-plugin-import-graphql')].concat(babelPlugins),
};

// Inspired by https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.prod.js
const browserslist = {
  production: [
    '>1%',
    'last 2 versions',
    'Firefox ESR',
    'not op_mini all',
    'ie 11',
  ],
};

const deps = Object.keys(pkg.dependencies || {});
const peerDeps = Object.keys(pkg.peerDependencies || {});

const config = {
  output: {
    name: pkg.name,
    sourcemap: true,
    globals: {
      react: 'React',
      redux: 'redux',
      'react-redux': 'react-redux',
    },
  },
  external: deps.concat(peerDeps).concat(deps),
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    babel({
      exclude: '**/node_modules/**',
      runtimeHelpers: true,
      ...babelConfig,
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
    json(),
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
        postcssCustomMediaQueries(),
        postcssColorModFunction(),
        // we need to place the postcssDiscardComments BEFORE postcssCustomProperties,
        // otherwise we will end up with a bunch of empty :root elements
        // wherever there are imported comments
        // see https://github.com/postcss/postcss-custom-properties/issues/123
        // and https://github.com/commercetools/ui-kit/pull/173
        postcssDiscardComments(),
        postcssCustomProperties({
          preserve: false,
        }),
        postcssReporter(),
      ],
    }),
  ],
};

module.exports = config;
