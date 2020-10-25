/* eslint-disable prettier/prettier */
const path = require('path');
const webpack = require('webpack');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safeParser = require('postcss-safe-parser');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// as "aliasing v1.0.0 as webpack.optimize.UglifyJsPlugin is scheduled for
// webpack v4.0.0" (https://webpack.js.org/plugins/uglifyjs-webpack-plugin/)
// we need to explicitly use the library to be using the newest version
const TerserPlugin = require('terser-webpack-plugin');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssReporter = require('postcss-reporter');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssCustomMediaQueries = require('postcss-custom-media');
const postcssColorModFunction = require('postcss-color-mod-function');
const FinalStatsWriterPlugin = require('../webpack-plugins/final-stats-writer-plugin');
const { browserslist } = require('../../package.json');
const vendorsToTranspile = require('./vendors-to-transpile');
const hasJsxRuntime = require('./has-jsx-runtime');

const optimizeCSSConfig = {
  // Since css-loader uses cssnano v3.1.0, it's best to stick with the
  // same version here
  cssProcessor: cssnano,
  // This safe condition is necessary (as of v3 of cssnano) else we will run into
  // problems, learn more👇
  // https://github.com/NMFR/optimize-css-assets-webpack-plugin/issues/28
  cssProcessorOptions: {
    // The previous safe option has been removed this is a fix from
    // https://github.com/NMFR/optimize-css-assets-webpack-plugin/issues/65#issuecomment-405721294
    parser: safeParser,
    discardComments: { removeAll: true },
  },
};

const defaultToggleFlags = {
  // Allow to disable CSS extraction in case it's not necessary (e.g. for Storybook)
  enableExtractCss: true,
  // Allow to disable index.html generation in case it's not necessary (e.g. for Storybook)
  generateIndexHtml: true,
  // Some plugins spawn workers to speed up the build. However this can cause trouble on
  // certain machines local and CI. This flag set to limit or disable any parallelism.
  // Options:
  //    `true` to default to the machines number of CPUs
  //    `false` to disable any paralelism
  //    `int` for a specific number of CPUs
  parallelism: true,
};

/**
 * This is a factory function to create the default webpack config
 * for a MC Application in `production` mode.
 * The function requires the file path to the related application
 * "entry point".
 */
module.exports = ({ distPath, entryPoint, sourceFolders, toggleFlags }) => {
  const mergedToggleFlags = { ...defaultToggleFlags, ...toggleFlags };

  return {
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
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              // we want terser to parse ecma 8 code. However, we don't want it
              // to apply any minfication steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending futher investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            // Added for profiling in devtools
            keep_classnames: true,
            keep_fnames: true,
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true,
            },
          },
          // Use multi-process parallel running to improve the build speed
          // Default number of concurrent runs: os.cpus().length - 1
          parallel: mergedToggleFlags.parallelism,
          // Enable file caching
          cache: true,
          sourceMap: true,
        }),
        mergedToggleFlags.enableExtractCss &&
          new OptimizeCSSAssetsPlugin(optimizeCSSConfig),
      ].filter(Boolean),
      // Automatically split vendor and commons
      // https://twitter.com/wSokra/status/969633336732905474
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      splitChunks: {
        chunks: 'all',
        // NOTE: if you enable `cacheGroups` for CSS, remember to toggle it with
        // the `mergedToggleFlags.enableExtractCss`
      },
      // Keep the runtime chunk separated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      // https://github.com/facebook/create-react-app/issues/5358
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
    },

    // In production, we only want to load the polyfills and the app code.
    entry: {
      app: [
        require.resolve('./application-runtime'),
        require.resolve('core-js/stable'),
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
      // Will be injected on runtime. See `packages/application-shell/src/public-path.js`
      publicPath: '',
    },

    resolve: {
      // These are the reasonable defaults supported by the Node ecosystem.
      // We also include JSX as a common component filename extension to support
      // some tools, although we do not recommend using it, see:
      // https://github.com/facebook/create-react-app/issues/290
      // `web` extension prefixes have been added for better support
      // for React Native Web.
      extensions: ['js', 'ts', 'tsx', 'json', 'jsx'].map((ext) => `.${ext}`),
    },

    plugins: [
      new CleanWebpackPlugin({
        dangerouslyAllowCleanPatternsOutsideProject: true,
        dry: true,
        cleanOnceBeforeBuildPatterns: [distPath],
      }),
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
        },
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
      new MomentLocalesPlugin({
        localesToKeep: ['de', 'es', 'fr', 'zh-cn', 'ja'],
      }),

      // Generate a `stats.json` file containing information and paths to
      // the assets that webpack created.
      // This is necessary to programmatically refer to the correct bundle path
      // in the `index.html`.
      new FinalStatsWriterPlugin({
        outputPath: distPath,
        includeFields: ['entrypoints', 'assets', 'publicPath', 'time'],
      }),
      mergedToggleFlags.generateIndexHtml &&
        new HtmlWebpackPlugin({
          inject: false,
          filename: 'index.html.template',
          template: require.resolve(
            '@commercetools-frontend/mc-html-template/webpack'
          ),
        }),
      mergedToggleFlags.enableExtractCss && // Extracts CSS into one CSS file to mimic CSS order in dev
        new MiniCssExtractPlugin({
          filename: '[name].[chunkhash].css',
          chunkFilename: '[id].[name].[chunkhash].css',
        }),
      process.env.ANALYZE_BUNDLE === 'true' &&
        new BundleAnalyzerPlugin({
          defaultSizes: 'gzip',
        }),
    ].filter(Boolean),

    module: {
      // Makes missing exports an error instead of warning.
      strictExportPresence: true,

      rules: [
        // Disable require.ensure as it's not a standard language feature.
        { parser: { requireEnsure: false } },
        // For svg icons, we want to get them transformed into React components
        // when we import them.
        {
          test: /\.react\.svg$/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                presets: [
                  require.resolve(
                    '@commercetools-frontend/babel-preset-mc-app'
                  ),
                  {
                    runtime: hasJsxRuntime() ? 'automatic' : 'classic',
                  },
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
                // NOTE: disable this and manually add `removeViewBox: false` in the SVGO plugins list
                // See related PR: https://github.com/smooth-code/svgr/pull/137
                icon: false,
                svgoConfig: {
                  plugins: [
                    { removeViewBox: false },
                    // Keeps ID's of svgs so they can be targeted with CSS
                    { cleanupIDs: false },
                  ],
                },
              },
            },
          ],
        },
        // For normal svg files (not icons) we should load the file normally
        // and simply use it as a `<img src/>`.
        {
          test: function testForNormalSvgFiles(fileName) {
            return (
              // Use this only for plain SVG.
              // For SVG as React components, see loader above.
              fileName.endsWith('.svg') && !fileName.endsWith('.react.svg')
            );
          },
          use: [
            {
              loader: require.resolve('svg-url-loader'),
            },
          ],
        },
        // "url" loader works like "file" loader except that it embeds assets
        // smaller than specified limit in bytes as data URLs to avoid requests.
        // A missing `test` is equivalent to a match.
        {
          test: /\.png$/,
          use: [require.resolve('url-loader')],
        },
        // "postcss" loader applies autoprefixer to our CSS
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader turns CSS into JS modules that inject <style> tags.
        {
          test: /\.mod\.css$/,
          include: sourceFolders,
          use: [
            mergedToggleFlags.enableExtractCss
              ? MiniCssExtractPlugin.loader
              : require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                modules: {
                  mode: 'local',
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                  localIdentHashPrefix: 'ct',
                },
                importLoaders: 1,
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                postcssOptions: {
                  plugins: () => [
                    postcssImport({ path: sourceFolders }),
                    postcssPresetEnv({
                      autoprefixer: {
                        grid: true,
                        overrideBrowserslist: browserslist.production,
                      },
                    }),
                    postcssCustomProperties({
                      preserve: false,
                      importFrom: require.resolve(
                        '@commercetools-uikit/design-system/materials/custom-properties.css'
                      ),
                    }),
                    postcssCustomMediaQueries({
                      importFrom: require.resolve(
                        '@commercetools-frontend/application-components/materials/media-queries.css'
                      ),
                    }),
                    postcssColorModFunction(),
                    postcssReporter(),
                  ],
                },
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
          // "MiniCssExtractPlugin" or "style" loader extracts css to one file per css file.
          oneOf: [
            {
              // Use "postcss" for all the included source folders.
              include: sourceFolders,
              use: [
                mergedToggleFlags.enableExtractCss
                  ? MiniCssExtractPlugin.loader
                  : require.resolve('style-loader'),
                require.resolve('css-loader'),
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    postcssOptions: {
                      plugins: () => [
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
                        postcssCustomProperties({
                          preserve: false,
                          importFrom: require.resolve(
                            '@commercetools-uikit/design-system/materials/custom-properties.css'
                          ),
                        }),
                        postcssColorModFunction(),
                        postcssReporter(),
                      ],
                    },
                  },
                },
              ],
            },
            {
              // For all other vendor CSS, do not use "postcss" loader.
              // But still use MiniCssExtractPlugin :)
              include: /node_modules/,
              loaders: [
                mergedToggleFlags.enableExtractCss
                  ? MiniCssExtractPlugin.loader
                  : require.resolve('style-loader'),
                require.resolve('css-loader'),
              ],
            },
          ],
        },
        // Fix for react-intl
        // https://github.com/formatjs/formatjs/issues/143#issuecomment-518774786
        {
          test: /\.mjs$/,
          type: 'javascript/auto',
        },
        // Process application JavaScript with Babel.
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: [
            // This loader parallelizes code compilation, it is optional but
            // improves compile time on larger projects
            require.resolve('thread-loader'),
            {
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
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
          ],
          include: sourceFolders.concat(vendorsToTranspile),
        },
        // Allow to import `*.graphql` SDL files.
        {
          test: /\.graphql$/,
          include: sourceFolders,
          use: [require.resolve('graphql-tag/loader')],
        },
      ].filter(Boolean),
    },
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
      module: 'empty',
      dgram: 'empty',
      dns: 'mock',
      fs: 'empty',
      http2: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
    // Turn off performance processing because we utilize
    // our own hints via the FileSizeReporter
    performance: false,
  };
};
