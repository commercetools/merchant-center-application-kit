/* eslint-disable global-require */
// NOTE: it looks like there is a race condition between webpack and postcss
// when loading configurations, causing an error like `No PostCSS Config found`.
// This happens if the PostCSS configuration is done within `webpack.config`
// itself. The preferred way to load PostCSS config instead is by having a
// proper `postcss.config` file.
// https://github.com/postcss/postcss-loader/issues/204
module.exports = ctx => ({
  plugins: [
    /\.mod\.css$/.test(ctx.file.basename)
      ? // For CSS Modules
        // the `options` are passed in from the webpack config when using the
        // postcss-loader
        require('postcss-import')({ path: ctx.options.sourceFolders })
      : // For normal (g) CSS
        require('postcss-import')(),
    require('postcss-cssnext')({
      browsers: '> 1%',
      features: { autoprefixer: { grid: true } },
    }),
    require('postcss-reporter')(),
  ],
});
