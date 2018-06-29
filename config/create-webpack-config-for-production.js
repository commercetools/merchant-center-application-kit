/* eslint-disable prettier/prettier */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// as "aliasing v1.0.0 as webpack.optimize.UglifyJsPlugin is scheduled for
// webpack v4.0.0" (https://webpack.js.org/plugins/uglifyjs-webpack-plugin/)
// we need to explicitly use the library to be using the newest version
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssReporter = require('postcss-reporter');
const postCSSCustomProperties = require('postcss-custom-properties');
const FinalStatsWriterPlugin = require('../webpack-plugins/final-stats-writer-plugin');
const browserslist = require('./browserslist');

const uglifyConfig = {
  // This configuration is from the slack team:
  // https://slack.engineering/keep-webpack-fast-a-field-guide-for-better-build-performance-f56a5995e8f1
  uglifyOptions: {
    compress: {
      arrows: false,
      booleans: false,
      collapse_vars: false,
      comparisons: false,
      computed_props: false,
      hoist_funs: false,
      hoist_props: false,
      hoist_vars: false,
      if_return: false,
      inline: false,
      join_vars: false,
      keep_infinity: true,
      loops: false,
      negate_iife: false,
      properties: false,
      reduce_funcs: false,
      reduce_vars: false,
      sequences: false,
      side_effects: false,
      switches: false,
      top_retain: false,
      toplevel: false,
      typeofs: false,
      unused: false,

      // Switch off all types of compression except those needed to convince
      // react-devtools that we're using a production build
      // (here are the checks react devtools makes
      // https://github.com/facebook/react-devtools/blob/7443291103bc619e7e9b8ab009fb6da1281ba302/backend/installGlobalHook.js#L52-L118)
      conditionals: true,
      dead_code: true,
      evaluate: true,
    },
    mangle: true,
  },
  warningsFilter: () => true,
  sourceMap: true,
  parallel: true,
};

/**
 * This is a factory function to create the default webpack config
 * for a MC Application in `production` mode.
 * The function requires the file path to the related application
 * "entry point".
 */
module.exports = ({ distPath, entryPoint, sourceFolders }) => ({
  // Don't attempt to continue if there are any errors.
  bail: true,

  // https://webpack.js.org/concepts/#mode
  mode: 'production',

  // We generate sourcemaps in production. This is slow but gives good results.
  // Sourcemaps are pushed to Google Storage and Sentry.
  // https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'source-map',

  // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
  // https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a
  optimization: {
    minimizer: [new UglifyJsPlugin(uglifyConfig)],
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    splitChunks: {
      chunks: 'all',
    },
    // Keep the runtime chunk seperated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true,
  },

  // In production, we only want to load the polyfills and the app code.
  entry: {
    app: [
      require.resolve('./polyfills'),
      require.resolve('babel-polyfill'),
      entryPoint,
    ],
  },

  output: {
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[name].[chunkhash].js',
    // The build folder.
    path: path.join(distPath, 'assets'),
    pathinfo: false,
    // Will be injected on runtime. See `packages-shared/application-shell/src/public-path.js`
    publicPath: '',
  },

  plugins: [
    new CleanWebpackPlugin([distPath], { allowExternal: true }),
    // Allows to "assign" custom options to the `webpack` object.
    // At the moment, this is used to share some props with `postcss.config`.
    new webpack.LoaderOptionsPlugin({
      options: {
        sourceFolders,
        context: __dirname,
      },
    }),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        // Use this in case you are starting multiple applications locally,
        // routed by a proxy server (see `toolbox/http-proxy-router`).
        SERVED_BY_PROXY: JSON.stringify(process.env.SERVED_BY_PROXY),
        // NOTE: proxy some env variables to allow them to be used from
        // within `HtmlWebpackPlugin` (see `@commercetools-frontend/mc-http-server-config/env.js`).
        HTTP_PORT: JSON.stringify(process.env.HTTP_PORT),
        MC_API_URL: JSON.stringify(process.env.MC_API_URL),
        CTP_AUTH_URL: JSON.stringify(process.env.CTP_AUTH_URL),
        CTP_API_URL: JSON.stringify(process.env.CTP_API_URL),
        MC_ENV: JSON.stringify(process.env.MC_ENV),
        MC_LOCATION: JSON.stringify(process.env.MC_LOCATION),
        FRONTEND_HOST: JSON.stringify(process.env.FRONTEND_HOST),
        AC_URL: JSON.stringify(process.env.AC_URL),
        IMPEX_PRODUCT_EXPORT_URL: JSON.stringify(
          process.env.IMPEX_PRODUCT_EXPORT_URL
        ),
        CDN_URL: JSON.stringify(process.env.CDN_URL),
        TRACKING_GTM: JSON.stringify(process.env.TRACKING_GTM),
        TRACKING_SENTRY: JSON.stringify(process.env.TRACKING_SENTRY),
      },
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'index.html.template',
      template: path.join(__dirname, 'html-template.js'),
    }),
    // Add module names to factory functions so they appear in browser profiler.
    // NOTE: instead of using `HashedModuleIdsPlugin`, we use `NamedModulesPlugin`
    // for production as well, despite the `HashedModuleIdsPlugin` being the
    // recommended choice for production.
    // It appears that using `HashedModuleIdsPlugin` the gzipped bundles are
    // bigger in size compared to the bundles produces by `NamedModulesPlugin`.
    // Therefore we go for the choice of having smaller bundles.
    // Refs:
    // - https://gitlab.com/gitlab-org/gitlab-ce/issues/32835
    // - https://medium.com/@schnibl/hashes-are-had-to-zip-pathnames-not-therefore-your-end-result-with-named-modules-is-unintuitively-94baa1a507e
    new webpack.NamedModulesPlugin(),
    // Strip all locales except `en`, `de`
    // (`en` is built into Moment and can't be removed)
    new MomentLocalesPlugin({ localesToKeep: ['de'] }),
    // Generate a `stats.json` file containing information and paths to
    // the assets that webpack created.
    // This is necessary to programmatically refer to the correct bundle path
    // in the `index.html`.
    new FinalStatsWriterPlugin({
      outputPath: distPath,
      includeFields: ['entrypoints', 'assets', 'publicPath', 'time'],
    }),
  ]
    // Optional plugins
    .concat(
      process.env.ANALYZE_BUNDLE === 'true'
        ? [
            new BundleAnalyzerPlugin({
              defaultSizes: 'gzip',
            }),
          ]
        : []
    ),

  module: {
    // Makes missing exports an error instead of warning.
    strictExportPresence: true,

    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      {
        test: /\.svg$/,
        oneOf: [
          // For svg icons, we want to get them transformed into React components
          // when we import them.
          {
            include: [/ui-kit\/icons/, /ui-kit\/.*\/icons/],
            use: [
              {
                loader: require.resolve('babel-loader'),
                options: {
                  babelrc: false,
                  presets: [
                    require.resolve(
                      '@commercetools-frontend/babel-preset-mc-app'
                    ),
                  ],
                  // This is a feature of `babel-loader` for webpack (not Babel itself).
                  // It enables caching results in ./node_modules/.cache/babel-loader/
                  // directory for faster rebuilds.
                  cacheDirectory: true,
                  highlightCode: true,
                },
              },
              {
                loader: require.resolve('@svgr/webpack'),
                options: {
                  icon: true,
                },
              },
            ],
          },
          // For normal svg files (not icons) we should load the file normally
          // and simply use it as a `<img src/>`.
          {
            // SVG images are included in ui-kit.
            include: /ui-kit/,
            exclude: [/ui-kit\/icons/, /ui-kit\/.*\/icons/],
            use: [
              {
                loader: require.resolve('svg-url-loader'),
                options: { noquotes: true },
              },
            ],
          },
        ],
      },
      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
      {
        test: /\.png$/,
        include: /ui-kit/,
        use: [require.resolve('url-loader')],
      },
      // "postcss" loader applies autoprefixer to our CSS
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      {
        test: /\.mod\.css$/,
        include: sourceFolders,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssImport({ path: sourceFolders }),
                postcssPresetEnv({
                  browsers: browserslist.production,
                  autoprefixer: { grid: true },
                }),
                postCSSCustomProperties({
                  preserve: false,
                }),
                postcssReporter(),
              ],
            },
          },
        ],
      },
      {
        test: function testForNormalCssFiles(fileName) {
          return (
            // Use this only for plain CSS.
            // For css-modules, see loader above.
            fileName.endsWith('.css') && !fileName.endsWith('.mod.css')
          );
        },
        // "postcss" loader applies autoprefixer to our CSS.
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader turns CSS into JS modules that inject <style> tags.
        oneOf: [
          {
            // Use "postcss" for all the included source folders.
            include: sourceFolders,
            use: [
              require.resolve('style-loader'),
              require.resolve('css-loader'),
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    postcssImport(),
                    postcssPresetEnv({
                      browsers: browserslist.production,
                      autoprefixer: { grid: true },
                    }),
                    postCSSCustomProperties({
                      preserve: false,
                    }),
                    postcssReporter(),
                  ],
                },
              },
            ],
          },
          {
            // For all other vendor CSS, do not use "postcss" loader.
            include: /node_modules/,
            loaders: [
              require.resolve('style-loader'),
              require.resolve('css-loader'),
            ],
          },
        ],
      },
      // Process JS with Babel.
      {
        test: /\.js$/,
        use: [
          // This loader parallelizes code compilation, it is optional but
          // improves compile time on larger projects
          require.resolve('thread-loader'),
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              compact: false,
              presets: [
                require.resolve('@commercetools-frontend/babel-preset-mc-app'),
              ],
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              highlightCode: true,
            },
          },
        ],
        include: sourceFolders,
      },
      // Allow to import `*.graphql` SDL files.
      {
        test: /\.graphql$/,
        include: sourceFolders,
        use: [require.resolve('graphql-tag/loader')],
      },
      {
        test: /\.pegjs$/,
        use: [require.resolve('pegjs-loader')],
      },
    ],
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  // Turn off performance hints in production because we utilize
  // our own hints via the FileSizeReporter (toolbox/build.js).
  performance: {
    hints: false,
  },
});
