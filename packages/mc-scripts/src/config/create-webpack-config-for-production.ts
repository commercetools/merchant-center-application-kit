// @ts-ignore
import crypto from 'crypto';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import MomentLocalesPlugin from 'moment-locales-webpack-plugin';
import type { XastElement, PluginInfo } from 'svgo';
import TerserPlugin from 'terser-webpack-plugin';
import webpack, {
  type WebpackPluginInstance,
  type Configuration,
} from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import type {
  TWebpackConfigToggleFlagsForProduction,
  TWebpackConfigOptions,
} from '../types';
import FinalStatsWriterPlugin from '../webpack-plugins/final-stats-writer-plugin';
import createPostcssConfig from './create-postcss-config';
import hasJsxRuntime from './has-jsx-runtime';
// https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros
import momentLocalesToKeep from /* preval */ './moment-locales';
import { getWepbackCacheGroups } from './optimizations';
import paths from './paths';
import vendorsToTranspile from './vendors-to-transpile';

const defaultToggleFlags: TWebpackConfigToggleFlagsForProduction = {
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
  // Some environemnts do not require `core-js` and can hence disable
  // it explicitely. This will disable `core-js` for `preset-env` and the
  // `plugin-transform-runtime`.
  disableCoreJs: false,
  // Pre-parse default `formatjs` messages into AST
  i18nAst: false,
  // Remove default `formatjs` messages from bundles.
  i18nRemoveDefaultMessage: false,
};
const defaultOptions: TWebpackConfigOptions<'production'> = {
  entryPoint: paths.entryPoint,
  sourceFolders: paths.sourceFolders,
  postcssOptions: {},
  toggleFlags: defaultToggleFlags,
};

/**
 * This is a factory function to create the default webpack config
 * for a MC Application in `production` mode.
 * The function requires the file path to the related application
 * "entry point".
 */
function createWebpackConfigForProduction(
  options: TWebpackConfigOptions<'production'> = {}
): Configuration {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    toggleFlags: {
      ...defaultToggleFlags,
      ...options.toggleFlags,
    },
  } as Required<TWebpackConfigOptions<'production'>>;
  const appDependencies = require(paths.appPackageJson).dependencies as Record<
    string,
    string
  >;

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
              // to apply any minification steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 2018,
            },
            compress: {
              ecma: 5,
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
          parallel: mergedOptions.toggleFlags.parallelism,
        }),
        mergedOptions.toggleFlags.enableExtractCss && new CssMinimizerPlugin(),
      ].filter(Boolean) as WebpackPluginInstance[],
      // Keep the runtime chunk separated to enable long term caching
      runtimeChunk: {
        name: 'runtime',
      },
      splitChunks: {
        cacheGroups: getWepbackCacheGroups(appDependencies),
      },
      moduleIds: 'named',
      chunkIds: 'deterministic',
    },

    resolve: {
      // These are the reasonable defaults supported by the Node ecosystem.
      // We also include JSX as a common component filename extension to support
      // some tools, although we do not recommend using it, see:
      // https://github.com/facebook/create-react-app/issues/290
      // `web` extension prefixes have been added for better support
      // for React Native Web.
      extensions: ['js', 'mjs', 'cjs', 'ts', 'tsx', 'json', 'jsx'].map(
        (ext) => `.${ext}`
      ),

      // NOTE: this is meant to be a temporary list of fallback/polyfills for certain
      // nodejs modules. With Webpack <5 these polyfills were included by default in Webpack,
      // however now it's not the case anymore.
      // See also related work in CRA: https://github.com/facebook/create-react-app/pull/11764
      fallback: {
        querystring: require.resolve('querystring-es3'),
      },
    },

    // In production, we only want to load the polyfills and the app code.
    entry: {
      app: [
        require.resolve(
          '@commercetools-frontend/mc-scripts/application-runtime'
        ),
        !mergedOptions.toggleFlags.disableCoreJs &&
          require.resolve('core-js/stable'),
        mergedOptions.entryPoint,
      ].filter(Boolean) as string[],
    },

    output: {
      // Generated JS file names (with nested folders).
      // There will be one main bundle, and one file per asynchronous chunk.
      filename: '[name].[chunkhash].js',
      chunkFilename: '[id].[name].[chunkhash].js',
      // The build folder.
      path: paths.appBuild,
      pathinfo: false,
      // Will be injected on runtime. See `packages/application-shell/src/public-path.js`
      publicPath: '',
    },

    plugins: [
      // Allows to "assign" custom options to the `webpack` object.
      // At the moment, this is used to share some props with `postcss.config`.
      new webpack.LoaderOptionsPlugin({
        options: {
          sourceFolders: mergedOptions.sourceFolders,
          context: __dirname,
        },
      }),
      // Makes some environment variables available to the JS code, for example:
      // if (process.env.NODE_ENV === 'production') { ... }.
      new webpack.DefinePlugin({
        __DEV__: 'false',
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      // Only keep locales that are available in the Merchant Center.
      new MomentLocalesPlugin({
        localesToKeep: momentLocalesToKeep,
      }),

      // Generate a `stats.json` file containing information and paths to
      // the assets that webpack created.
      // This is necessary to programmatically refer to the correct bundle path
      // in the `index.html`.
      new FinalStatsWriterPlugin({
        outputPath: paths.appBuild,
        includeFields: ['entrypoints', 'assets', 'publicPath', 'time'],
      }),
      mergedOptions.toggleFlags.generateIndexHtml &&
        new HtmlWebpackPlugin({
          inject: false,
          filename: 'index.html.template',
          template: require.resolve(
            '@commercetools-frontend/mc-html-template/webpack'
          ),
        }),
      mergedOptions.toggleFlags.enableExtractCss && // Extracts CSS into one CSS file to mimic CSS order in dev
        new MiniCssExtractPlugin({
          filename: '[name].[chunkhash].css',
          chunkFilename: '[id].[name].[chunkhash].css',
        }),
      process.env.ANALYZE_BUNDLE === 'true' &&
        new BundleAnalyzerPlugin({
          defaultSizes: 'gzip',
        }),
    ].filter(Boolean) as WebpackPluginInstance[],

    module: {
      // Makes missing exports an error instead of warning.
      strictExportPresence: true,

      rules: [
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
                  [
                    require.resolve(
                      '@commercetools-frontend/babel-preset-mc-app'
                    ),
                    {
                      runtime: hasJsxRuntime() ? 'automatic' : 'classic',
                      disableCoreJs: mergedOptions.toggleFlags.disableCoreJs,
                      i18nAst: mergedOptions.toggleFlags.i18nAst,
                      i18nRemoveDefaultMessage:
                        mergedOptions.toggleFlags.i18nRemoveDefaultMessage,
                    },
                  ],
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
                icon: false,
                svgoConfig: {
                  plugins: [
                    {
                      // https://github.com/svg/svgo#default-preset
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                        },
                      },
                    },
                    // Avoid collisions with ids in other SVGs,
                    // which was causing incorrect masking, gradient directions, etc
                    // this is an ongoing issue with both SVGR and SVGO,
                    // https://github.com/svg/svgo/issues/913#issuecomment-369373572
                    // see SVGR issues:
                    // https://github.com/gregberge/svgr/issues/322
                    // https://github.com/gregberge/svgr/issues/210
                    // see SVGO issues:
                    // https://github.com/svg/svgo/issues/674
                    // https://github.com/svg/svgo/issues/1746
                    //
                    // Initially, a naive counter was implemented based on this github comment:
                    // https://github.com/svg/svgo/issues/1746#issuecomment-1803600573
                    // But while that implementation insured id’s that are unique,
                    // it did not work in cases where the id is both declared and referenced in the same file,
                    // because the refernce gets a separate unique ID (a different number from the counter).
                    //
                    // The current implementation is based on this github comment:
                    // https://github.com/svg/svgo/issues/913#issuecomment-369373572
                    // Generates a hash of the filepath of the svg file, resulting in a prefix which is:
                    // - Short,
                    // - With characters valid for IDs,
                    // - The same within a file,
                    // - And different in different files.
                    {
                      name: 'prefixIds',
                      params: {
                        delim: '',
                        prefix: (_: XastElement, info: PluginInfo) =>
                          `svg${crypto
                            .createHash('shake256', { outputLength: 6 })
                            .update(info.path || '')
                            .digest('hex')}`,
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
        // For normal svg files (not icons) we should load the file normally
        // and simply use it as a `<img src/>`.
        {
          test: function testForNormalSvgFiles(fileName: string) {
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
        {
          test: /\.png$/,
          type: 'asset/resource',
        },
        // "postcss" loader applies autoprefixer to our CSS
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader turns CSS into JS modules that inject <style> tags.
        // In production, we use MiniCSSExtractPlugin to extract that CSS
        // to a file, but in development "style" loader enables hot editing
        // of CSS.
        // By default we support CSS Modules with the extension `.mod.css` and `.module.css`.
        {
          test: /\.(mod|module)\.css$/,
          include: mergedOptions.sourceFolders,
          use: [
            mergedOptions.toggleFlags.enableExtractCss
              ? MiniCssExtractPlugin.loader
              : require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                modules: {
                  mode: 'local',
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                  localIdentHashSalt: 'ct',
                },
                importLoaders: 1,
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                postcssOptions: createPostcssConfig(
                  mergedOptions.postcssOptions
                ),
              },
            },
          ],
        },
        {
          test: function testForNormalCssFiles(fileName: string) {
            return (
              // Use this only for plain CSS.
              // For css-modules, see loader above.
              fileName.endsWith('.css') &&
              !(
                fileName.endsWith('.mod.css') ||
                fileName.endsWith('.module.css')
              )
            );
          },
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "MiniCssExtractPlugin" or "style" loader extracts css to one file per css file.
          oneOf: [
            {
              // Use "postcss" for all the included source folders.
              include: mergedOptions.sourceFolders,
              use: [
                mergedOptions.toggleFlags.enableExtractCss
                  ? MiniCssExtractPlugin.loader
                  : require.resolve('style-loader'),
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    modules: {
                      mode: 'icss',
                    },
                    importLoaders: 1,
                  },
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    postcssOptions: createPostcssConfig(
                      mergedOptions.postcssOptions
                    ),
                  },
                },
              ],
            },
            {
              // For all other vendor CSS, do not use "postcss" loader.
              // But still use MiniCssExtractPlugin :)
              include: /node_modules/,
              use: [
                mergedOptions.toggleFlags.enableExtractCss
                  ? MiniCssExtractPlugin.loader
                  : require.resolve('style-loader'),
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    modules: {
                      mode: 'icss',
                    },
                    importLoaders: 1,
                  },
                },
              ],
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
            },
          ],
        },
        // Fix for react-intl
        // https://github.com/formatjs/formatjs/issues/143#issuecomment-518774786
        {
          test: /\.mjs$/,
          type: 'javascript/auto',
          resolve: {
            // https://webpack.js.org/configuration/module/#resolvefullyspecified
            fullySpecified: false,
          },
        },
        // Process application JavaScript with Babel.
        {
          test: /\.(js|mjs|cjs|jsx|ts|tsx)$/,
          use: [
            // This loader parallelizes code compilation, it is optional but
            // improves compile time on larger projects
            {
              loader: require.resolve('thread-loader'),
              options: {
                ...(Number.isInteger(mergedOptions.toggleFlags.parallelism)
                  ? { workers: mergedOptions.toggleFlags.parallelism }
                  : {}),
              },
            },
            {
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
                presets: [
                  [
                    require.resolve(
                      '@commercetools-frontend/babel-preset-mc-app'
                    ),
                    {
                      runtime: hasJsxRuntime() ? 'automatic' : 'classic',
                    },
                  ],
                ],
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                highlightCode: true,
              },
            },
          ],
          include: mergedOptions.sourceFolders.concat(vendorsToTranspile),
          // Disable require.ensure as it's not a standard language feature.
          parser: { requireEnsure: false },
        },
        // Allow to import `*.graphql` SDL files.
        {
          test: /\.graphql$/,
          include: mergedOptions.sourceFolders,
          exclude: /node_modules/,
          use: [require.resolve('graphql-tag/loader')],
        },
        !(process.env.DISABLE_I18N_MESSAGE_COMPILATION === 'true') && {
          test: /i18n\/data\/.*\.json$/,
          use: [
            require.resolve(
              '@commercetools-frontend/mc-scripts/webpack-loaders/i18n-message-compilation-loader'
            ),
          ],
        },
      ].filter(Boolean),
    },
    // Turn off performance processing because we utilize
    // our own hints via the FileSizeReporter
    performance: false,
  };
}

export default createWebpackConfigForProduction;
